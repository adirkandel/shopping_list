import { Client, Databases } from "node-appwrite";
import { config } from "dotenv"
import { CollectionsList } from "../functions/core/collections";
import { createCollections, createCollectionsAttributes } from "./utils";

config()

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")      // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)     // Your project ID
  .setKey(process.env.APPWRITE_KEY!);               // Your secret API key

const databases = new Databases(client);

(async () => {
  let promises: Promise<void>[] = []
  for (let { id, name, model } of Object.values(CollectionsList)) {
    promises.push(createCollections(databases, id, name, model))
  }
  await Promise.all(promises)

  promises = []
  for (let { id, model } of Object.values(CollectionsList)) {
    promises.push(createCollectionsAttributes(databases, id, model))
  }
  await Promise.all(promises)
})()