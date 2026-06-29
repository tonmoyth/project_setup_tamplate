import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: any;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: any;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: any;
export declare const ModelName: {
    readonly Friend: "Friend";
    readonly Notification: "Notification";
    readonly VideoReaction: "VideoReaction";
    readonly VideoReport: "VideoReport";
    readonly Story: "Story";
    readonly StoryTag: "StoryTag";
    readonly Subscription: "Subscription";
    readonly User: "User";
    readonly Session: "Session";
    readonly Account: "Account";
    readonly Verification: "Verification";
    readonly Video: "Video";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const FriendScalarFieldEnum: {
    readonly id: "id";
    readonly senderId: "senderId";
    readonly receiverId: "receiverId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type FriendScalarFieldEnum = (typeof FriendScalarFieldEnum)[keyof typeof FriendScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly senderId: "senderId";
    readonly receiverId: "receiverId";
    readonly title: "title";
    readonly body: "body";
    readonly type: "type";
    readonly isRead: "isRead";
    readonly videoId: "videoId";
    readonly storyId: "storyId";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const VideoReactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly videoId: "videoId";
    readonly createdAt: "createdAt";
};
export type VideoReactionScalarFieldEnum = (typeof VideoReactionScalarFieldEnum)[keyof typeof VideoReactionScalarFieldEnum];
export declare const VideoReportScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly videoId: "videoId";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type VideoReportScalarFieldEnum = (typeof VideoReportScalarFieldEnum)[keyof typeof VideoReportScalarFieldEnum];
export declare const StoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly mediaUrl: "mediaUrl";
    readonly caption: "caption";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type StoryScalarFieldEnum = (typeof StoryScalarFieldEnum)[keyof typeof StoryScalarFieldEnum];
export declare const StoryTagScalarFieldEnum: {
    readonly id: "id";
    readonly storyId: "storyId";
    readonly taggedUserId: "taggedUserId";
    readonly createdAt: "createdAt";
};
export type StoryTagScalarFieldEnum = (typeof StoryTagScalarFieldEnum)[keyof typeof StoryTagScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly subscriberId: "subscriberId";
    readonly subscribedToId: "subscribedToId";
    readonly createdAt: "createdAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly emailVerified: "emailVerified";
    readonly password: "password";
    readonly bio: "bio";
    readonly profileImage: "profileImage";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly expiresAt: "expiresAt";
    readonly token: "token";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly userId: "userId";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly accountId: "accountId";
    readonly providerId: "providerId";
    readonly userId: "userId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly idToken: "idToken";
    readonly accessTokenExpiresAt: "accessTokenExpiresAt";
    readonly refreshTokenExpiresAt: "refreshTokenExpiresAt";
    readonly scope: "scope";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly identifier: "identifier";
    readonly value: "value";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const VideoScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly videoUrl: "videoUrl";
    readonly caption: "caption";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map