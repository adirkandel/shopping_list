import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";
import populateLists from "./lists";
import populateProducts from "./products";
import populateItems from "./items";

config()

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")      // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)     // Your project ID
  .setKey(process.env.APPWRITE_KEY!);               // Your secret API key

const databases = new Databases(client);

(async () => {
  await populateProducts(databases)
  await populateItems(databases)
  await populateLists(databases)
})()