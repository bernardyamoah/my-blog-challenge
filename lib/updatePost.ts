export default async function updatePost(post: Post, updatedName: string, updatedBody: string) {

const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: post.id,
        title: updatedName,
        body: updatedBody,
     
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json()
}