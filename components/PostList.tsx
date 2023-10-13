import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostProps = {
  posts: Post[];
};

export async function BlogList({ posts }: PostProps) {
  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.$id}
          className="self-center w-full overflow-hidden shadow-md sm:max-w-2xl rounded-xl md:max-w-sm "
        >
          <CardHeader className="">
            <CardTitle className="w-full text-2xl [text-wrap:balance] tracking-wide truncate text-black dark:text-white font-semibold flex gap-4 justify-between">
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm truncate text-muted-foreground">
            {post.body}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
