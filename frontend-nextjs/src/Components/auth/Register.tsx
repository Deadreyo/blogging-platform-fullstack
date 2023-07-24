import { BASE_URL } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";

export default function Register() {

  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = emailRef.current?.value;
      const name = nameRef.current?.value;
      const password = passwordRef.current?.value;

      const req = await fetch(BASE_URL+"/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email,
              password,
              name
          })
      })

      const res = await req.json();
      if(req.ok) {
          alert("Error: " + res.message);
      } else {
          localStorage.setItem("token", res.data.token);
          router.push("/");
      }

  }
    return (
        <div>
          <h1 className='mt-5'>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" ref={nameRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
    )
}