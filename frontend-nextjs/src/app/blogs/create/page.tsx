"use client"

import { Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import { BASE_URL } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    if(!localStorage.getItem("token")) router.push("/login");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // @TODO: Validate form
        // @TODO: make custom hook for post requests
        const req = await fetch(BASE_URL+"/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                title,
                content
            })
        })

        const res = await req.json();
        if(!res.ok) {
            alert("Error: " + res.message);
        } else {
            alert("Blog created successfully!");
        }

    }

    return (
        <Container>
            <h1>Create a new blog</h1>
            <Form onSubmit={handleSubmit} className="mt-2">
                <Form.Group className="mb-3" controlId="ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="title" placeholder="New Blog Title" value={title} onChange={handleTitleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={handleContentChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
