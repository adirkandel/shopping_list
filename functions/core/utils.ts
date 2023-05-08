import { Handler } from "@netlify/functions";
import { HandlerFunction, HttpMethod } from "./types";

export const routeHandler: HandlerFunction = (actions) => {
  const handler: Handler = async ({ httpMethod, body, path }, context) => {
    try {
      let promise: Promise<any>
      switch (httpMethod as HttpMethod) {
        case 'GET': {
          promise = actions.getAll()
          break;
        }
        case 'POST': {
          if (body) {
            promise = actions.create(JSON.parse(body))
          } else {
            throw Error('No body')
          }
          break;
        }
        case 'PUT': {
          const docId = path.split(/.*list\/?/).pop()
          if (body && docId) {
            promise = actions.update(docId, JSON.parse(body))
          } else {
            throw Error('No body or docId')
          }
          break;
        }
        case 'DELETE': {
          const docId = path.split(/.*list\/?/).pop()
          if (docId) {
            promise = actions.delete(docId)
          } else {
            throw Error('No docId')
          }
          break;
        }
      }

      const res = await promise

      return {
        statusCode: 200,
        body: JSON.stringify({httpMethod, res})
      }
    } catch (e: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e.message })
      }
    }
  }
  return handler
}