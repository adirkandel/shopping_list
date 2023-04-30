<template>
  <div class="custom-number-input h-8 w-24 flex flex-col">
    <label v-if="props.label" for="custom-input-number" class="w-full text-gray-700 text-sm mb-1 font-semibold">
      {{ props.label }}
    </label>
    <div class="flex flex-row flex-1 w-full rounded-lg relative bg-transparent">
      <button @click="decrement"
              class="bg-gray-100 text-gray-600 hover:bg-gray-200 h-full w-12 rounded-r cursor-pointer outline-none">
        <span class="m-auto text-lg font-thin">−</span>
      </button>
      <input type="number"
             class="appearance-none text-center w-full bg-gray-100 text-md flex items-center text-gray-600 outline-none"
             name="custom-input-number" v-model.number="value" />
      <button @click="increment"
              class="bg-gray-100 text-gray-600 hover:bg-gray-200 h-full w-12 rounded-l cursor-pointer">
        <span class="m-auto text-lg font-thin">+</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: false },
  modelValue: { type: Number, required: true },
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

let value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const decrement = () => {
  value.value -= 1
}
const increment = () => {
  value.value += 1
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>