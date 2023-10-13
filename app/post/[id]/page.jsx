

import getPostById from "@/lib/getPostById";
import Post from './post'
import { PresetActions } from "@/components/blog-actions";

export default async function Page({params: {id}}) {

 const post= await getPostById(id)

  return (
 <>
<div className="max-w-3xl mx-auto">

 <>
  <Post post={post} key={post.$id} />

</>

</div>
 </>
  
  );
};

