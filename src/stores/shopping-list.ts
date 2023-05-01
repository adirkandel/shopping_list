import { defineStore } from 'pinia'

export interface Category {
  uuid: string;
  name: string;
}

export interface Product {
  uuid: string;
  name: string;
  image: string;
  categoryId: Category['uuid'];
}

export interface Item {
  productId: Product['uuid'];
  quantity: number;
  isChecked?: boolean;
  isArchived?: boolean;
}

interface List {
  items: Item[]
  name?: string
  doneAt?: Date
}

interface State {
  categories: Category[]
  products: Product[],
  activeList: List
  lists: List[]
}

const state: State = {
  categories: [
    { uuid: '1', name: 'Dairy' },
    { uuid: '2', name: 'Fruits and Vegetables' },
    { uuid: '3', name: 'Bakery' },
    { uuid: '4', name: 'Meat and Poultry' },
    { uuid: '5', name: 'Snacks' },
  ],
  products: [
    { uuid: '1', name: 'Milk', image: 'milk.jpg', categoryId: '1' },
    { uuid: '2', name: 'Cheese', image: 'cheese.jpg', categoryId: '1' },
    { uuid: '3', name: 'Yogurt', image: 'yogurt.jpg', categoryId: '1' },
    { uuid: '4', name: 'Apples', image: 'apples.jpg', categoryId: '2' },
    { uuid: '5', name: 'Bananas', image: 'bananas.jpg', categoryId: '2' },
    { uuid: '6', name: 'Tomatoes', image: 'tomatoes.jpg', categoryId: '2' },
    { uuid: '7', name: 'Bread', image: 'bread.jpg', categoryId: '3' },
    { uuid: '8', name: 'Baguette', image: 'baguette.jpg', categoryId: '3' },
    { uuid: '9', name: 'Croissant', image: 'croissant.jpg', categoryId: '3' },
    { uuid: '10', name: 'Chicken', image: 'chicken.jpg', categoryId: '4' },
    { uuid: '11', name: 'Beef', image: 'beef.jpg', categoryId: '4' },
    { uuid: '12', name: 'Fish', image: 'fish.jpg', categoryId: '4' },
    { uuid: '13', name: 'Doritos', image: 'Doritos.jpg', categoryId: '5' },
    { uuid: '14', name: 'Popcorn', image: 'popcorn.jpg', categoryId: '5' },
    { uuid: '15', name: 'Candy', image: 'candy.jpg', categoryId: '5' }
  ],
  activeList: {
    name: 'רשימה של אדיר',
    items: [
      { productId: '1', quantity: 1, isChecked: false },
      { productId: '2', quantity: 2, isChecked: false },
      { productId: '3', quantity: 3, isChecked: false },
      { productId: '4', quantity: 4, isChecked: false },
      { productId: '5', quantity: 5, isChecked: false },
      { productId: '6', quantity: 6, isChecked: false },
      { productId: '7', quantity: 7, isChecked: false },
      { productId: '8', quantity: 8, isChecked: false },
      { productId: '9', quantity: 9, isChecked: false },
      { productId: '10', quantity: 10, isChecked: false },
    ]
  },
  lists: [
    {
      items: [
        { productId: '1', quantity: 1, isChecked: false },
        { productId: '2', quantity: 2, isChecked: false },
        { productId: '3', quantity: 3, isChecked: false },
        { productId: '11', quantity: 4, isChecked: false },
        { productId: '5', quantity: 5, isChecked: false },
        { productId: '12', quantity: 6, isChecked: false },
        { productId: '9', quantity: 9, isChecked: false },
        { productId: '10', quantity: 10, isChecked: false },
      ],
      doneAt: new Date('2022-12-21')
    },
    {
      name: 'רשימה לשבועות',
      items: [
        { productId: '1', quantity: 1, isChecked: false },
        { productId: '2', quantity: 2, isChecked: false },
        { productId: '4', quantity: 3, isChecked: false },
        { productId: '8', quantity: 4, isChecked: false },
        { productId: '6', quantity: 6, isChecked: false },
        { productId: '9', quantity: 9, isChecked: false },
        { productId: '12', quantity: 10, isChecked: false },
      ],
      doneAt: new Date('2022-12-21')
    }
  ]
}

export const useShoppingListStore = defineStore('shopping-list', {
  state: (): State => {
    return {
      ...state
    }
  },
  actions: {
    addItem(newItem: Item) {
      const item = this.activeList.items.find(itm => itm.productId === newItem.productId)
      if (item) {
        this.changeQuantity(item.productId, item.quantity + 1)
      } else {
        this.activeList.items.push(newItem);
      }
    },
    removeItem(itemId: string) {
      const index = this.activeList.items.findIndex(item => item.productId === itemId);
      if (index >= 0) {
        this.activeList.items.splice(index, 1);
      }
    },
    toggleCheckItem(itemId: string) {
      const item = this.activeList.items.find(itm => itm.productId === itemId)
      if (item) {
        item.isChecked = !item.isChecked
      }
    },
    archiveItem(itemId: string) {
      const item = this.activeList.items.find(itm => itm.productId === itemId)
      if (item) {
        item.isArchived = true
      }
    },
    unarchiveItem(itemId: string) {
      const item = this.activeList.items.find(itm => itm.productId === itemId)
      if (item) {
        item.isArchived = false
      }
    },
    changeQuantity(productId: string, quantity: number) {
      const item = this.activeList.items.find(item => item.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    toggleChecked(item: Item) {
      item.isChecked = !item.isChecked;
      if (item.isChecked) {
        this.removeItem(item);
        this.activeList.items.push(item);
      }
    }
  },
})