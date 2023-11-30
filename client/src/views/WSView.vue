<template>
  <div class="mx-auto mt-8 max-w-2xl shadow-xl">
    <div
      class="flex h-11 w-full items-center justify-start space-x-1.5 rounded-t-lg bg-gray-200 px-3"
    >
      <span class="h-3 w-3 rounded-full bg-red-400"></span>
      <span class="h-3 w-3 rounded-full bg-yellow-400"></span>
      <span class="h-3 w-3 rounded-full bg-green-400"></span>
    </div>
    <div class="h-96 w-full rounded-b-lg border-t-0 bg-gray-100">
      <div class="flex h-full w-full flex-col">
        <div class="h-5 flex-1 overflow-auto p-5">
          <div v-for="item in history" :key="item">{{ item }}</div>
        </div>
        <div class="h-10 w-full flex-none rounded-b-lg bg-gray-200">
          <div class="flex h-full flex-row items-center justify-center gap-2 px-5">
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                :disabled="isConnectCheckboxDisabled"
                id="connectStatusCheck"
                v-model="isConnectCheck"
                type="checkbox"
                value=""
                class="peer sr-only"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
              ></div>
              <span class="ms-3 pr-5 text-sm font-medium text-gray-900 dark:text-gray-600">
                <div class="w-20" v-if="isConnectCheck">Connected</div>
                <div class="w-20" v-if="!isConnectCheck">Disonnected</div>
              </span>
            </label>
            <input
              :disabled="textInputDisabled"
              class="h-7 flex-1 rounded-lg disabled:bg-gray-300"
              v-model="message"
              placeholder=""
              @keyup.enter="sendData(message)"
            />
            <button
              @click="sendData(message)"
              class="h-7 w-16 rounded-lg bg-gray-100 hover:bg-white"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <main class="flex flex-col"></main>
</template>

<script setup>
import { ref, watch, toRef } from 'vue'
import { getCurrentInstance } from 'vue'
import { useSocketStore } from '@/stores/useSocketStore'

const message = ref('')
const history = ref([])
const isConnectCheck = ref(false)
const isConnectCheckboxDisabled = ref(false)
const textInputDisabled = ref(true)
watch(isConnectCheck, (state) => {
  ;(async () => {
    isConnectCheckboxDisabled.value = true

    try {
      if (state) {
        if (isConnectedRef.value) {
          console.log('Error: It is connected')
        } else {
          connect()
        }
      } else {
        if (isConnectedRef.value) {
          disconnect()
        } else {
          console.log('Error: It is disconnected')
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(error)
    } finally {
      isConnectCheckboxDisabled.value = false
    }
  })()
})

const app = getCurrentInstance()
const socketStore = useSocketStore(app)
const isConnectedRef = toRef(socketStore, 'isConnected')

watch(isConnectedRef, (state) => {
  console.log('isConnected:', state)
})

// Websocket
const { proxy } = getCurrentInstance()

const sendData = (msg) => {
  if (msg.trim() != '') {
    proxy.$socket.sendObj({ msg: msg })
  }
  message.value = ''
}

const connect = async () => {
  await proxy.$connect('ws://localhost:3000/')
  proxy.$socket.onmessage = (data) => {
    const dataJson = JSON.parse(data.data)
    if (!dataJson.heartbeat) {
      history.value.push(dataJson.msg)
    }
  }
  textInputDisabled.value = false
  return isConnectedRef
}

const disconnect = async () => {
  await proxy.$disconnect('ws://localhost:3000/')
  textInputDisabled.value = true

  // delete proxy.$socket.onmessage
  return isConnectedRef
}
</script>
