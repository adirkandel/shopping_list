
import { Databases, Models } from "node-appwrite";
import { Model } from "../functions/core/types";

export const createCollectionsAndAttributes = async (databases: Databases, collectionId: string, collectionName: string, model: Model) => {
  try {
    let collection: Models.Collection
    try {
      collection = await databases.createCollection(
        process.env.APPWRITE_DATABASE_ID!,
        collectionId,
        collectionName
      );
      console.log(`Collection name: ${collection.name} was created successfully`)
    } catch {
      console.log(`Collection name: ${collectionName} already exists`)
      return
    }

    const promises: Promise<Models.AttributeDatetime | Models.AttributeString | Models.AttributeBoolean>[] = []

    Object.entries(model).forEach(([attrName, attrOpts]) => {
      if (attrOpts.type === Date) {
        promises.push(databases.createDatetimeAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collection.$id,
          attrName,
          'required' in attrOpts ? !!attrOpts.required : true,
        ))
      }
      if (attrOpts.type === String) {
        promises.push(databases.createStringAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collection.$id,
          attrName,
          120,
          'required' in attrOpts ? !!attrOpts.required : true,
        ))
      }
      if (attrOpts.type === Boolean) {
        promises.push(databases.createBooleanAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collection.$id,
          attrName,
          'required' in attrOpts ? !!attrOpts.required : true,
        ))
      }
    })

    await Promise.all(promises)

    console.log(`Collection name: ${collection.name} was updated successfully`)
  } catch (e: any) {
    console.error(e.message)
  }
}