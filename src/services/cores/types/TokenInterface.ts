export interface TokenRequest {
    code: string;
    username: string;
    password: string;
    redirectUri: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    scope: string;
}