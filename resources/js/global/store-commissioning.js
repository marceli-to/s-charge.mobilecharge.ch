import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    i18n: false,
  },

  mutations: {
    
    i18n(state, payload) {
      state.i18n = payload;
    },

  },

});