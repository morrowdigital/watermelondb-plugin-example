import React, {createContext, ReactNode, useContext, useState} from "react";
import {Redirect} from "expo-router";
import {getDb} from "../model/helpers";

export type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const Auth = createContext<AuthContextType | null>(null);

export function AuthContextProvider ({children}: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);

        const db = getDb();
        db.write(() => {
            return db.unsafeResetDatabase();
        });
    };

    return (
        <Auth.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </Auth.Provider>
    );
}

export function AuthGuard({children}: {children: ReactNode}) {
    const auth = useContext(Auth);

    if (!auth) {
        throw new Error('AuthGuard must be used within an AuthContextProvider');
    }

    if (!auth.isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return children;

}
