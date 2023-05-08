import { Client, Databases } from "node-appwrite";
import { config } from "dotenv"
import { CollectionsList } from "../functions/core/consts";

config()

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")      // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)     // Your project ID
  .setKey(process.env.APPWRITE_KEY!);               // Your secret API key

const databases = new Databases(client);

(async () => {
  const promises: Promise<string>[] = []

  const entries = Object.entries(CollectionsList)

  entries.forEach(([collectionName, collection]) => {
    promises.push(new Promise<string>(async () => {
      await databases.deleteCollection(process.env.APPWRITE_DATABASE_ID!, collection.id)
      console.log(`Collection name: ${collection.name} was deleted successfully`)
    }))
  })

  await Promise.all(promises)
})()