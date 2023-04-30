<template>
  <div class="relative z-10" v-click-outside.callback="closeBox">
    <div class="relative z-10 h-11 py-2 px-4 bg-gray-100 text-gray-500 flex items-center rounded-md duration-300">
      <input
        type="text"
        placeholder="חיפוש"
        :value="search"
        @focus="openBox"
        @input="(e) => onSearch(e.target.value)"
        class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
      />
      <IconSearch />
    </div>

    <div v-show="open" class="z-0 px-2 border box-content rounded shadow-md absolute bg-white w-full -top-2 left-1/2 -translate-x-1/2 text-gray-600">
      <ul class="flex flex-col divide-y max-h-48 overflow-y-auto mt-16 -mx-2">
        <template v-for="product in props.products">
          <li v-show="!search || product.name.toLowerCase().includes(search)" @click="clickProduct(product)" class="flex items-center cursor-pointer hover:bg-gray-100 gap-x-3 px-3 py-2">
            <img :src="`https://loremflickr.com/200/200/${product.name}`" :alt="product.name" class="w-6 h-6 rounded-md" />
            {{ product.name }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconSearch from '~icons/carbon/search'
import type { PropType } from 'vue'
import { Product } from "../../stores/shopping-list";
import { ref } from "vue";

const search = ref('')

const onSearch = (text: string) => {
  console.log("adir - text", text);
  search.value = text.toLowerCase()
}

const props = defineProps({
  products: { type: Object as PropType<Product[]>, required: true }
})

const emit = defineEmits<{
  (e: 'select', product: Product): void
}>()

const open = ref(false)

const openBox = () => open.value = true
const closeBox = () => open.value = false

const clickProduct = (product: Product) => {
  search.value = ''
  closeBox()
  emit('select', product)
}
</script>

<style scoped>

</style>