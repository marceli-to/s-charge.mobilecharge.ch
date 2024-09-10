import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'mcc',
  storage: window.localStorage
});

function initialState() {
  return {
    selection: {
      props: []
    },
    quantities: {
      product: 1,
      accessory_pedestal: 0,
      accessory_rfid: 0,
      accessory_cable: 0,
      cloud_private: 0,
      cloud_public: 0,
      cloud_data: 0,
      cloud_connect: 0,
      cloud_pay: 0,
      packages: 0,
    },
    prices: {
      1: {
        basic: 790,
        options: [],
        totalOptions: 0
      },
      2: {
        basic: 1650,
        options: [],
        totalOptions: 0
      },
      3: {
        basic: 1790,
        options: [],
        totalOptions: 0
      },
      4: {
        basic: 1320,
        options: [],
        totalOptions: 0
      },
      5: {
        basic: 1450,
        options: [],
        totalOptions: 0
      },
      6: {
        basic: 1950,
        options: [],
        totalOptions: 0
      },
      7: {
        basic: 1950,
        options: [],
        totalOptions: 0
      },
      8: {
        basic: 1750,
        options: [],
        totalOptions: 0
      },
      9: {
        basic: 1750,
        options: [],
        totalOptions: 0
      },
      10: {
        basic: 2290,
        options: [],
        totalOptions: 0
      },
      11: {
        basic: 2290,
        options: [],
        totalOptions: 0
      },
      12: {
        basic: 1950,
        options: [],
        totalOptions: 0
      },
      13: {
        basic: 1950,
        options: [],
        totalOptions: 0
      },
      14: {
        basic: 6450,
        options: [],
        totalOptions: 0
      },
      15: {
        basic: 1960,
        options: [],
        totalOptions: 0
      },
      16: {
        basic: 1990,
        options: [],
        totalOptions: 0
      },
      17: {
        basic: 1650,
        options: [],
        totalOptions: 0
      },
      18: {
        basic: 1710,
        options: [],
        totalOptions: 0
      },
      19: {
        basic: 6450,
        options: [],
        totalOptions: 0
      },
      20: {
        basic: 10100,
        options: [],
        totalOptions: 0
      },
      21: {
        basic: 9626,
        options: [],
        totalOptions: 0
      },
      22: {
        basic: 6860,
        options: [],
        totalOptions: 0
      },
      23: {
        basic: 7413,
        options: [],
        totalOptions: 0
      },
    },
    products: [],
    descriptions: {},
  };
}


export default new Vuex.Store({
  
  plugins: [vuexPersist.plugin],
  
  state: initialState,
 
  mutations: {
    selection(state, values) {
      state.selection = values;
    },
    
    quantities(state, values) {
      state.quantities = values;
    },
    
    prices(state, values) {
      state.prices = values;
    },

    products(state, values) {
      state.products = values;
    },

    descriptions(state, values) {
      state.descriptions = values;
    },

    reset(state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      });
    }
  }
});
