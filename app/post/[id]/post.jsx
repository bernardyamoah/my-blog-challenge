
export default function Post({post}) {
    const {name, body} = post
    
  return (
    <>
    <section className="max-w-4xl border">
        <h1 className="text-2xl md:text-3xl text-center text-semibold uppercase mb-16"> {name} </h1>
 <aside className=" max-w-xs w-full text-center mx-auto border">
{body}
 </aside></section>
    </>
       
 
  )
}
