import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { deleteFromS3 } from "../../utils/s3Upload";
import { IUserLogin, IUserRegistration } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const signUpEmail = async (userData: IUserRegistration) => {
    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (existingEmail) {
        throw new AppError(httpStatus.CONFLICT, "Email already exists");
    }

    // Call Better Auth signUpEmail
    const result = await auth.api.signUpEmail({
        body: {
            email: userData.email,
            password: userData.password,
            name: userData.fullName || "",
            bio: userData.bio || "",
            image: userData.profileImage || "",
        },
    });

    if (userData.fcmToken && result?.user?.id) {
        await prisma.user.update({
            where: { id: result.user.id },
            data: { fcmToken: userData.fcmToken },
        });
    }

    return result;
};

const loginUser = async (payload: IUserLogin) => {
    const userResponse = await auth.api.signInEmail({
        body: {
            email: payload.email,
            password: payload.password,
        },
    });

    if (!userResponse || !userResponse.user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    if (payload.fcmToken) {
        await prisma.user.update({
            where: { id: userResponse.user.id },
            data: { fcmToken: payload.fcmToken },
        });
    }

    return userResponse;
};

const logoutUser = async (headers: Headers, userId?: string) => {
    if (userId) {
        await prisma.user.update({
            where: { id: userId },
            data: { fcmToken: null },
        });
    }

    try {
        await auth.api.signOut({ headers });
    } catch (err) {
        // Ignore potential Better Auth errors
    }
};

const forgotPassword = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (user.isActive === false) {
        throw new AppError(httpStatus.FORBIDDEN, "Account is inactive");
    }

    const result = await auth.api.requestPasswordResetEmailOTP({
        body: {
            email,
        },
    });

    return result;
};

const resetPassword = async (payload: any) => {
    const { email, otp, newPassword } = payload;

    await auth.api.resetPasswordEmailOTP({
        body: {
            email,
            otp,
            password: newPassword,
        },
    });

    // Find user to delete sessions
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        await prisma.session.deleteMany({
            where: {
                userId: user.id,
            },
        });
    }
};

const sendVerificationOTP = async (email: string) => {
    await auth.api.sendVerificationOTP({
        body: {
            email: email.toLowerCase(),
            type: "email-verification",
        },
    });
};

const verifyEmailOTP = async (email: string, otp: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (!user.isActive) {
        throw new AppError(httpStatus.FORBIDDEN, "Account is inactive");
    }

    if (user.isVerified && user.emailVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is already verified");
    }

    try {
        await auth.api.verifyEmailOTP({
            body: {
                email: email.toLowerCase(),
                otp,
            },
        });
    } catch (error: any) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            error.message || "Invalid or expired OTP",
        );
    }

    // Update User table after successful verification
    const updatedUser = await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
            isVerified: true,
            emailVerified: true,
        },
    });

    return updatedUser;
};

const resendVerificationOTP = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (!user.isActive) {
        throw new AppError(httpStatus.FORBIDDEN, "Account is inactive");
    }

    if (user.isVerified && user.emailVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is already verified");
    }

    // Spam prevention: check if there's a verification request for this email in the last 60 seconds
    const lastVerification = await prisma.verification.findFirst({
        where: {
            identifier: email.toLowerCase(),
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    if (lastVerification) {
        const lastRequestTime = new Date(lastVerification.updatedAt || lastVerification.createdAt).getTime();
        const timeSinceLastOtp = Date.now() - lastRequestTime;
        const cooldownMs = 60 * 1000; // 60 seconds cooldown

        if (timeSinceLastOtp < cooldownMs) {
            const secondsRemaining = Math.ceil((cooldownMs - timeSinceLastOtp) / 1000);
            throw new AppError(
                httpStatus.TOO_MANY_REQUESTS,
                `Please wait ${secondsRemaining} seconds before requesting a new OTP.`
            );
        }
    }

    await auth.api.sendVerificationOTP({
        body: {
            email: email.toLowerCase(),
            type: "email-verification",
        },
    });
};

const deleteAccount = async (userId: string) => {
    // 1. Find user to validate existence
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }


    // 3. Perform database deletions in transaction
    await prisma.$transaction(async (tx: any) => {
        // Delete Better Auth Sessions & Accounts (can also rely on Cascade, but explicitly doing it as requested)
        await tx.session.deleteMany({ where: { userId } });
        await tx.account.deleteMany({ where: { userId } });

        // Delete Friend Requests & Friends
        await tx.friend.deleteMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
        });

        // Delete Subscriptions
        await tx.subscription.deleteMany({ where: { userId } });

        // Delete Notifications (Sent and Received)
        await tx.notification.deleteMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
        });

        // Delete Video interactions
        await tx.videoReaction.deleteMany({ where: { userId } });
        await tx.videoReport.deleteMany({ where: { userId } });
        await tx.videoTag.deleteMany({ where: { userId } });

        // Delete Story interactions
        await tx.storyTag.deleteMany({ where: { taggedUserId: userId } });

        // Delete Videos and Stories
        await tx.video.deleteMany({ where: { userId } });
        await tx.story.deleteMany({ where: { userId } });

        // Delete User record
        await tx.user.delete({ where: { id: userId } });
    });

    // 4. Delete media from S3 (User Profile Image, Videos, Stories)
    const s3Deletions: Promise<void>[] = [];

    if (user.profileImage) {
        s3Deletions.push(deleteFromS3(user.profileImage));
    }





    // Await all S3 deletions
    await Promise.allSettled(s3Deletions);
};



export const userService = {
    signUpEmail,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    sendVerificationOTP,
    verifyEmailOTP,
    resendVerificationOTP,
    deleteAccount,
};
