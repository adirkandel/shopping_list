<template>
  <div class="2xl:w-1/3 md:w-2/5 mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">{{ activeList.name || 'רשימת קניות' }}</h1>

      <button class="flex items-center gap-x-1 px-3 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 focus:outline-none">
        <IconAdd />
        הוסף פריט
      </button>
    </div>

    <div class="flex flex-col gap-6">
      <template v-for="category in availableCategories" :key="category.uuid">
        <div class="flex flex-col">
          <div class="flex items-center justify-between border-b border-gray pb-3 mb-3">
            <h2 class="text-xl font-bold">{{ category.name }}</h2>
            <button @click="toggleCategory(category.uuid)">
              <IconChevronDown v-if="closedCategories.includes(category.uuid)" />
              <IconChevronUp v-else />
            </button>
          </div>

          <ul class="flex flex-col gap-y-4" :class="{hidden: closedCategories.includes(category.uuid)}">
            <template v-for="item in getItemsByCategory(category.uuid)" :key="item.uuid">
              <li class="shadow rounded-md overflow-hidden flex items-center h-[3.5rem]">
                <button class="h-full w-10 text-center bg-green-500 text-white">
                  <IconCheck class="mx-auto" />
                </button>
                <div class="flex items-center px-4 gap-x-3 bg-white text-sm font-medium text-gray-800 flex-1">
                  <img :src="`https://loremflickr.com/200/200/${item.name}`" :alt="item.name" class="w-10 h-10 rounded-md" />
                  <span class="ml-2 font-semibold text-gray-700"
                        :class="{ 'line-through': item.isChecked }">{{ item.name }}</span>
                  <Counter v-model="item.quantity" class="mr-auto" />
                </div>
                <button class="h-full w-10 text-center bg-red-500 text-white">
                  <IconClose class="mx-auto" />
                </button>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconAdd from '~icons/carbon/add'
import IconCheck from '~icons/carbon/checkmark'
import IconClose from '~icons/carbon/close'
import IconChevronDown from '~icons/carbon/chevron-down'
import IconChevronUp from '~icons/carbon/chevron-up'
import { Category, useShoppingListStore } from "../stores/shopping-list";
import uniqBy from 'lodash/uniqBy';
import Counter from "../core/components/Counter.vue";
import { reactive } from "vue";

const store = useShoppingListStore();

const activeList = store.activeList

const items = reactive(activeList.items.map(item => ({
  ...item,
  ...store.products.find(product => product.uuid === item.productId)
})))

const availableCategories: Category[] = uniqBy(items.map(item => ({ ...store.categories.find(category => category.uuid === item.categoryId)!})), 'uuid');

const getItemsByCategory = (categoryId: Category['uuid']) => {
  return items.filter(item => item.categoryId === categoryId)
}

const closedCategories: string[] = reactive([])

const toggleCategory = (categoryId: string) => {
  const categoryIdx = closedCategories.findIndex(category => category === categoryId)
  if (categoryIdx >=0) {
    closedCategories.splice(categoryIdx, 1)
  } else {
    closedCategories.push(categoryId)
  }
}
</script>

<style scoped>

</style>