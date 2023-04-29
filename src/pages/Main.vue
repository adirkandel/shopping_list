<template>
  <div class="2xl:w-1/3 md:w-2/5 mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">My Shopping List</h1>

    <div class="flex flex-col gap-6">
      <template v-for="category in store.categories" :key="category.uuid">
        <div class="flex flex-col">
          <div class="flex items-center justify-between border-b border-gray pb-3 mb-3">
            <h2 class="text-xl font-bold">{{ category.name }}</h2>
            <button type="submit" class="px-3 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 focus:outline-none">
              Add
            </button>
          </div>

          <ul class="flex flex-col gap-y-3">
            <template v-for="item in store.getItemsByCategory(category.uuid)" :key="item.uuid">
              <li class="bg-white shadow-md rounded-md p-4 flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white">
                <div class="flex items-center gap-x-3 w-full">
                  <img :src="`https://loremflickr.com/200/200/${item.name}`" :alt="item.name" class="w-10 h-10 rounded-md" />
                  <span class="ml-2 font-semibold text-gray-700"
                        :class="{ 'line-through': item.isChecked }">{{ item.name }}</span>
                  <span class="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-blue-500 text-white mr-auto">
                    {{ item.quantity }}
                  </span>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useShoppingListStore } from "../stores/shopping-list";

const store = useShoppingListStore();

const addItem = () => {
  // store.addItem(category.id)
}
</script>

<style scoped>

</style>