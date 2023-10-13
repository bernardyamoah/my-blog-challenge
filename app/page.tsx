'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {getPosts} from "@/lib/getPosts";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";



export default async function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [posts.length]);
return (
  <section >

  <h1 className="mb-16 text-2xl text-center uppercase md:text-5xl text-bold">Blogs</h1>
    <main className="flex flex-wrap max-w-6xl gap-6 px-6 pb-16 mx-auto sm:grid sm:grid-cols-2 md:grid-cols-3 place-content-center">
    {posts.map((post) => (
        <Card key={post.$id} 
          className="self-center w-full overflow-hidden shadow-md sm:max-w-2xl rounded-xl md:max-w-sm "
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-2xl capitalize">
              {post.title}
             
            </CardTitle>
            <span className="text-sm hover:underline text-amber-500"
            >
              @{post.username}
            </span>
          </CardHeader>

          <CardContent>
           
            <div className="truncate text-muted-foreground">{post.body}</div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Badge variant='outline' className="text-xs text-muted-foreground">
              {new Date(post.$createdAt).toLocaleDateString()}
            </Badge>
              <Link
                href={`/post/${post.$id}`}
                className="text-sm hover:underline text-amber-500"
                >
                <Button className="w-full h-full">
                Read more
            </Button>
              </Link>
          </CardFooter>
        </Card>
      ))}
    </main>

  </section>
  )
}



