import { ModelToType } from "../core/types";

export const ListModel = {
  name: { type: String },
  isDone: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date, required: false },
}

export type List = ModelToType<typeof ListModel>