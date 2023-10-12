

import { BlogList } from "@/components/BlogList";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";

export default async function Page({params: {id}}) {
const userData = await getUser(id)
 const userPosts= await getUserPosts(id)
 const [user,posts]= await Promise.all([userData,userPosts])
  return (
    <div >
          <h1 className="text-2xl md:text-3xl text-center text-bold uppercase mb-16"> {user.name} Posts</h1>
  
 <section className=" w-full flex items-center justify-center flex-wrap gap-6">
 <BlogList posts={posts} />
 </section>
    </div>
  );
};

