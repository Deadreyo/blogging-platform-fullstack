import auth from "@/utils/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface AuthContextData {
    token?: string;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
   
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string>();
    const router = useRouter();

    // check if token exists in auth.ts
    // @TODO: check if token is valid (make an endpoint in backend that validates token)
    useEffect(() => {
        const token = auth.getToken();
        setToken(token ?? undefined);
    }, [])

    async function login(email: string, password: string) {
        try{
            const token = await auth.login(email, password);
            setToken(token);
            router.push("/");
        } catch(e) {
            alert(e);
        }
    }

    async function register(email: string, password: string, name: string) {
        try{
            const token = await auth.register(email!, name!, password!);
            setToken(token);
            router.push("/");
        } catch(e) {
            alert(e);
        }
    }

    async function logout() {
        auth.logout();
        setToken(undefined);
    }

    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}