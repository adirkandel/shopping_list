import { Client, Databases } from "node-appwrite";
import { config } from "dotenv"
import { CollectionsList } from "../functions/core/consts";
import { createCollectionsAndAttributes } from "./utils";

config()

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")      // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)     // Your project ID
  .setKey(process.env.APPWRITE_KEY!);               // Your secret API key

const databases = new Databases(client);

(async () => {
  for (let { id, name, model } of Object.values(CollectionsList)) {
    await createCollectionsAndAttributes(databases, id, name, model)
  }
})()