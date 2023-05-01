<template>
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
          <ListItem v-for="item in getItemsByCategory(category.uuid)" :item="item" :key="item.uuid"
                    @toggleCheckItem="(itemId) => store.toggleCheckItem(itemId)"
                    @archiveItem="(itemId) => store.archiveItem(itemId)"
                    @changeQuantity="(itemId, quantity) => store.changeQuantity(itemId, quantity)"
                    @removeItem="(itemId) => store.removeItem(itemId)"
          />
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import IconChevronDown from "~icons/carbon/chevron-down";
import IconChevronUp from "~icons/carbon/chevron-up";
import { Category, List, useShoppingListStore } from "../../stores/shopping-list";
import { computed, reactive } from "vue";
import uniqBy from "lodash/uniqBy";
import ListItem from "./ListItem.vue";

const store = useShoppingListStore();

const changeQuantity = store.changeQuantity;

const { list } = defineProps<{
  list: List
}>();

const items = computed(() => {
  return list.items
    .filter(item => !item.isArchived)
    .map(item => ({
        ...item,
        ...store.products.find(product => product.uuid === item.productId)
      })
    );
});

const getItemsByCategory = (categoryId: Category["uuid"]) => {
  return items.value.filter(item => item.categoryId === categoryId);
};

const availableCategories = computed<Category[]>(() => {
  return uniqBy(items.value.map(item => ({ ...store.categories.find(category => category.uuid === item.categoryId)! })), "uuid");
});

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