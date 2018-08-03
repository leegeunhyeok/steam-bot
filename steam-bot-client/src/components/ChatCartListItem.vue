<template>
  <div class="listArea">
    <img :src="$store.state.cart[item].detail[item].data.header_image">
    <div class="title">{{ $store.state.cart[item].title }}</div>
    <div class="price">
      <div class="discount" v-if="discount">{{ priceString(price) }}</div>
      <div>{{ priceString(final) }}</div>
      <div class="remove" @click="remove">삭제</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatCartListItem',
  props: ['item'],
  computed: {
    /**
     * @description 할인된 가격인지 확인
     */
    discount () {
      return !this.isFree && this.price > this.final
    },
    /**
     * @description 무료 상품 여부
     */
    isFree () {
      try {
        return this.$store.state.cart[this.item].detail[this.item].data.is_free
      } catch (e) {
        return false
      }
    },
    /**
     * @description 정가
     */
    price () {
      try {
        const price = this.$store.state.cart[this.item].detail[this.item].data.price_overview.initial
        return parseInt(price * 0.01)
      } catch (e) {
        return undefined
      }
    },
    /**
     * @description 최종 가격 (원가에서 할인된 가격)
     */
    final () {
      if (this.isFree) {
        return '무료'
      }

      try {
        const final = this.$store.state.cart[this.item].detail[this.item].data.price_overview.final
        return parseInt(final * 0.01)
      } catch (e) {
        return undefined
      }
    }
  },
  methods: {
    /**
     * @description 해당 아이템 카트에서 삭제
     */
    remove () {
      this.$store.commit('REMOVE_CART', this.item)
    },
    /**
     * @description 가격 데이터를 문자열로 변환
     * @param {number} price 가격
     */
    priceString (price) {
      try {
        return `₩ ${price.toLocaleString('en')}`
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
@import '../common.scss';

.listArea {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  color: $background-text-color;

  img {
    width: 40%;
    float: left;
    margin-right: 10px;
  }

  .title {
    float: left;
    margin-top: 10px;
  }

  .price {
    float: right;
    text-align: right;

    .discount {
      font-size: 0.9rem;
      color: #888;
      text-decoration: line-through;
      margin: 0;
    }

    .remove {
      cursor: pointer;
      color: #888;
      font-size: 0.9rem;
      margin-top: 5px;
      text-decoration: underline;
    }

    .remove:hover {
      color: $primary-color;
    }
  }
}

</style>
