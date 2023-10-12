"use client";

import React, {  useState } from "react";
import {  Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


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

import { Separator } from "@radix-ui/react-dropdown-menu";


import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import deletePost from '@/lib/deletePost'


interface PresetActionsProps {
post:Post
}

export async function PresetActions({ post }: PresetActionsProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [updatedName,setUpdatedName]=useState(post.title)
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState("");
  const selectedPostId = post.id;

  const handleUpdate = () => {
    const updatedPosts: Post[] = posts.map((post) => {
      if (post.id === selectedPostId) {
        return { ...post, body: body };
      }
      return post;
    });
  
    setPosts(updatedPosts);
    setShowDialog(false);
  };

const handleDelete =  () => {
  try {
    
     deletePost(post.id);
    
   
    setPosts(posts.filter(p => p.id !== post.id));
    
    // Show success message
    toast.success("Post deleted successfully");
  } catch (error) {
    // Show error message
    toast.error("Failed to delete post");
  }
};

 
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-2 p-2 text-gray-700 bg-transparent border-none dark:text-gray-100 hover:bg-transparent">
            <span className="sr-only ">Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowDialog(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-700 hover:!bg-red-200/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
  );
}
