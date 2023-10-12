export default async function getPosts() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
    if(!posts.ok) {
        throw new Error('Could not fetch user');
    }

    return await posts.json();
}