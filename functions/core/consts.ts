import { CollectionsListType } from "./types";
import { ListModel } from "../list/types";
import { ProductModel } from "../product/types";

export const CollectionsList: CollectionsListType = {
  LIST_COLLECTION: {
    id: 'list-collection-id',
    name: 'list',
    model: ListModel
  },
  PRODUCT_COLLECTION: {
    id: 'product-collection-id',
    name: 'product',
    model: ProductModel
  },
} as const