<template>
  <li :class="{'order-0': !item.isChecked, 'order-1': item.isChecked}"
      class="shadow rounded-md overflow-hidden flex items-center h-[3.5rem]">
    <button @click="emit('toggleCheckItem', item.uuid)" class="h-full w-10 flex justify-center items-center text-white"
            :class="{'bg-green-500': !item.isChecked, 'bg-sky-400': item.isChecked}">
      <IconCheck v-if="!item.isChecked" />
      <IconUncheck v-else />
    </button>

    <button class="h-full w-10 text-center bg-gray-100 text-gray-500 disabled:opacity-40"
            :disabled="item.isChecked"
            @click="emit('archiveItem', item.uuid)">
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
               @update:model-value="(quantity) => emit('changeQuantity', item.productId, quantity)"
               class="mr-auto" />
    </div>

    <button class="h-full w-10 text-center bg-red-500 text-white disabled:opacity-40"
            @click="emit('removeItem', item.uuid)"
            :disabled="item.isChecked">
      <IconClose class="mx-auto" />
    </button>
  </li>
</template>

<script lang="ts" setup>
import IconCheck from "~icons/carbon/checkmark";
import IconUncheck from "~icons/carbon/redo";
import IconClose from "~icons/carbon/close";
import Counter from "../../core/components/Counter.vue";
import IconArchive from "~icons/fluent-mdl2/archive";
import { Item, Product } from "../../stores/shopping-list";

const { item } = defineProps<{
  item: Item & Product
}>()

const emit = defineEmits<{
  (e: 'toggleCheckItem', itemId: string): void
  (e: 'archiveItem', itemId: string): void
  (e: 'changeQuantity', itemId: string, quantity: number): void
  (e: 'removeItem', itemId: string): void
}>()
</script>

<style scoped>

</style>