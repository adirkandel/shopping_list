<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="text-gray-100 h-[4.5rem] flex items-center border-b border-gray-200 shrink-0">
      <div class="2xl:w-1/3 md:w-5/12 mx-auto px-4">
        <SelectBox :products="store.products" @select="addItem" />
      </div>
    </div>

    <div class="overflow-y-auto">
      <div class="p-4 2xl:w-1/3 md:w-5/12 mx-auto">
        <h1 class="text-3xl font-bold mb-3">{{ activeList.name || "רשימת קניות" }}</h1>
        <List :list="store.activeList" />
      </div>
    </div>

    <div class="fixed left-6 bottom-6" v-click-outside.callback="() => showArchive = false">
      <button :disabled="archivedItems.length === 0" @click="showArchive = !showArchive"
              class="shadow disabled:opacity-50 rounded-full bg-gray-50 w-14 h-14">
        <span class="relative mx-auto inline-block align-middle">
          <IconArchive />
          <span v-show="archivedItems.length > 0"
                class="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full"></span>
        </span>
      </button>

      <div v-show="showArchive" class="bg-white rounded shadow absolute bottom-[4.5rem] left-0">
        <ul class="flex flex-col divide-y max-h-48 w-48 overflow-y-auto py-1">
          <li v-for="item in archivedItems" class="flex items-center gap-x-3 px-3 py-2">
            <img :src="`https://loremflickr.com/200/200/${item.name}`" :alt="item.name" class="w-6 h-6 rounded-md" />
            {{ item.name }}

            <button class="mr-auto rounded hover:bg-gray-100 p-2" @click="store.unarchiveItem(item.uuid)">
              <IconArchiveUndo class="h-4" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconArchive from "~icons/fluent-mdl2/archive";
import IconArchiveUndo from "~icons/fluent-mdl2/archive-undo";
import { Item, Product, useShoppingListStore } from "../stores/shopping-list";
import { computed, reactive, ref } from "vue";
import SelectBox from "../core/components/SelectBox.vue";
import List from "../components/list/List.vue";

const store = useShoppingListStore();

const addItem = (product: Product) => {
  const data: Item = {
    productId: product.uuid,
    quantity: 1,
    isChecked: false
  };
  store.addItem(data);
};

const activeList = reactive(store.activeList);

const showArchive = ref(false);

const archivedItems = computed(() => {
  const items = activeList.items
    .filter(item => item.isArchived)
    .map(item => ({
        ...item,
        ...store.products.find(product => product.uuid === item.productId)
      })
    );
  if (items.length === 0) {
    showArchive.value = false;
  }
  return items;
});
</script>

<style scoped>

</style>