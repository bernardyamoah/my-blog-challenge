"use client";

import {  useState } from "react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


import { toast } from "sonner";

import { createPost } from '@/lib/createPost';
import { DialogTrigger } from "@radix-ui/react-dialog";


export function PresetActions() {
  const [showDialog, setShowDialog] = useState(false);

  const [form, updateForm]=useState({
    title:'',
    body:'',
    username:'',
 
})

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  updateForm({ ...form, [name]: value });
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
   
  await createPost({ ...form })
  setShowDialog(false)
  // Reset the form values
updateForm({
  title:'',
  body:'',
  username:''
 
});
}


 
  return (
    <>
    
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger>Create Post</DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Edit the name and body of the post.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            {/* update the file name */}
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
               
                {/* <Button type="submit">Create</Button> */}
                <DialogFooter>
            <Button type="submit" className="mt-4" >
              Save changes
            </Button>
          </DialogFooter>
            </form>

          </div>
          
        </DialogContent>
      </Dialog>


   </>
  )
}
