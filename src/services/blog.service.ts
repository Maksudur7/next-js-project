import { env } from "@/env"

const API_URL = env.API_URL
interface GetBlogsParams {
    isFeatured?: boolean;
    search: string;
}
interface ServiceOptions {
    cache?: RequestCache
    revalidate?: number
}
export const blogService = {
    getBlogPost: async function (params?: GetBlogsParams, options?: ServiceOptions) {
        try {
            const url = new URL(`${API_URL}/posts`)
            if (params) {
                Object.entries(params).forEach(([Key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {

                        url.searchParams.append(Key, value)
                    }
                })
            }
            const config: RequestInit = {};
            if (options?.cache) {
                config.next = { revalidate: options.revalidate }
            }
            const res = await fetch(url.toString(), config);
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "something went to wrong" } }
        }
    },
    getBlogById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    }
}