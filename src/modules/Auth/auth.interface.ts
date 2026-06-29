export type IUserRegistration = {
    fullName: string;
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
    fcmToken?: string;
};

export type IUserLogin = {
    email: string;
    password: string;
    fcmToken?: string;
};