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
import { getPosts } from "@/lib/getPosts";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/functions";
import { useEffect, useState } from "react";
import { AddPost } from "@/components/addPost";

export default  function Home() {
  // const posts: Post[] = await getPosts();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [posts]);

  const handleAddPost = async (newPost: Post) => {
    // Logic to add the new post to the list of posts
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  return (
    <section >
      <h1 className="mb-16 text-2xl text-center uppercase md:text-5xl text-bold">
        Blogs
      </h1>
      <Button  className="flex self-center mx-auto mb-8 text-center"><AddPost onAddPost={handleAddPost}/></Button>

      <main className="flex flex-wrap max-w-6xl gap-6 px-6 pb-16 mx-auto sm:grid sm:grid-cols-2 md:grid-cols-3 place-content-center">
        {posts.map((post) => (
          <Card
            key={post.$id}
            className="relative self-center w-full overflow-hidden shadow-md sm:max-w-2xl rounded-xl md:max-w-sm "
          >
               <Badge
  variant="outline"
                className="absolute text-[.62rem] top-4 shadow-sm right-6 "
              >
                {formatTime( post.$createdAt)}
              </Badge>
            <CardHeader>
              <CardTitle className="flex justify-between text-2xl capitalize">
                {post.title}
              </CardTitle>
              <span className="text-xs hover:underline text-amber-500">
                @{post.username}
              </span>
            </CardHeader>

            <CardContent>
              <div className="truncate text-muted-foreground">{post.body}</div>
            </CardContent>

            <CardFooter className="flex justify-end">
           
              <Link
                href={`/post/${post.$id}`}
                className=""
              >
                <Button className="w-full h-full">Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </main>
      
    </section>
  );
}
