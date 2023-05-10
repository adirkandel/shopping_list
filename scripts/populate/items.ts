// Insert dummy/initial data to the database
import { CollectionsList } from "../../functions/core/collections";
import { Databases, ID, Models } from "node-appwrite";
import { Item } from "../../functions/item/types";
import { getRandomInt } from "../utils";

const items: Item[] = Array(30).fill(null).map(() => ({
  quantity: getRandomInt(10),
  isChecked: getRandomInt(1) === 1,
  isArchived: getRandomInt(1) === 1,
  product: ''
}))

export default async (databases: Databases) => {
  const { ITEM_COLLECTION, PRODUCT_COLLECTION } = CollectionsList

  const promises: Promise<Models.Document>[] = []

  const products = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    PRODUCT_COLLECTION.id,
  )

  items.forEach((item) => {
    const randomIdx = getRandomInt(products.total)
    const data = {
      ...item,
      product: products.documents[randomIdx].$id
    }
    const promise = databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      ITEM_COLLECTION.id,
      ID.unique(),
      data
    )
    promises.push(promise)
  })

  try {
    await Promise.all(promises)
    console.log(`➡️ ${ITEM_COLLECTION.name} Collection: ${items.length} documents were created!`)
  } catch (e: any) {
    console.error(e.message)
  }
}