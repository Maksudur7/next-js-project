import { blogService } from "@/services/blog.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BlogsPage() {
    const response = await blogService.getBlogPost(
        { isFeatured: false, search: "" },
        { cache: "no-store" }
    );
    
    const blogs = response?.data || [];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog: any) => (
                        <div key={blog.id} className="border rounded-xl p-5 hover:shadow-lg transition">
                            {/* Blog Image (jodi thake) */}
                            {blog.image && (
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-48 object-cover rounded-md mb-4" 
                                />
                            )}
                            
                            <h2 className="text-xl font-semibold mb-2 line-clamp-1">
                                {blog.title}
                            </h2>
                            
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {blog.description || "No description available."}
                            </p>

                            <Link href={`/blogs/${blog.id}`}>
                                <Button variant="default" className="w-full">
                                    Read Full Blog
                                </Button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">Kono blog paowa jayni!</p>
                )}
            </div>
        </div>
    );
}