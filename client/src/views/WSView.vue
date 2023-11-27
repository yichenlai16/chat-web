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
            <input
              class="h-7 rounded-sm"
              v-model="message"
              placeholder="Text here"
              @keyup.enter="sendData(message)"
            />
            <button
              @click="sendData(message)"
              class="h-7 w-7 rounded-lg bg-gray-100 hover:bg-white"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main></main>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const history = ref([])
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
proxy.$socket.onmessage = (data) => {
  history.value.push(data.data)
}
const sendData = (msg) => {
  if (msg.trim() != '') {
    proxy.$socket.send(msg)
  }
  message.value = ''
}
</script>
