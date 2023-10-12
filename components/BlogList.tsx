
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DotIcon } from "lucide-react";
import Link from "next/link";
import { PresetActions } from "./blog-actions";
// async function getAllposts() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1', { cache: 'force-cache' });
//   const posts = await response.json();

//   const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' });
//   const posts = await postsResponse.json();
//   const postsWithpostData = posts.map((post: any) => {
//     const post = posts.find((post: post) => post.id === post.id);
//     return { ...post, post };
//   });

//   const postsWithPhotos = await Promise.all(
//     postsWithpostData.map(async (post: any) => {
//       const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos/1');
    
//      const thumbnail= await photosResponse.json().then((data) => data.thumbnailUrl);
     
//       return { ...post, thumbnail }; // Add the thumbnail as a property in the post object
//     })
//   );

//   return postsWithPhotos;
// }

type PostProps = {
posts: Post[]
};


export async function BlogList({posts}:PostProps) {


  return (
   
<>

{
posts.map((post) => (
        <Card
        key={post.id}
        className="sm:max-w-2xl w-full rounded-xl shadow-md overflow-hidden md:max-w-sm self-center "
      >
        <CardHeader className="">
          <CardTitle className="w-full [text-wrap:balance] tracking-wide text-sm text-black dark:text-white font-semibold flex gap-4 justify-between">
                   {post.title}
        <PresetActions  name={post.title} id={post.id} />
                  </CardTitle>
          </CardHeader>
      
           <CardContent className="truncate text-sm text-muted-foreground">

{post.body}
           </CardContent>
         
       
      </Card>
      
        )
 )
    }

</>
    
  )
}
