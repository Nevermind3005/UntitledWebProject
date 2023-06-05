export type RefreshToken = {
    token: string;
    createdAt: Date;
    expiresAt: Date;
    revoked: Date | null;
};
