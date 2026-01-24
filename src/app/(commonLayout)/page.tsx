import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";
import Link from "next/link"; 

export default async function Home() {
  const response = await blogService.getBlogPost(
    {
      isFeatured: true,
      search: "",
    },
    {
      cache: "no-store",
    }
  );

  const blogs = response?.data || []; 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Featured Blog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {blogs.length > 0 ? (
          blogs.map((post: any) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 line-clamp-2">{post.description}</p>
              <Link href={`/blog/${post.slug || post.id}`}>
                <Button variant="outline" className="mt-3">Read More</Button>
              </Link>
            </div>
          ))
        ) : (
          <p>Kono post paowa jayni.</p>
        )}
      </div>

      <Button>Click hear</Button>
    </div>
  );
}