import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {},
    itemList: []
  },
  mutations: {
    ADD_CART (state, data) {
      if (state.cart[data.id] === undefined) {
        state.cart[data.id] = data.item
      }
      
      if (state.itemList.indexOf(data.id) === -1) {
        state.itemList.push(data.id)
      }
    },
    REMOVE_CART (state, id) {
      const idx = state.itemList.indexOf(id)
      if (state.cart[id] !== undefined) {
        state.cart[id] = undefined
      }

      if (idx !== -1) {
        state.itemList.splice(idx, 1)
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
