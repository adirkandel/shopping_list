import { Model, ModelToType, Redefine } from "../core/types";

export const ProductCategories = {
  Dairy: 'Dairy',
  FruitsAndVegetables: 'FruitsAndVegetables',
  Bakery: 'Bakery',
  MeatAndPoultry: 'MeatAndPoultry',
  Snacks: 'Snacks',
} as const

export const ProductModel = {
  name: { type: String },
  image: { type: String, isOptional: true },
  categoryId: { type: String },
} as const

export type Product = Redefine<ModelToType<typeof ProductModel>, {categoryId: keyof typeof ProductCategories}>