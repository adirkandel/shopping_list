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
                  <li :class="{'order-0': !item.isChecked, 'order-1': item.isChecked}"
                      class="shadow rounded-md overflow-hidden flex items-center h-[3.5rem]">
                    <button @click="store.toggleCheckItem(item.uuid)" class="h-full w-10 flex justify-center items-center text-white"
                            :class="{'bg-green-500': !item.isChecked, 'bg-sky-400': item.isChecked}">
                      <IconCheck v-if="!item.isChecked" />
                      <IconUncheck v-else />
                    </button>

                    <button class="h-full w-10 text-center bg-gray-100 text-gray-500 disabled:opacity-40"
                            :disabled="item.isChecked"
                            @click="store.archiveItem(item.uuid)">
                      <IconArchive class="mx-auto" />
                    </button>

                    <div class="flex items-center px-4 gap-x-3 bg-white text-sm font-medium text-gray-800 flex-1"
                         :class="{'opacity-40 pointer-events-none': item.isChecked}">
                      <img :src="`https://loremflickr.com/200/200/${item.name}`"
                           :alt="item.name"
                           class="w-10 h-10 rounded-md" />

                      <span class="ml-2 font-semibold text-gray-700">
                        {{ item.name }}
                      </span>

                      <Counter :model-value="item.quantity"
                               @update:model-value="(quantity) => changeQuantity(item.productId, quantity)"
                               class="mr-auto" />
                    </div>

                    <button class="h-full w-10 text-center bg-red-500 text-white disabled:opacity-40"
                            @click="store.removeItem(item.uuid)"
                            :disabled="item.isChecked">
                      <IconClose class="mx-auto" />
                    </button>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </div>
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
import IconCheck from "~icons/carbon/checkmark";
import IconUncheck from "~icons/carbon/redo";
import IconArchive from "~icons/fluent-mdl2/archive";
import IconArchiveUndo from "~icons/fluent-mdl2/archive-undo";
import IconClose from "~icons/carbon/close";
import IconChevronDown from "~icons/carbon/chevron-down";
import IconChevronUp from "~icons/carbon/chevron-up";
import { Category, Item, Product, useShoppingListStore } from "../stores/shopping-list";
import uniqBy from "lodash/uniqBy";
import Counter from "../core/components/Counter.vue";
import { computed, reactive, ref } from "vue";
import SelectBox from "../core/components/SelectBox.vue";

const store = useShoppingListStore();

const addItem = (product: Product) => {
  const data: Item = {
    productId: product.uuid,
    quantity: 1,
    isChecked: false
  };
  store.addItem(data);
};

const changeQuantity = store.changeQuantity;

const activeList = reactive(store.activeList);

const items = computed(() => {
  return activeList.items
    .filter(item => !item.isArchived)
    .map(item => ({
        ...item,
        ...store.products.find(product => product.uuid === item.productId)
      })
    );
});

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

const availableCategories = computed<Category[]>(() => {
  return uniqBy(items.value.map(item => ({ ...store.categories.find(category => category.uuid === item.categoryId)! })), "uuid");
});

const getItemsByCategory = (categoryId: Category["uuid"]) => {
  return items.value.filter(item => item.categoryId === categoryId);
};

const closedCategories: string[] = reactive([]);

const toggleCategory = (categoryId: string) => {
  const categoryIdx = closedCategories.findIndex(category => category === categoryId);
  if (categoryIdx >= 0) {
    closedCategories.splice(categoryIdx, 1);
  } else {
    closedCategories.push(categoryId);
  }
};
</script>

<style scoped>

</style>