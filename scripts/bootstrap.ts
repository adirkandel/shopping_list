import { Client, Databases } from "node-appwrite";
import { config } from "dotenv"
import { CollectionsList } from "../functions/core/consts";
import { createCollectionsAndAttributes } from "./utils";
import { ListModel } from "../functions/list/types";

config()

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")      // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)     // Your project ID
  .setKey(process.env.APPWRITE_KEY!);               // Your secret API key

const databases = new Databases(client);

(async () => {
  const { LIST_COLLECTION } = CollectionsList
  await createCollectionsAndAttributes(databases, LIST_COLLECTION.id, LIST_COLLECTION.name, ListModel)
})()