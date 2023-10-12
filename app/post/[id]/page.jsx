

import getPostById from "@/lib/getPostById";
import Post from './post'
export default async function Page({params: {id}}) {

 const postContent= await getPostById(id)
 console.log("🚀 ~ file: page.jsx:8 ~ Page ~ postContent:", postContent)

  return (
 <>
{postContent.map((post)=>(
  <Post post={post} />
 )) }
 
 </>
  
  );
};

