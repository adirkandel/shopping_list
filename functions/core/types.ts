import { Models } from "node-appwrite";
import { Handler } from "@netlify/functions";

export type DbActions<Data> = {
  getAll: () => Promise<Models.DocumentList<Data & Models.Document>>
  getOne: (docId: string) => Promise<Data & Models.Document>
  create: (data: Data) => Promise<Data & Models.Document>
  update: (docId: string, data: Data) => Promise<Data & Models.Document>
  delete: (docId: string) => Promise<string>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HandlerFunction = <Data>(actions: DbActions<Data>) => Handler

export type Model = {
  [key: string]: {
    type: (value?: any) => any,
    required?: boolean
  }
}

export type ModelToType<M extends Model> = {
  [key in keyof M]: M[key]['required'] extends false ? ReturnType<M[key]['type']> | undefined : ReturnType<M[key]['type']>
}

export type CollectionsListType = {
  [key: string]: {
    id: string,
    name: string,
  }
}