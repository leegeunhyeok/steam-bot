<template>
  <div id="app">
    <ChatHeader/>
    <ChatArea :data="message" @message="createMessage" @notify="openAlert"/>
    <ChatInputArea @user-message="userMessage"/>
    <transition name="slide" mode="out-in">
      <ChatAlert :alertMessage="alertMessage" v-if="alert"/>
    </transition>
    <transition name="fade" mode="out-in">
      <ChatModal @close="modal = false" v-if="modal"/>
    </transition>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader.vue'
import ChatArea from './components/ChatArea.vue'
import ChatInputArea from './components/ChatInputArea.vue'
import ChatAlert from './components/ChatAlert.vue'
import ChatModal from './components/ChatModal.vue'

export default {
  name: 'app',
  data () {
    return {
      message: '',
      alertMessage: '',
      alert: false,
      alertTimeout: null,
      modal: false
    }
  },
  components: {
    ChatHeader,
    ChatArea,
    ChatInputArea,
    ChatAlert,
    ChatModal
  },
  methods: {
    userMessage (message) {
      this.message = {type: 'user', message: message, data: {}}
      this.$http.post('/query', {message: message}).then(r => {
        /**
         * r = {
         *   action: {string},
         *   type: '{string}'
         *   message: '{string}',
         *   data: {any}
         * }
         */
        this.botMessage(r.data)
      }).catch(e => {
        this.openAlert('메시지 전송 중 문제가 발생했습니다.')
      })
    },
    botMessage (response) {
      this.message = response
      if (response.action === 'cart-clear') {
        this.$store.commit('RESET_CART')
        this.openAlert('카트가 초기화되었습니다.')
      } else if (response.action === 'help') {
        this.openModal()
      }
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

.slide-enter-active, .slide-leave-active {
  transition: .5s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100px);
}

.fade-enter-active, .fade-leave-active {
  transition: .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
