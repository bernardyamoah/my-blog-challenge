import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import getPosts from "@/lib/getPosts";
import { PresetActions } from "./blog-actions";
import { Button } from "./ui/button";

export async function Blogs() {
  const posts: Post[] = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="sm:max-w-2xl w-full rounded-xl shadow-md overflow-hidden md:max-w-sm self-center "
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-xl">
              {post.name}
              <PresetActions post={post} id={post.id} />
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
