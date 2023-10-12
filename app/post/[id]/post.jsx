'use client'

import { toast } from "sonner"

export default function Post({post}) {
    const {name, body} = post
    
    toast.success("Post Loaded")
    return (
    <>
    <section className=" ">
        <h1 className="text-2xl md:text-3xl text-center text-semibold uppercase mb-16"> {name} </h1>
 <aside className=" max-w-xs text-center mx-auto ">
{body}
 </aside></section>
    </>
       
 
  )
}
