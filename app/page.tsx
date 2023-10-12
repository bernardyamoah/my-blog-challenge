// import Image from 'next/image'

import { Blogs } from "@/components/Users";


export default function Home() {
  return (
   
  <section >
  <h1 className="text-2xl md:text-5xl text-center text-bold uppercase mb-16">Blogs</h1>
    <main className="pb-16 px-6 sm:grid sm:grid-cols-2 gap-6 md:grid-cols-3 max-w-6xl mx-auto place-content-center flex flex-wrap">
      <Blogs/>
    </main>

  </section>
  )
}
