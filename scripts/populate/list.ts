// Insert dummy/initial data to the database

import { List } from "../../functions/list/types";
import { CollectionsList } from "../../functions/core/consts";
import { Databases, ID, Models } from "node-appwrite";

const lists: List[] = [
  {
    name: 'רשימה ראשונה - בוצעה',
    isDone: true,
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
  },
  {
    name: 'רשימה שניה',
    isDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export default async (databases: Databases) => {
  const { LIST_COLLECTION } = CollectionsList

  const promises: Promise<Models.Document>[] = []

  lists.forEach((list) => {
    const promise = databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      LIST_COLLECTION.id,
      ID.unique(),
      list
    )
    promises.push(promise)
  })

  try {
    await Promise.all(promises)
    console.log(`➡️ ${LIST_COLLECTION.name} Collection: ${lists.length} documents were created!`)
  } catch (e: any) {
    console.error(e.message)
  }
}