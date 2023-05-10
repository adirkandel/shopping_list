import { ModelToType } from "../core/types";
import { RelationshipOnDeleteList, RelationshipTypesList } from "../core/consts";

export const ItemModel = {
  quantity: { type: Number },
  isChecked: { type: Boolean },
  isArchived: { type: Boolean },
  product: {
    // relationship: {
    //   relatedCollectionId: 'product',
    //   type: RelationshipTypesList.OneToOne,
    //   twoWay: false,
    //   key: 'product',
    //   onDelete: RelationshipOnDeleteList.Cascade
    // },
    // type: Object
    type: String
  }
} as const

export type Item = ModelToType<typeof ItemModel>