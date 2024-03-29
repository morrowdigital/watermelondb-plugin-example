import React, {createContext, ReactNode, useContext, useState} from "react";
import {Redirect} from "expo-router";

export type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const Auth = createContext<AuthContextType | null>(null);

export function AuthContextProvider ({children}: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
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
