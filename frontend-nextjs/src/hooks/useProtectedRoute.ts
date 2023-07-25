import { AuthContext } from "@/Components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function useProtectedRoute() {
    const { token } = useContext(AuthContext)
    const router = useRouter();
    
    useEffect(() => {
        if(!token) router.replace('/login')
    }, [token])

    return token;
}