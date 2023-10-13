'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/deletePost"
import { useRouter } from "next/navigation"
import { updatePost } from "@/lib/updatePost"
export default function Post({post}) {
    const {title, body, $id} = post
    const router= useRouter()
    const [updatedPost, setUpdatedPost] = useState({ title, body });
   const [updatedName, setUpdatedName] = useState(title);
const [showDialog, setShowDialog] = useState(false);
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const handleUpdate = () => {
    updatePost($id, { title: updatedPost.title, body: updatedPost.body })
    };
    const handleDelete = () => {
     deletePost($id)
        setShowDeleteDialog(false);
        router.push('/')
    };
   
    return (
    <>
    <section >
 <div className="flex items-center justify-center gap-6 mb-10">
 <Button variant='destructive' onClick={() => setShowDeleteDialog(true)}>   <Trash className="w-4 h-4" /> </Button>
 <Button onClick={()=>setShowDialog(true)}>   <Edit className="w-4 h-4 " /> </Button>
 </div>
        <h1 className="mb-6 text-2xl text-center uppercase md:text-3xl text-semibold"> {title} </h1>
 <aside className="max-w-xl mx-auto text-center ">
{updatedPost.body}
 </aside></section>


 <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Edit the name and body of the post.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            {/* update the file name */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="block col-span-4 text-left">
                Name
              </Label>
              <Input
                id="name"
                value={updatedName}
                onChange={(event) => setUpdatedName(event.target.value)}
                className="block col-span-4"
              />
            </div>

            <Separator />
        
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="body" className="col-span-4 text-left">
               Body
              </Label>
             <Textarea className="w-full col-span-4 h-44"       onChange={(event) => setUpdatedBody(event.target.value)}>
             { updatedPost.body}
             </Textarea>
            </div>


          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate} >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {/* <span className="text-gray-700 dark:text-gray-200">{name}</span>. */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
       
 
  )
}
