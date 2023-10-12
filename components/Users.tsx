
import { Card } from "@/components/ui/card"
import Link from "next/link";

import  getPosts  from "@/lib/getPosts";


export async function Blogs() {
  const  posts:Post[]= await getPosts()
  
  return (
   
<>

{
posts.map((post) => (
        <Card
        key={post.id}
        className="sm:max-w-2xl w-full rounded-xl shadow-md overflow-hidden md:max-w-sm self-center "
      >
        <Link href={`/post/${post.id}`} className="md:flex">
          <div className="md:flex-shrink-0">
            <span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
          </div>
          <div className="p-8 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
             
          
                <div className="ml-4">
                  <div className="uppercase tracking-wide text-sm text-black dark:text-white font-semibold">
                   {post.name}
                  </div>
            
                  <Link href={`/users/${post.id}`} className="hover:underline text-amber-500  text-sm">{post.email}</Link>
<div className="mt-3 text-muted-foreground">{post.body}</div> 
                
                </div>

              </div>
  
            </div>
           
            <div className="flex mt-6 justify-end items-center">
           
              <div className="text-muted-foreground text-xs">7:22 AM · Aug 22, 2023</div>
            </div>
          </div>
        </Link>
      </Card>
      
        )
 )
    }

</>
    
  )
}
