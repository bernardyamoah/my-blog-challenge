export default async function getUserPosts(id) {
   
    const posts = await fetch (`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
if(!posts.ok) {
    console.log("🚀 ~ file: getUserPosts.js:5 ~ getUserPosts ~ posts:", posts)
    throw new Error('Cannot fetch data');
}

    return posts.json();
    }