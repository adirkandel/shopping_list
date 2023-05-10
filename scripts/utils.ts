import { Databases, Models } from "node-appwrite";
import { Model } from "../functions/core/types";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

type AttributesPromises = Models.AttributeDatetime | Models.AttributeString | Models.AttributeBoolean | Models.AttributeInteger

export const createCollections = async (databases: Databases, collectionId: string, collectionName: string, model: Model) => {
  try {
    let collection: Models.Collection;
    try {
      collection = await databases.createCollection(
        process.env.APPWRITE_DATABASE_ID!,
        collectionId,
        collectionName
      );
      console.log(`Collection name: ${collection.name} was created successfully`);
    } catch {
      console.log(`Collection name: ${collectionName} already exists`);
      return;
    }

    console.log(`Collection name: ${collection.name} was updated successfully`);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const createCollectionsAttributes = async (databases: Databases, collectionId: string, model: Model) => {
  const promises: Promise<void>[] = [];

  const subscribeToAttributeCreation = (attributeName: string, handler: Promise<AttributesPromises>) => {
    const promise: Promise<void> = new Promise(async () => {
      try {
        await handler
        console.log(`Attribute ${attributeName} was created successfully`)
      } catch (e: any) {
        console.trace(`Error :: Collection ${collectionId} :: Attribute ${attributeName} :: ${e.message}`)
      }
    })
    promises.push(promise)
  }

  Object.entries(model).forEach(([ attrName, options ]) => {
    const { type, isOptional, size, relationship } = options
    const isRequired = isOptional ? !isOptional : true;
    switch (type) {
      case Date: {
        subscribeToAttributeCreation(attrName, databases.createDatetimeAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collectionId,
          attrName,
          isRequired
        ));
        break;
      }
      case String: {
        subscribeToAttributeCreation(attrName, databases.createStringAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collectionId,
          attrName,
          size ?? 120,
          isRequired
        ));
        break;
      }
      case Number: {
        subscribeToAttributeCreation(attrName, databases.createIntegerAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collectionId,
          attrName,
          isRequired
        ));
        break;
      }
      case Boolean: {
        subscribeToAttributeCreation(attrName, databases.createBooleanAttribute(
          process.env.APPWRITE_DATABASE_ID!,
          collectionId,
          attrName,
          isRequired
        ));
        break;
      }
      case Array:
      case Object: {
        if (relationship) {
          const { relatedCollectionId, type, twoWay, key, twoWayKey, onDelete } = relationship;
          subscribeToAttributeCreation(attrName, databases.createRelationshipAttribute(
            process.env.APPWRITE_DATABASE_ID!,
            collectionId,
            relatedCollectionId,
            type,
            twoWay,
            key,
            twoWayKey,
            onDelete
          ));
        } else if (type === Array) {
          subscribeToAttributeCreation(attrName, databases.createStringAttribute(
            process.env.APPWRITE_DATABASE_ID!,
            collectionId,
            attrName,
            2000,
            isRequired
          ));
        }
        break;
      }
    }
  });

  await Promise.all(promises);
}