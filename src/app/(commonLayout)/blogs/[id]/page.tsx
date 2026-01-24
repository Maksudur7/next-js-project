// This can be use only in client component
// import { useParams } from "next/navigation"
// import {BlogPost} from "@/types"
import { blogService } from "@/services/blog.service";

// export const daynamicParams = false;

export async function generateStaticParams() {
    const { data } = await blogService.getBlogPost()

    return data?.data?.map((blog: any) => ({ id: blog.id }))
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);
    const { data: blog } = await blogService.getBlogById(id)
    const wordCount = blog.content.split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    // This can be use only in client component
    // const {id} = useParams()
    return (
        <div>
            <h1>This is a daynamic page</h1>
        </div>
    )
}