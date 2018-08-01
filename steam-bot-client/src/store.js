import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_CART (state, item) {
      state.cart.push(item)
    },
    REMOVE_CART (state, id) {
      const idx = state.cart.indexOf(id)
      if (idx !== -1) {
        state.cart.splice(idx, 1)
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
