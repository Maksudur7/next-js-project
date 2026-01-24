import { blogService } from "@/services/blog.service";
import { notFound } from "next/navigation"; // Jodi blog na paowa jay

export async function generateStaticParams() {
    const response = await blogService.getBlogPost();
    const posts = response?.data || []; 
    
    return posts.map((blog: any) => ({
        id: blog.id.toString(), // ID-ke string e convert kora safe
    }));
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const response = await blogService.getBlogById(id);
    const blog = response?.data;

    if (!blog) {
        notFound();
    }

    const wordCount = blog.content?.split(/\s+/).length || 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <article className="max-w-3xl mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>Reading time: {readingTime} min read</span>
                    <span>•</span>
                    <span>Words: {wordCount}</span>
                </div>
            </header>

            <div className="prose lg:prose-xl dark:prose-invert">
                <p className="whitespace-pre-wrap">{blog.content}</p>
            </div>

            <div className="mt-10 border-t pt-6">
                <p className="font-semibold text-blue-600">Category: {blog.category || "General"}</p>
            </div>
        </article>
    );
}