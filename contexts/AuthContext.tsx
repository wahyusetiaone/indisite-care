import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Account, Roles, Branches,  Features } from "@/types/AuthContextTypeData";

// Define tipe data untuk state auth
interface AuthState {
    isAuth: boolean; // Status autentikasi
    isAccount: Account | null; // Informasi akun
    isRoles: Roles; // Array roles
    isBranches: Branches; // Array branches
    isFeatures: Features; // Array features
    login: (token: string) => void; // Fungsi untuk login
    logout: () => void; // Fungsi untuk logout
}

// Context default value
const AuthContext = createContext<AuthState>({
    isAuth: false,
    isAccount: null,
    isRoles: [],
    isBranches: [],
    isFeatures: [],
    login: () => {},
    logout: () => {},
});

// Custom hook untuk parsing token
const parseToken = (token: string) => {
    try {
        // Decode token menggunakan fungsi parsing base64
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
};

// Provider untuk AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isAccount, setIsAccount] = useState<Account | null>(null);
    const [isRoles, setIsRoles] = useState<Roles>([]);
    const [isBranches, setIsBranches] = useState<Branches>([]);
    const [isFeatures, setIsFeatures] = useState<Features>([]);

    // Fungsi untuk login (men-setting global auth state)
    const login = (token: string) => {
        const decodedToken = parseToken(token);
        if (decodedToken) {
            setIsAuth(true);
            setIsAccount({
                email: decodedToken.email,
                username: decodedToken.username,
            });
            setIsRoles(decodedToken.account_data?.roles || []);
            setIsBranches(decodedToken.account_data?.branches || []);
            const features = decodedToken.account_data?.branches.flatMap(
                (branch: any) => branch.branchType.features || []
            );
            setIsFeatures(features || []);
        }
    };

    // Fungsi untuk logout (reset semua state)
    const logout = () => {
        setIsAuth(false);
        setIsAccount(null);
        setIsRoles([]);
        setIsBranches([]);
        setIsFeatures([]);
    };

    // Simulaasi refresh token jika token tersimpan di `localStorage`
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            login(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, isAccount, isRoles, isBranches, isFeatures, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook untuk menggunakan AuthContext
export const useAuthContext = () => useContext(AuthContext);