import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
