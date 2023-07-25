import auth from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useProtectedRoute() {
    const router = useRouter();
    
    useEffect(() => {
        if(auth.getToken() === null) router.replace('/login')
    }, [])
}