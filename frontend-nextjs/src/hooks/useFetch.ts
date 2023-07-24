import { useState, useEffect } from "react";

export const BASE_URL = "http://localhost:3001/"

export default function useFetch<T>(route: string, options?: RequestInit) {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(BASE_URL+route, options);
                const json = await res.json();
                setResponse(json);
                if(!res.ok) {
                    throw new Error(json.message);
                }
            } catch (error) {
                setError(error as Error);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [options, route]);

    return { response, error, isLoading };
}