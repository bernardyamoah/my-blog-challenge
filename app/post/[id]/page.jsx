

import getPostById from "@/lib/getPostById";
import Post from './post'

export default async function Page({params: {id}}) {

 const postContent= await getPostById(id)

  return (
 <>
<div className="max-w-3xl mx-auto">
{postContent.map((post)=>(
  <Post post={post} />
 )) }
</div>
 
 </>
  
  );
};

