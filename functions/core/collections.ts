import { ListModel } from "../list/types";
import { ProductModel } from "../product/types";
import { ItemModel } from "../item/types";

export const CollectionsList = {
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
  ITEM_COLLECTION: {
    id: 'item-collection-id',
    name: 'item',
    model: ItemModel
  },
} as const