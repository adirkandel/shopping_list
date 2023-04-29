import { defineStore } from 'pinia'

interface Category {
  uuid: string;
  name: string;
}

interface Item {
  uuid: string;
  name: string;
  quantity: number;
  image: string;
  categoryId: Category['uuid'];
  isChecked: boolean;
}

interface State {
  categories: Category[]
  items: Item[]
}

const state: State = {
  categories: [
    { uuid: '1', name: 'Dairy' },
    { uuid: '2', name: 'Fruits and Vegetables' },
    { uuid: '3', name: 'Bakery' },
    { uuid: '4', name: 'Meat and Poultry' },
    { uuid: '5', name: 'Snacks' },
  ],
  items: [
    { uuid: '1', name: 'Milk', quantity: 1, image: 'milk.jpg', categoryId: '1', isChecked: false },
    { uuid: '2', name: 'Cheese', quantity: 2, image: 'cheese.jpg', categoryId: '1', isChecked: false },
    { uuid: '3', name: 'Yogurt', quantity: 3, image: 'yogurt.jpg', categoryId: '1', isChecked: false },
    { uuid: '4', name: 'Apples', quantity: 4, image: 'apples.jpg', categoryId: '2', isChecked: false },
    { uuid: '5', name: 'Bananas', quantity: 5, image: 'bananas.jpg', categoryId: '2', isChecked: false },
    { uuid: '6', name: 'Tomatoes', quantity: 6, image: 'tomatoes.jpg', categoryId: '2', isChecked: false },
    { uuid: '7', name: 'Bread', quantity: 7, image: 'bread.jpg', categoryId: '3', isChecked: false },
    { uuid: '8', name: 'Baguette', quantity: 8, image: 'baguette.jpg', categoryId: '3', isChecked: false },
    { uuid: '9', name: 'Croissant', quantity: 9, image: 'croissant.jpg', categoryId: '3', isChecked: false },
    { uuid: '10', name: 'Chicken', quantity: 10, image: 'chicken.jpg', categoryId: '4', isChecked: false },
    { uuid: '11', name: 'Beef', quantity: 11, image: 'beef.jpg', categoryId: '4', isChecked: false },
    { uuid: '12', name: 'Fish', quantity: 12, image: 'fish.jpg', categoryId: '4', isChecked: false },
    { uuid: '13', name: 'Doritos', quantity: 13, image: 'Doritos.jpg', categoryId: '5', isChecked: false },
    { uuid: '14', name: 'Popcorn', quantity: 14, image: 'popcorn.jpg', categoryId: '5', isChecked: false },
    { uuid: '15', name: 'Candy', quantity: 15, image: 'candy.jpg', categoryId: '5', isChecked: false }
  ]
}

export const useShoppingListStore = defineStore('shopping-list', {
  state: (): State => {
    return {
      ...state
    }
  },
  actions: {
    getItemsByCategory(categoryId: Category['uuid']) {
      return this.items.filter(item => item.categoryId === categoryId)
    },
    addItem(item: Item) {
      this.items.push(item);
    },
    removeItem(item: Item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    toggleChecked(item: Item) {
      item.isChecked = !item.isChecked;
      if (item.isChecked) {
        this.removeItem(item);
        this.items.push(item);
      }
    }
  },
})