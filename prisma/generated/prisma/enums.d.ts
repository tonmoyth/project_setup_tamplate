export declare const UserRole: {
    readonly USER: "USER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const NotificationType: {
    readonly FRIEND_REQUEST: "FRIEND_REQUEST";
    readonly FRIEND_ACCEPT: "FRIEND_ACCEPT";
    readonly VIDEO_LOVE: "VIDEO_LOVE";
    readonly STORY_TAG: "STORY_TAG";
    readonly SUBSCRIPTION: "SUBSCRIPTION";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const FriendStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
};
export type FriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus];
export declare const ReportReason: {
    readonly DANGEROUS_DRINKING_BEHAVIOR: "DANGEROUS_DRINKING_BEHAVIOR";
    readonly UNSAFE_OR_LIFE_THREATENING: "UNSAFE_OR_LIFE_THREATENING";
    readonly MINOR_INVOLVEMENT: "MINOR_INVOLVEMENT";
    readonly BULLYING_OR_HARASSMENT: "BULLYING_OR_HARASSMENT";
    readonly ILLEGAL_ACTIVITY: "ILLEGAL_ACTIVITY";
    readonly OFFENSIVE_CONTENT: "OFFENSIVE_CONTENT";
};
export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason];
//# sourceMappingURL=enums.d.ts.map