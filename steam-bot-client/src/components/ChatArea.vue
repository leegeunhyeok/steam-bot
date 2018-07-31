<template>
  <div id="chat-wrap">
    <!-- Chat content -->
  </div>
</template>

<script>
export default {
  name: 'ChatTypeArea',
  props: ['data'],
  watch: {
    data () {
      this.createMessage()
    }
  },
  methods: {
    /**
     * @description 새 메시지 Element를 생성 후 추가합니다.
     */
    createMessage () {
      const wrap = document.getElementById('chat-wrap')

      const messageWrap = document.createElement('div')
      messageWrap.classList.add('message')
      messageWrap.classList.add('hidden')

      const messageArea = document.createElement('div')
      messageArea.classList.add(this.data.type === 'bot' ? 'bot-message' : 'user-message')
      messageArea.textContent = this.data.message

      messageWrap.appendChild(messageArea)

      wrap.appendChild(messageWrap)

      const chat = document.getElementById('chat-wrap')
      chat.scrollTop = chat.scrollHeight
    }
  }
}
</script>

<style lang="scss">
@import '../common.scss';

@mixin message{
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
}

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

  & .message {
    height: 32px;
    margin-bottom: 10px;
    color: #000;
    text-shadow: 1px 1px 1px #fff;
    transition: opacity .3s;
    animation: fade .3s linear;

    & .bot-message {
      @include message;
      float: left;
      background-color: $secondary-color;
    }

    & .user-message {
      @include message;
      float: right;
      background-color: $primary-color;
    }
  }
}

</style>
