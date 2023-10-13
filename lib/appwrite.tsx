import { Client, ID, Databases,Query } from 'appwrite';
const client= new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)


const databases= new Databases(client)


export {client,databases,ID,Query};