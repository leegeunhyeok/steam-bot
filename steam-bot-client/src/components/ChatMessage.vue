<template>
  <div :class="messageTypeClass">
    <div class="text">{{ data.message }}</div>
    <ChatCartListItem v-if="data.action === 'cart-list'" v-for="cart in $store.state.itemList" :key="cart" :item="cart"/>
    <ChatStoreItem v-if="isStoreSearch" v-for="item in data.data" :key="item" :item="item"/>
  </div>
</template>

<script>
import ChatStoreItem from './ChatStoreItem.vue'
import ChatCartListItem from './ChatCartListItem.vue'

export default {
  name: 'ChatMessage',
  props: ['data'],
  components: {
    ChatStoreItem,
    ChatCartListItem
  },
  computed: {
    /**
     * @description 메시지 타입에 맞는 클래스명 반환
     */
    messageTypeClass () {
      const type = this.data.type
      if (type === 'user') {
        return {
          'user-message': true
        }
      } else if (type === 'default') {
        return {
          'bot-message': true
        }
      } else if (type === 'store') {
        return {
          'store-message': true
        }
      } else if (type === 'cart') {
        return {
          'cart-message': true
        }
      }
    },
    /**
     * @description 상점 메시지 여부 확인
     */
    isStoreSearch () {
      if (this.data.data.length === 0) {
        this.$emit('message', '검색결과가 없어요.. 더 자세히 입력해주세요!')
        return
      }
      return this.data.type === 'store'
    }
  },
  mounted () {
    this.$emit('scrollDown')
  }
}
</script>

<style lang="scss">
@import '../common.scss';

@mixin message{
  max-width: 80%;
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
  word-wrap: break-word;
}

.bot-message {
  @include message;
  float: left;
  background-color: $secondary-color;
}

.user-message {
  @include message;
  float: right;
  background-color: $primary-color;
}

.store-message {
  text-shadow: none;

  .text {
    color: #fff;
  }
}

.cart-message {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  color: $background-text-color;
}

</style>
