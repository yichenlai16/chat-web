// import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

import VueNativeSock from 'vue-native-websocket-vue3'
import { useSocketStoreWithOut } from './stores/useSocketStore'
const store = useSocketStoreWithOut(app)

app.use(VueNativeSock, import.meta.env.VITE_WS_URL, {
  store: store
})
