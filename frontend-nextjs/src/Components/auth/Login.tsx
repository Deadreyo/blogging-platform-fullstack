import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { BASE_URL } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const req = await fetch(BASE_URL+"auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const res = await req.json();
        if(!res.ok) {
            alert("Error: " + res.message);
        } else {
            localStorage.setItem("token", res.data.token);
            router.push("/");
        }

    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </div>
    )
}