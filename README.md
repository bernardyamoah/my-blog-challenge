## Project Documentation
This project uses Appwrite as the backend for database storage.

### Setup and Running the Project

To set up and run the project, follow these steps:

1. Clone the repository:

2. Install dependencies:
```
   cd your-repo
   npm install
```
3. Set up environment variables:
- Create a .env file in the root directory of the project.
- Add the following environment variables to the .env file:
```
     NEXT_PUBLIC_DATABASE_ID=your-database-id
     NEXT_PUBLIC_POSTS_COLLECTION_ID=your-collection-id
```

4. Start the development server:

```
   npm run dev
   ```

5. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

### Usage

#### Adding a Post

To add a post, follow these steps:

1. Click on the "Create Post" button.
2. Fill in the title, body, and username fields.
3. Click the "Save changes" button.
4. The post will be added to the database, and a success message will be displayed.

#### Deleting a Post

To delete a post, follow these steps:

1. Locate the post you want to delete.
2. Click the delete button associated with the post.
3. The post will be deleted from the database, and a success message will be displayed.

### Troubleshooting

If you encounter any issues while setting up or running the project, try the following troubleshooting steps:

- Make sure you have the latest version of Node.js installed.
- Double-check that you have correctly set up the environment variables in the `.env` file.
- Ensure that the required dependencies are installed by running `npm install` again.
- Check the console for any error messages and refer to the project's documentation or seek help from the project's community for further assistance.

### Conclusion

Congratulations! You have successfully set up and run the project. You can now add and delete posts using the provided functionality. If you have any further questions or need assistance, please don't hesitate to reach out to me at @bernardyamoah and twitter['https://twitter.com/byayamoah']