<template>
  <div class="chat-type-wrap">
    <input id="input" placeholder="메시지 입력.." @keydown.enter="send" v-model="message">
    <button id="send-button" @click="send">전송</button>
  </div>
</template>

<script>
export default {
  name: 'ChatInputArea',
  data () {
    return {
      message: '' // 입력 메시지
    }
  },
  methods: {
    /**
     * @description 현재 입력된 데이터를 부모 컴포넌트에게 전달
     */
    send () {
      const message = this.message.trim()
      this.message = ''
      if (message) {
        // 메시지가 비어있지 않으면 전달
        this.$emit('user-message', message)
      }
      // 포커스
      document.getElementById('input').focus()
    }
  }
}
</script>

<style lang="scss">
@import '../common.scss';

.chat-type-wrap {
  position: absolute;
  box-sizing: border-box;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  padding: 0 4px;
  background-color: $background-color-dark;

  & #input {
    margin-top: 5px;
    box-sizing: border-box;
    outline: none;
    border-radius: 4px;
    border: 2px solid #2a2d339f;
    background-color: rgb(97, 97, 97);
    color: #fff;
    padding: 5px 2px;
    width: calc(100% - 65px);
  }

  & #send-button {
    cursor: pointer;
    margin-top: 5px;
    width: 50px;
    outline: none;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    padding: 5px;
    background-color: $primary-color;
    color: #fff;
    float: right;
    transition: .2s;
  }

  & #send-button:hover {
    background-color: rgba(62, 126, 167, 0.4);
  }
}

::placeholder { /* 크롬, 파이어폭스, 오페라, 사파리 10.1+ */
  color: $background-text-color;
  opacity: 1; /* 파이어폭스 */
}

:-ms-input-placeholder { /* IE 10-11 */
  color: $background-text-color;
}

::-ms-input-placeholder { /* 엣지 */
  color: $background-text-color;
}
</style>
