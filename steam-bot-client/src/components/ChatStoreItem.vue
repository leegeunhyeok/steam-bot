<template>
  <div class="itemArea">
    <img class="itemImage" :src="item.detail[item.id].data.header_image">
    <div class="itemAction">
      <button class="cart-button" @click="removeCart(item.id)" v-if="inCart(item.id)">카트에서 삭제</button>
      <button class="cart-button" @click="addCart(item)" v-else>카트에 담기</button>
      <a class="store-visit" :href="item.src" target="_blank">상점 페이지 방문</a>
    </div>
    <div class="itemPrice" v-for="(data, idx) of priceData(item)" :key="idx">
      <div v-if="data.free" class="free">무료</div>
      <div v-else-if="data.discount">
        <div class="discount">
          <div class="origin-price">{{ priceString(data.init_price) }}</div>
          <div>{{ priceString(data.final_price) }}</div>
        </div>
        <div class="discount-span">
          <div class="discount-percent">-{{ data.percent }}%</div>
        </div>
      </div>
      <div v-else>{{ priceString(data.init_price) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatStoreItem',
  props: ['item'],
  computed: {
    totalPrice () {
      const items = this.$store.state.cart
      let total = 0
      this.$store.state.itemList.forEach(k => {
        try {
          total += parseInt(items[k].detail[k].data.price_overview.final * 0.01)
        } catch (e) {
          // 
        }
      })
      return `₩ ${total.toLocaleString('en')}`
    }
  },
  methods: {
    inCart (id) {
      return this.$store.state.itemList.indexOf(id) !== -1
    },
    addCart (item) {
      if (this.$store.state.cart[item.id] && this.inCart(item.id)) {
        this.$emit('notify', '이미 카트에 존재합니다')
        return
      }
      this.$store.commit('ADD_CART', item)
      this.$emit('notify', `"${item.title}" 카트에 추가 됨`)
    },
    removeCart (id) {
      const title = this.$store.state.cart[id]['title']
      this.$store.commit('REMOVE_CART', id)
      this.$emit('notify', `"${title}" 카트에서 삭제 됨`)
    },
    priceData (item) {
      try {
        const isFree = item.detail[item.id].data.is_free

        if (isFree) {
          return [
            {
              free: true,
              init_price: 0,
              final_price: 0,
              discount: false,
              percent: 0
            }
          ]
        }
        const priceInfo = item.detail[item.id].data.price_overview
        const initPrice = parseInt(priceInfo.initial * 0.01)
        const finalPrice = parseInt(priceInfo.final * 0.01)
        const discountPercent = priceInfo.discount_percent

        return [
          {
            isfree: false,
            init_price: initPrice,
            final_price: finalPrice,
            discount: initPrice !== finalPrice,
            percent: discountPercent
          }
        ]
      } catch (e) {
        return [
          {
            isfree: false,
            init_price: undefined,
            final_price: undefined,
            discount: false,
            percent: undefined
          }
        ]
      }
    },
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

.itemArea {
  display: inline-block;
  width: 80%;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;

  .itemImage {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
  }

  .itemAction {
    background-color: #000;
    padding: 4px;
    margin-top: 10px;
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

  .itemPrice {
    margin-top: 10px;
    box-sizing: border-box;
    color: #c6d4df;
    float: right;
    text-align: right;
  }
}

.free {
  color: #888;
}

.origin-price {
  font-size: 0.9rem;
  color: #888;
  text-decoration: line-through;
}

.discount {
  margin-right: 5px;
  float: right;
}

.discount-span {
  margin-right: 5px;
  float: right;

  .discount-percent {
    font-size: 0.9rem;
    background-color: #4c6b22;
    color: #8bc53f;
    padding: 3px;
    box-sizing: border-box;
    margin-top: 8px;
    margin-right: 4px;
  }
}

</style>
