// Insert dummy/initial data to the database

import { List } from "../../functions/list/types";
import { CollectionsList } from "../../functions/core/collections";
import { Databases, ID, Models } from "node-appwrite";
import { Redefine } from "../../functions/core/types";

const lists: Redefine<List, { items: string[] }>[] = [
  {
    name: 'רשימה ראשונה - בוצעה',
    isDone: true,
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
    items: []
  },
  {
    name: 'רשימה שניה',
    isDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: []
  }
]

export default async (databases: Databases) => {
  const { LIST_COLLECTION, ITEM_COLLECTION } = CollectionsList

  const promises: Promise<Models.Document>[] = []

  const items = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    ITEM_COLLECTION.id,
  )

  const itemsLists = [items.documents.slice(0, 14), items.documents.slice(15)]

  lists.forEach((list) => {
    const promise = databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      LIST_COLLECTION.id,
      ID.unique(),
      {
        ...list,
        items: JSON.stringify(itemsLists[0].map(item => item.$id))
      }
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