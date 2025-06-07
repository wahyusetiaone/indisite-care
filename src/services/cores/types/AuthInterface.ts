export interface AuthCodeRequest {
    clientId: string;
    email: string;
    redirectUri: string;
    state: string;
}

export interface AuthCodeResponse {
    code: string;
    state: string;
    expiresIn: number;
}