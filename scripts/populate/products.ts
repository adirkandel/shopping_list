// Insert dummy/initial data to the database
import { CollectionsList } from "../../functions/core/collections";
import { Databases, ID, Models } from "node-appwrite";
import { Product, ProductCategories } from "../../functions/product/types";

const products: Product[] = [
  {
    name: 'תפוח',
    image: undefined,
    categoryId: ProductCategories.FruitsAndVegetables
  },
  {
    name: 'עגבניה',
    image: undefined,
    categoryId: ProductCategories.FruitsAndVegetables
  },
  {
    name: 'מלפפון',
    image: undefined,
    categoryId: ProductCategories.FruitsAndVegetables
  },
  {
    name: 'חלב',
    image: undefined,
    categoryId: ProductCategories.Dairy
  },
  {
    name: 'קוטג׳',
    image: undefined,
    categoryId: ProductCategories.Dairy
  },
  {
    name: 'בשר טחון',
    image: undefined,
    categoryId: ProductCategories.MeatAndPoultry
  },
  {
    name: 'כבד',
    image: undefined,
    categoryId: ProductCategories.MeatAndPoultry
  },
  {
    name: 'פרגיות',
    image: undefined,
    categoryId: ProductCategories.MeatAndPoultry
  },
  {
    name: 'שווארמה',
    image: undefined,
    categoryId: ProductCategories.MeatAndPoultry
  },
  {
    name: 'חלה',
    image: undefined,
    categoryId: ProductCategories.Bakery
  },
  {
    name: 'פיתות',
    image: undefined,
    categoryId: ProductCategories.Bakery
  },
  {
    name: 'לחמניה שמיניה',
    image: undefined,
    categoryId: ProductCategories.Bakery
  },
  {
    name: 'במבה',
    image: undefined,
    categoryId: ProductCategories.Snacks
  },
  {
    name: 'ביסלי',
    image: undefined,
    categoryId: ProductCategories.Snacks
  },
  {
    name: 'עוגיות שוקו צ׳יפס',
    image: undefined,
    categoryId: ProductCategories.Snacks
  },
]

export default async (databases: Databases) => {
  const { PRODUCT_COLLECTION } = CollectionsList

  const promises: Promise<Models.Document>[] = []

  products.forEach((product) => {
    const promise = databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      PRODUCT_COLLECTION.id,
      ID.unique(),
      product
    )
    promises.push(promise)
  })

  try {
    await Promise.all(promises)
    console.log(`➡️ ${PRODUCT_COLLECTION.name} Collection: ${products.length} documents were created!`)
  } catch (e: any) {
    console.error(e.message)
  }
}