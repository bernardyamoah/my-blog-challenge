import { Query, databases } from "./appwrite";

export const  getPosts= async (): Promise<any[]> => {
	if (!process.env.NEXT_PUBLIC_DATABASE_ID!) {
		throw new Error("Database ID is not defined");
	}

	try {
		const response = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID,
			process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
            [Query.limit(99), Query.orderDesc("$createdAt")]
		);

		
		return response.documents;
	} catch (error) {
		throw error;
	}
}