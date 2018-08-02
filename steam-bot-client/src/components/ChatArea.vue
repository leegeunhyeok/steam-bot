<template>
  <div id="chat-wrap">
    <div class="message" v-for="(m, idx) in messages" :key="idx">
      <ChatMessage :data="m" @notify="notify" @message="createMessage" @scrollDown="scrollDown"></ChatMessage>
    </div>
    <transition name="fade" mode="out-in">
      <div class="message">
        <ChatWaiting v-if="wait"/>
      </div>
    </transition>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue'
import ChatWaiting from './ChatWaiting.vue'

export default {
  name: 'ChatInputArea',
  props: ['data', 'wait'],
  data () {
    return {
      messages: []
    }
  },
  components: {
    ChatMessage,
    ChatWaiting
  },
  watch: {
    data (v) {
      this.messages.push(v)
    }
  },
  mounted () {
    const start = [
      '안녕하세요, 스팀 상점 정보를 제공하는 챗봇이에요!',
      '상점을 검색하여 원하는 제품을 찾아볼 수 있어요~',
      '도움이 필요하면 언제든지 불러주세요!'
    ]

    for (let m of start) {
      this.messages.push({
        type: 'default',
        message: m,
        data: {},
        action: ''
      })
    }
  },
  methods: {
    /**
     * @description 채팅창 스크롤을 맨 아래로 내립니다.
     */
    scrollDown () {
      const chat = document.getElementById('chat-wrap')
      chat.scrollTop = chat.scrollHeight
    },
    /**
     * @description 알림 이벤트를 부모 컴포넌트에게 전달합니다.
     */
    notify (message) {
      this.$emit('notify', message)
    },
    createMessage (message) {
      this.$emit('message', message)
    }
  }
}
</script>

<style lang="scss">
@import '../common.scss';

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

#chat-wrap {
  box-sizing: border-box;
  background-color: $background-color-light;
  color: $background-text-color;
  padding: 10px 10px;
  padding-top: $header-height + 10px;
  padding-bottom: 40px;
  height: 100%;
  overflow-y: auto;

  .message {
    margin-bottom: 10px;
    color: #000;
    text-shadow: 1px 1px 1px #fff;
    transition: opacity .3s;
    animation: fade .3s linear;
  }

  .message::after {
    content: "";
    clear: both;
    display: table;
  }
}
</style>
