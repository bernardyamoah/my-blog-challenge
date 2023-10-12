
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PresetActions } from "@/components/blog-actions";

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
async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
  if(!response.ok) {
      throw new Error('Could not fetch post');
  }

  const data = await response.json();
  

  return data as Post[];
}
export default async function Home() {
const posts= await getPosts();

  return (
   
  <section >
  <h1 className="text-2xl md:text-5xl text-center text-bold uppercase mb-16">Blogs</h1>
    <main className="pb-16 px-6 sm:grid sm:grid-cols-2 gap-6 md:grid-cols-3 max-w-6xl mx-auto place-content-center flex flex-wrap">
    {posts.map((post) => (
        <Card key={post.email} 
          className="sm:max-w-2xl w-full rounded-xl shadow-md overflow-hidden md:max-w-sm self-center "
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-2xl capitalize">
              {post.name}
             
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
              <Link
                href={`/post/${post.id}`}
                className="hover:underline text-amber-500  text-sm"
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



