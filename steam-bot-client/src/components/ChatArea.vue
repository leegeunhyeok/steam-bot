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
    data (v) {
      if (v.type === 'default' || v.type === 'user') {
        this.createMessage()
      } else if (v.type === 'store') {
        this.createStoreMessage()
      }
    }
  },
  methods: {
    /**
     * @description 새 메시지 Element를 생성 후 추가합니다.
     */
    createMessage () {
      const wrap = document.getElementById('chat-wrap')

      const html = `
        <div class="${this.data.type === 'default' ? 'bot-message' : 'user-message'}">
          ${this.data.message}
        </div
      `
      const messageWrap = document.createElement('div')
      messageWrap.classList.add('message')
      messageWrap.innerHTML = html

      wrap.appendChild(messageWrap)

      this.scrollDown()
    },
    /**
     * @description 새 상점 메시지 Element를 생성 후 추가합니다.
     */
    createStoreMessage () {
      const wrap = document.getElementById('chat-wrap')

      let items = ''

      for (let item of this.data.data) {
        const detail = item.detail[item.id]
        items += `
          <div class="itemArea">
            <img class="itemImage" src="${detail.data.header_image}">
          </div>
        `
      }

      const html = `
        <div class="store-message">
          <div class="store-header-message">${this.data.message}</div>
          ${items}
        </div>`

      const message = document.createElement('div')
      message.classList.add('message')
      message.innerHTML = html

      wrap.appendChild(message)

      this.scrollDown()
    },
    /**
     * @description 가장 아래로 스크롤 내리기
     */
    scrollDown () {
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
  word-wrap: break-word;
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

  .message {
    margin-bottom: 10px;
    color: #000;
    text-shadow: 1px 1px 1px #fff;
    transition: opacity .3s;
    animation: fade .3s linear;

    .bot-message {
      @include message;
      float: left;
      background-color: $secondary-color;
    }

    .store-message {
      @include message;
      float: left;
      text-shadow: none;
      color: #fff;

      .store-header-message {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .itemArea {
        display: inline-block;
        width: 80%;
        margin-bottom: 15px;

        .itemImage {
          width: 100%;
          border-radius: 5px;
          box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
        }
      }
    }

    .user-message {
      @include message;
      float: right;
      background-color: $primary-color;
    }
  }

  .message::after {
    content: "";
    clear: both;
    display: table;
  }
}

</style>
