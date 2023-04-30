import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router";
import clickOutside from "./core/directives/click-outside";

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.directive("click-outside", clickOutside)

app.mount('#app')
