import { toast } from "sonner";
import { databases } from "./appwrite";

export const updatePost = async (id: string, updatedAttributes: any) => {
	try {
		
		await databases.updateDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!, 
			id,
			updatedAttributes
		);

			toast.success("Successfully updated post");
		
	} catch (error) {
		
		toast.error("Failed to update post:" + error);
		console.log("🚀 ~ file: updatePost.ts:19 ~ updatePost ~ error:", error)
	}
};