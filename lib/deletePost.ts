import { toast } from "sonner";
import { databases } from "./appwrite";

export const deletePost = async (id: string) => {
	try {
	  const getDoc = await databases.getDocument(
		process.env.NEXT_PUBLIC_DATABASE_ID!,
		process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
		id
	  );
  
	  if (getDoc.$id === id) {
		await databases.deleteDocument(
		  process.env.NEXT_PUBLIC_DATABASE_ID!,
		  process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
		  id
		);
  
		toast.success("Post deleted! 🎉");
		return;
	  }
  
	  throw new Error("Failed to delete Post ❌");
	} catch (err) {
	  toast.error("Failed to delete Post ❌");
	}
  };