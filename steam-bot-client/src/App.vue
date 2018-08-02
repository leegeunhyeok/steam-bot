<template>
  <div id="app">
    <ChatHeader @drawerOpen="drawer = true"/>
    <ChatArea :data="message" :wait="wait" @message="createMessage" @notify="openAlert"/>
    <ChatInputArea @user-message="userMessage"/>
    <ChatAlert :alertMessage="alertMessage" v-if="alert"/>
    <ChatModal @close="modal = false" v-if="modal"/>
    <ChatDrawer @drawerClose="drawer = false" v-if="drawer"/>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader.vue'
import ChatArea from './components/ChatArea.vue'
import ChatInputArea from './components/ChatInputArea.vue'
import ChatAlert from './components/ChatAlert.vue'
import ChatModal from './components/ChatModal.vue'
import ChatDrawer from './components/ChatDrawer.vue'

export default {
  name: 'app',
  data () {
    return {
      message: '',
      alertMessage: '',
      alert: false,
      alertTimeout: null,
      modal: false,
      wait: false,
      drawer: false
    }
  },
  components: {
    ChatHeader,
    ChatArea,
    ChatInputArea,
    ChatAlert,
    ChatModal,
    ChatDrawer
  },
  methods: {
    userMessage (message) {
      this.wait = true
      this.message = {type: 'user', message: message, data: {}}
      this.$http.post('/query', {message: message}).then(r => {
        /**
         * r.data = {
         *   action: {string},
         *   type: '{string}'
         *   message: '{string}',
         *   data: {any}
         * }
         */
        this.botMessage(r.data)
      }).catch(e => {
        this.openAlert('메시지 전송 중 문제가 발생했습니다.')
      }).finally(() => {
        this.wait = false
      })
    },
    botMessage (response) {
      const $action = response.action
      if ($action === 'cart-clear') {
        this.$store.commit('RESET_CART')
        this.openAlert('카트가 초기화되었습니다.')
      } else if ($action === 'cart-list') {
        response.data = this.$store.state.cart
        response.type = 'store'
      } else if ($action === 'help') {
        this.openModal()
      }
      this.message = response
    },
    createMessage (message) {
      this.message = {
        type: 'default',
        message: message,
        action: '',
        data: {}
      }
    },
    openAlert (message) {
      if (this.alert) {
        this.alert = false
        try {
          clearTimeout(this.alertTimeout)
        } catch (e) {
          // ;
        }
        setTimeout(() => {
          this.alertMessage = message
          this.alert = true
        }, 500)

        this.alertTimeout = setTimeout(() => {
          this.alert = false
        }, 3000)
      } else {
        this.alertTimeout = setTimeout(() => {
          this.alert = false
        }, 2500)

        this.alertMessage = message
        this.alert = true
      }
    },
    openModal () {
      if (this.modal) {
        this.modal = false

        setTimeout(() => {
          this.modal = true
        }, 300)
      } else {
        this.modal = true
      }
    }
  }
}
</script>

<style lang="scss">

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

</style>
