import { defineStore } from 'pinia'
import { setupStore } from '@/stores/store'

export const useSocketStore = (app) => {
  return defineStore({
    id: 'socket',
    state: () => ({
      isConnected: false,
      message: '',
      reconnectError: false,
      heartBeatInterval: 50000,
      heartBeatTimer: 0
    }),
    actions: {
      SOCKET_ONOPEN(event) {
        console.log('successful websocket connection')
        app.config.globalProperties.$socket = event.currentTarget
        this.isConnected = true
        this.heartBeatTimer = window.setInterval(() => {
          const message = 'Heart Beat Message'
          this.isConnected &&
            app.config.globalProperties.$socket.sendObj({
              code: 200,
              heartbeat: true,
              msg: message
            })
        }, this.heartBeatInterval)
      },
      SOCKET_ONCLOSE(event) {
        this.isConnected = false
        window.clearInterval(this.heartBeatTimer)
        this.heartBeatTimer = 0
        console.log('Disconnected: ' + new Date())
        console.log(event)
      },
      SOCKET_ONERROR(event) {
        console.error(event)
      },
      SOCKET_ONMESSAGE(message) {
        this.message = message
      },
      SOCKET_RECONNECT(count) {
        console.info('Reconnecting ...', count)
      },
      SOCKET_RECONNECT_ERROR() {
        this.reconnectError = true
      }
    }
  })()
}

export function useSocketStoreWithOut(app) {
  setupStore(app)
  return useSocketStore(app)
}
