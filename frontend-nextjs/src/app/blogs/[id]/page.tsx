import Loading from "@/Components/common/Loading"
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/router"

export default function Blog({ params }: { params: { slug: string } }) {

    const {response: blog, error, isLoading} = useFetch<Blog>("/blogs/"+params.slug)

    if(isLoading) return <Loading />
    if(error) return <h1>Error</h1>
    return (
        <div>
            <h1>
                {blog!.title}
            </h1>
            <h2>
                By {blog!.author.name} on {new Date(blog!.createdAt).toISOString()}
            </h2>

            <p>
                {blog!.content}
            </p>
        </div>
    )
}