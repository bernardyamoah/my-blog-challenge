'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import getPosts from "@/lib/getPosts";
// import { PresetActions } from "./blog-actions";
import { Button } from "./ui/button";
import { PresetActions } from "./blog-actions";
import { useEffect, useState } from "react";

export function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);
  async function deletePost(id: number): Promise<void> {
    try {
      const response = await fetch(`https://api.example.com/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Post with id ${id} deleted`);
      } else {
        console.error(`Failed to delete post with id ${id}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting post with id ${id}`, error);
    }
  }
  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="sm:max-w-2xl w-full rounded-xl shadow-md overflow-hidden md:max-w-sm self-center "
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-2xl capitalize">
              {post.name}
              <PresetActions  post={post} setPosts={setPosts} posts={posts}/>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Link
              href={`/users/${post.id}`}
              className="hover:underline text-amber-500  text-sm"
            >
              {post.email}
            </Link>
            <div className="mt-3 text-muted-foreground">{post.body}</div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button>
              <Link
                href={`/post/${post.id}`}
                className="hover:underline text-amber-500  text-sm"
              >
                Read more
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
