<template>
  <div class="flex flex-col gap-y-2 w-60 h-full bg-gray-900 p-2 overflow-y-auto text-white">
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 flex items-center">
        <span class="flex items-center p-1.5 rounded-md bg-blue-600 aspect-square">
          <IconShoppingBag />
        </span>
        <h1 class="font-bold text-gray-200 text-[15px] mr-3">רשימת קניות</h1>
<!--        <IconClose class="cursor-pointer mr-28 lg:hidden" onclick="openSidebar()"/>-->
      </div>
    </div>

    <div class="bg-gray-600 h-[1px]"></div>

    <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
      <IconSearch />
      <input
        type="text"
        placeholder="Search"
        class="text-[15px] mr-4 w-full bg-transparent focus:outline-none"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <router-link
        v-for="item in menuItems"
        :to="item.link"
        class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
      >
        <component :is="item.icon" />
        <span class="text-[15px] mr-4 text-gray-200 font-bold">{{ item.title }}</span>
      </router-link>
    </div>

    <div class="flex justify-between items-center w-full p-2 mt-auto">
      <div class="flex justify-center items-center gap-x-2">
        <div>
          <img class="w-8 h-8 rounded-full border border-gray-300" src="https://i.pravatar.cc/150" alt="avatar" />
        </div>
        <div class="flex justify-start flex-col items-start">
          <p class="cursor-pointer text-sm leading-5">Alexis Enache</p>
          <p class="cursor-pointer text-xs leading-3 text-gray-300">alexis81@gmail.com</p>
        </div>
      </div>
      <IconSettings />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import IconShoppingBag from '~icons/carbon/shopping-bag'
  import IconSearch from '~icons/carbon/search'
  import IconHome from '~icons/carbon/home'
  import IconCatalog from '~icons/carbon/catalog'
  import IconApple from '~icons/carbon/apple'
  import IconClose from '~icons/carbon/close'
  import IconSettings from '~icons/carbon/settings'

  const menuItems = [
    {
      icon: IconHome,
      title: 'ראשי',
      link: '/'
    },
    {
      icon: IconCatalog,
      title: 'רשימות',
      link: '/lists'
    },
    {
      icon: IconApple,
      title: 'מוצרים',
      link: '/products'
    }
  ]
</script>

<style scoped>
</style>