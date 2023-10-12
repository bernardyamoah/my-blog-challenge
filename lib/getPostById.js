export default async function getPostById(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1/comments?id=${id}`);
    if (!response.ok) {
    
      throw new Error("Could not fetch post");
    }
    const post = await response.json();
   
    return post;
  }
  