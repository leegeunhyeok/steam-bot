import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {}
  },
  mutations: {
    ADD_CART (state, data) {
      state.cart[data.id] = data.item
    },
    REMOVE_CART (state, id) {
      if (state.cart[id] !== undefined) {
        state.cart[id] = undefined
      }
    },
    RESET_CART (state) {
      state.cart = []
    }
  },
  actions: {
    // ;
  }
})
