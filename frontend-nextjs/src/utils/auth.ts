import { BASE_URL } from "@/hooks/useFetch";
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token: string) {
    localStorage.setItem('token', token);
}

function removeToken() {
   localStorage.removeItem('token');
} 

async function login(email: string, password: string) {
    const res = await fetch(BASE_URL+'/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if(!res.ok) {
        throw new Error(json.message);
    }
    setToken(json.token);
    return json.token;
}

async function register(username: string, email: string, password: string) {
    const res = await fetch(BASE_URL+'/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const json = await res.json();
    if(!res.ok) {
        throw new Error(json.message);
    }
    setToken(json.token);
    return json.token;
}

function logout() {
    removeToken();
}

export default {
    getToken,
    login,
    register,
    logout
}