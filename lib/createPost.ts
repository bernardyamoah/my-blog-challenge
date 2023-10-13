import { toast } from "sonner";
import { ID, databases } from "./appwrite";

export const createPost = async (postData:PostData) => {
	try {
		const response = await toast.promise(
			databases.createDocument(
				process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
				process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!, // Replace with your collection ID
				ID.unique(),
				postData
			),
			{
				loading: "Creating Post..",
				success: "Post created! 🎉",
				error: "Failed to post",
			}
		);
		return response;
	} catch (error) {
		
		toast.error("Error: " + error);
	}
};
