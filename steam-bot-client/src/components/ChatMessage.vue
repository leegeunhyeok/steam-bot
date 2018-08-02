<template>
  <div :class="messageTypeClass">
    <div :class="[isStoreMessage ? 'store-message' : '']">
      {{ data.message }}
    </div>
    <div class="itemArea" v-if="isStoreMessage" v-for="item in data.data" :key="item">
      <img class="itemImage" :src="item.detail[item.id].data.header_image">
      <div class="itemAction">
        <button class="cart-button" @click="removeCart(item.id)" v-if="inCart(item.id)">카트에서 삭제</button>
        <button class="cart-button" @click="addCart(item)" v-else>카트에 담기</button>
        <a class="store-visit" :href="item.src" target="_blank">상점 페이지 방문</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTypeArea',
  props: ['data'],
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
      }
    },
    /**
     * @description 상점 메시지 여부 확인
     */
    isStoreMessage () {
      if (this.data.data.length === 0) {
        this.$emit('message', '검색결과가 없어요.. 더 자세히 입력해주세요!')
      }
      return this.data.type === 'store'
    }
  },
  mounted () {
    this.$emit('scrollDown')
  },
  methods: {
    inCart (id) {
      return this.$store.state.cart[id] !== undefined
    },
    addCart (item) {
      this.$store.commit('ADD_CART', {id: item.id, item: item})
      this.$emit('notify', `"${item.title}" 카트에 추가 됨`)
    },
    removeCart (id) {
      const title = this.$store.state.cart[id].title
      this.$store.commit('REMOVE_CART', id)
      this.$emit('notify', `"${title}" 카트에서 삭제 됨`)
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

    .itemAction {
      background-color: #000;
      padding: 4px;
      margin-top: 2px;
      display: inline-block;
      box-sizing: border-box;

      .cart-button {
        cursor: pointer;
        border-radius: 2px;
        padding: 2px 4px;
        text-decoration: none;
        outline: none;
        border: none;
        color: #d2e885;
        background: rgba(121,153,5,1);
        background: -webkit-linear-gradient(top, rgba(121,153,5,1) 5%, rgba(83,105,4,1) 95%);
        background: linear-gradient(to bottom, rgba(121,153,5,1) 5%, rgba(83,105,4,1) 95%);
      }

      .cart-button:hover {
        text-decoration: none;
        color: #fff;
        background: rgba(164,208,7,1);
        background: -webkit-linear-gradient( top, rgba(164,208,7,1) 5%, rgba(107,135,5,1) 95%);
        background: linear-gradient( to bottom, rgba(164,208,7,1) 5%, rgba(107,135,5,1) 95%);
      }

      .store-visit {
        cursor: pointer;
        color: #acb2b8;
        text-decoration: none;
        font-size: 1rem;
        margin: 0 5px;
      }

      .store-visit:hover {
        color: #fff;
      }
    }
  }
}

.user-message {
  @include message;
  float: right;
  background-color: $primary-color;
}

</style>
