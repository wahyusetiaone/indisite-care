import apiConfig from '../../config/apiConfig';
import appConfig from '../../config/appConfig';
import { AuthCodeRequest, AuthCodeResponse } from './types/AuthInterface';
import { TokenRequest, TokenResponse } from './types/TokenInterface';
import { WrappedResponse } from '@/types/WrappedResponse';

export async function requestAuthCode(email: string, state: string = 'xyz123'): Promise<AuthCodeResponse> {
    const request: AuthCodeRequest = {
        clientId: appConfig.clientId, // Mengambil clientId dari konfigurasi
        email,
        redirectUri: appConfig.redirectUri, // RedirectUri dari konfigurasi
        state,
    };

    const response = await fetch(`/auth-api/oauth2/authorize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error('Failed to get authorization code');
    }

    const result: WrappedResponse<AuthCodeResponse> = await response.json();

    if (!result.success) {
        throw new Error(result.message || 'Authorization failed');
    }

    return result.data;
}

export async function requestToken(code: string, username: string, password: string): Promise<TokenResponse> {
    const request: TokenRequest = {
        code,
        username,
        password,
        redirectUri: appConfig.redirectUri, // RedirectUri dari konfigurasi
    };

    const response = await fetch(`/auth-api/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error('Failed to get access token');
    }

    const result: WrappedResponse<TokenResponse> = await response.json();

    if (!result.success) {
        throw new Error(result.message || 'Token request failed');
    }

    return result.data;
}

