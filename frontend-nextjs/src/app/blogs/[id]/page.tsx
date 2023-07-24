"use client"

import Loading from "@/Components/common/Loading"
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"
import { Container } from "react-bootstrap"

export default function Blog({ params }: { params: { id: string } }) {

    const {response: blog, error, isLoading} = useFetch<Blog>("/blogs/"+params.id)

    if(isLoading) return <Loading />
    if(error) return <h1>Error</h1>
    return (
        <Container>
            <h1>
                {blog!.title}
            </h1>
            <h3>
                By {blog!.author.name} on {new Date(blog!.createdAt).toDateString()}
            </h3>

            <p>
                {blog!.content}
            </p>
        </Container>
    )
}