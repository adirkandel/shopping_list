import { ModelToType } from "../core/types";

export const ListModel = {
  name: { type: String },
  isDone: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date, isOptional: true },
  items: {
    // relationship: {
    //   relatedCollectionId: 'item',
    //   type: RelationshipTypesList.OneToMany,
    //   twoWay: true,
    //   key: "items",
    //   twoWayKey: "list",
    //   onDelete: RelationshipOnDeleteList.Cascade
    // },
    // type: Array<Item>
    type: Array
  }
} as const;

export type List = ModelToType<typeof ListModel>