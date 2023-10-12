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
export default function Post({post}) {
    const {name, body, id} = post
    const [updatedPost, setUpdatedPost] = useState(null);
const [updatedName, setUpdatedName] = useState(name);
const [showDialog, setShowDialog] = useState(false);
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const handleUpdate = () => {
        setUpdatedPost({ ...updatedPost, name: updatedName });
        toast.success("Post Loaded")
        setShowDialog(false);
    };
    const handleDelete = () => {
     
        toast.success("Post deleted")
        setShowDeleteDialog(false);
    };
   
    return (
    <>
    <section className="w-44">

        <h1 className="text-2xl md:text-3xl text-center text-semibold uppercase mb-6"> {name} </h1>
 <aside className=" max-w-xs text-center  ">
{body}
 </aside>
 <div className="flex gap-6 items-center justify-center mt-16">
 <Button variant='destructive' onClick={() => setShowDeleteDialog(true)}>   <Trash className="w-4 h-4 mr-2" /> delete</Button>
 <Button onClick={()=>setShowDialog(true)}>   <Edit className="w-4 h-4 mr-2" /> Edit</Button>
 </div>
 </section>

 
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
              <Label htmlFor="file" className="col-span-4 text-left">
               Body
              </Label>
             <Textarea className="col-span-4 w-full h-44">
            {post.body}
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
