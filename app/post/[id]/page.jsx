'use client'

import getPostById from "@/lib/getPostById";
import Post from './post'
import { PresetActions } from "@/components/blog-actions";

export default async function Page({params: {id}}) {

 const postContent= await getPostById(id)

  return (
 <>
<div className="max-w-3xl mx-auto">
{postContent.map((post)=>(
 <>
  <Post post={post} key={post.id} />

</>
 )) }
</div>
 </>
  
  );
};

