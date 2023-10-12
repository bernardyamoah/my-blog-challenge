
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
          <CardTitle className="w-full text-2xl [text-wrap:balance] tracking-wide truncate text-black dark:text-white font-semibold flex gap-4 justify-between">
                   {post.title}
        
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
