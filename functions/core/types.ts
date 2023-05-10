import { Models } from "node-appwrite";
import { Handler } from "@netlify/functions";
import { RelationshipOnDeleteList, RelationshipTypesList } from "./consts";
import { CollectionsList } from "./collections";

export type DbActions<Data> = {
  getAll: () => Promise<Models.DocumentList<Data & Models.Document>>
  getOne: (docId: string) => Promise<Data & Models.Document>
  create: (data: Data) => Promise<Data & Models.Document>
  update: (docId: string, data: Data) => Promise<Data & Models.Document>
  delete: (docId: string) => Promise<string>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HandlerFunction = <Data>(actions: DbActions<Data>) => Handler

type RelationshipType = typeof RelationshipTypesList[keyof typeof RelationshipTypesList]

type RelationshipOnDelete = typeof RelationshipOnDeleteList[keyof typeof RelationshipOnDeleteList]

export type CollectionsNames = typeof CollectionsList[keyof typeof CollectionsList]['name']

export type Model = {
  [key: string]: {
    type: (value?: any) => any,
    isOptional?: boolean,
    size?: number
    relationship?: {
      relatedCollectionId: CollectionsNames
      type: RelationshipType,
      twoWay?: boolean
      key?: string
      twoWayKey?: string
      onDelete?: RelationshipOnDelete
    }
  }
}

export type ModelToType<M extends Model> = {
  [key in keyof M]: M[key]['isOptional'] extends true ? ReturnType<M[key]['type']> | undefined : ReturnType<M[key]['type']>
}

export type Redefine<T, K> = Omit<T, keyof K> & K;

export type CollectionsListType = {
  [key: string]: {
    id: string,
    name: string,
    model: Model
  }
}