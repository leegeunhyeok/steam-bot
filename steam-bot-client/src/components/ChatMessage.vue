<template>
  <div :class="messageTypeClass">
    <div class="text">{{ data.message }}</div>
    <div v-if="data.action === 'cart-list'">
      <ChatCartListItem @notify="notify" v-for="(cart, i) in $store.state.itemList" :key="i" :item="cart" :index="i"/>
      <div class="listArea">
        <div class="price">
          <div>합계: {{ totalPrice }}</div>
        </div>
      </div>
    </div>
    <ChatStoreItem v-if="isStoreSearch" @notify="notify" v-for="item in data.data" :key="item" :item="item"/>
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
    },
    /**
     * @description 카트에 담긴 상품 가격 총합
     */
    totalPrice () {
      let total = 0
      this.$store.state.itemList.forEach(i => {
        try {
          const info = this.$store.state.cart[i].detail[i].data
          if (!info.is_free) {
            total += parseInt(info.price_overview.final * 0.01)
          }
        } catch (e) {
          // ;
        }
      })
      return `₩ ${total.toLocaleString('en')}`
    }
  },
  mounted () {
    this.$emit('scrollDown')
  },
  methods: {
    /**
     * @description 부모 컴포넌트에게 notify 이벤트 발생
     * @param {string} message 알림 메시지
     */
    notify (message) {
      this.$emit('notify', message)
    }
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
