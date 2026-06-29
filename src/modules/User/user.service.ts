import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";

import { deleteFromS3 } from "../../utils/s3Upload";
import { paymentService } from "../payment/payment.service";


const getProfile = async (userId: string) => {
    // 1. Fetch user info
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            bio: true,
            profileImage: true,
            role: true,
            isVerified: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found or inactive");
    }

    // 2. Get video count and friend count only
    const [videoCount, friendCount] = await Promise.all([
        prisma.video.count({
            where: {
                userId,
                isDeleted: false,
            },
        }),
        prisma.friend.count({
            where: {
                status: "ACCEPTED",
                OR: [
                    { senderId: userId, receiver: { isActive: true } },
                    { receiverId: userId, sender: { isActive: true } },
                ],
            },
        }),
    ]);

    // 3. Fetch user active stories
    const currentDate = new Date();
    const stories = await prisma.story.findMany({
        where: {
            userId,
            expiresAt: {
                gt: currentDate,
            },
            isDeleted: false,
        },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            mediaUrl: true,
            caption: true,
            createdAt: true,
            expiresAt: true,
        },
    });

    // Fetch subscription data for the user
    const subscription = await paymentService.getMySubscription(userId);
    return {
        user,
        videoCount,
        friendCount,
        stories,
        subscription,
    };
};

const updateProfile = async (userId: string, payload: any) => {
    // Remove fields that shouldn't be updated
    const { email, role, isVerified, password, ...updateData } = payload;

    // Check if user exists and is active
    const user = await prisma.user.findUnique({
        where: { id: userId, isActive: true },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found or inactive");
    }

    // If new profileImage is provided, delete the old one
    if (updateData.profileImage && user.profileImage && updateData.profileImage !== user.profileImage) {
        await deleteFromS3(user.profileImage);
    }

    // Validate username uniqueness if provided
    if (updateData.username) {
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: updateData.username,
                id: { not: userId },
            },
        });

        if (existingUsername) {
            throw new AppError(httpStatus.CONFLICT, "Username already exists");
        }
    }

    // Perform the update
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            bio: true,
            profileImage: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return updatedUser;
};


export const userService = {
    getProfile,
    updateProfile,
};