'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { createPost } from '@/lib/createPost';
import React, { useState } from 'react'

export default function page() {
    const [form, updateForm]=useState({
        title:'',
        body:'',
        username:'',
        postId:''
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        updateForm({ ...form, [name]: value });
    }

    const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         
       await createPost({ ...form, postId: parseInt(form.postId) })
        // Reset the form values
    updateForm({
        title:'',
        body:'',
        username:'',
        postId:''
    });
    }

   
  return (
    <div>
      <p>Create Post</p>

      <form onSubmit={handleSubmit} className='max-w-3xl mx-auto'>
                <div>
                    <label>Title:</label>
                    <Input type='text' name='title' value={form.title} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Body:</label>
                    <Input type='text' name='body' value={form.body} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Username:</label>
                    <Input type='text' name='username' value={form.username} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Post ID:</label>
                    <Input type='text' name='postId' value={form.postId} onChange={handleInputChange} />
                </div>
                <Button type="submit">Create</Button>
            </form>
    </div>
  )
}
