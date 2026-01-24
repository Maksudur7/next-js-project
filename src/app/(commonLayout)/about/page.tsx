"use client";

import { blogService } from "@/services/blog.service";
import { useEffect, useState } from "react";

export default async function AboutPage() {
    const [data, setData] = useState()
    useEffect(() => {
        (async () => {
            const { data } = await blogService.getBlogPosts();
            setData(data)
        })
    }, [])
    return (
        <div>
            <h1>This is about page</h1>
        </div>
    );
}
