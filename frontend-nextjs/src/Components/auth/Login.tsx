import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { BASE_URL } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import auth from "@/utils/auth";

export default function Login() {

    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // @TODO: Use state management library for storing token

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            await auth.login(email!, password!);
            router.push("/");
        } catch(e) {
            alert(e);
        }

    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </div>
    )
}