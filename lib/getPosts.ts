export default async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
    if(!response.ok) {
        throw new Error('Could not fetch post');
    }

    const data = await response.json();
    

    return data as Post[];
}