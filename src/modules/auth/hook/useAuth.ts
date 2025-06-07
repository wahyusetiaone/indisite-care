import { useState } from 'react';
import { requestAuthCode, requestToken } from '@/services/cores/AuthService';
import { TokenRequest, TokenResponse } from '@/services/cores/types/TokenInterface';
import Cookies from 'js-cookie';

export function useAuth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //dummy
    const email = 'wahyusetiaone27@gmail.com';
    
    const loginUser = async (username: string, password: string): Promise<TokenResponse> => {
        setLoading(true);
        setError(null);

        try {
            // 1. Minta auth code ke server
            const authCodeResponse = await requestAuthCode(email, username); // Misalnya, state tetap "email"

            // 2. Gunakan auth code untuk permintaan token
            const tokenResponse = await requestToken(authCodeResponse.code, username, password);

            console.log(tokenResponse);
            // Simpan token di cookies
            Cookies.set('accessToken', tokenResponse.accessToken, { expires: 1, secure: false });
            Cookies.set('refreshToken', tokenResponse.refreshToken, { expires: 30, secure: false });

            return tokenResponse;
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    const logoutUser = () => {
        // Hapus cookies saat logout
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = "/login";
    };


    return { loginUser, logoutUser, loading, error };
}