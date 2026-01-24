import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
  const { data } = blogService.getBlogPost({
    isFeatured: true,
    search : "",
  },
  {
    cache : "no-store"
  })
  console.log(data);
  return (
    <div>
      <Button>Click hear</Button>
    </div>
  );
}
