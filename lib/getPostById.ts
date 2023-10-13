
import { databases } from "./appwrite";

export default async function getPostById(id: string) {
    const getDoc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
        id
    );
 
    return getDoc ;
  }
  