<template>
  <div id="app">
    <ChatHeader/>
    <ChatArea :data="message"/>
    <ChatInputArea @user-message="userMessage"/>
    <transition name="slide" mode="out-in">
      <ChatAlert :alertMessage="alertMessage" v-if="alert"/>
    </transition>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader.vue'
import ChatArea from './components/ChatArea.vue'
import ChatInputArea from './components/ChatInputArea.vue'
import ChatAlert from './components/ChatAlert.vue'

export default {
  name: 'app',
  data () {
    return {
      message: '',
      alertMessage: '',
      alert: false,
      alertTimeout: null
    }
  },
  components: {
    ChatHeader,
    ChatArea,
    ChatInputArea,
    ChatAlert
  },
  methods: {
    userMessage (message) {
      this.message = {type: 'user', message: message}
      this.$http.post('/query', {message: message}).then(r => {
        this.botMessage(r.data.response)
      }).catch(e => {
        this.openAlert('메시지 전송 중 문제가 발생했습니다.')
      })
    },
    botMessage (message) {
      this.message = {type: 'bot', message: message}
    },
    openAlert (message) {
      try {
        clearTimeout(this.alertTimeout)
      } catch (e) {}

      this.alertTimeout = setTimeout(() => {
        this.alert = false
      }, 2500)

      this.alertMessage = message
      this.alert = true
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
</style>
