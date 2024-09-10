<template>
<section class="configurator-app">
  <div>
    <page-intro :title="'Ihre Ladestation'"></page-intro>
    <article class="products" :data-grid="visibleProducts.length">
      <product
        :index="index"
        :product="product"
        :selection="selection"
        :id="product.id"
        :prices="prices"
        :quantities="quantities"
        :isMatch="product.match == 1 ? true : false"
        v-for="(product, index) in visibleProducts" :key="index"
      >
      </product>
    </article>
    <configurator-footer :btnQuote="true" :btnBack="true"></configurator-footer>
  </div>
</section>
</template>
<script>
import descriptions from "@/global/config/properties/descriptions.js";
import helpers from "@/global/mixins/helpers";
import functions from "@/global/mixins/functions";
import store from '@/global/store';

import PageIntro from "@/global/components/layout/PageIntro.vue";
import ConfiguratorFooter from "@/global/components/configurator/ConfiguratorFooter.vue";
import Product from "@/global/components/configurator/Product.vue";

export default {
  components: {
    PageIntro,
    ConfiguratorFooter,
    Product,
  },

  mixins: [helpers, functions],

  data() {
    return {
      // user selection
      selection: [],

      // quantities
      quantities: {},

      // prices
      prices: {},

      // products
      products: {},

      // vuex store
      store: store
    };
  },

  created() {
    this.selection    = this.store.state.selection;
    this.quantities   = this.store.state.quantities;
    this.prices       = this.store.state.prices;
    this.products     = this.store.state.products;
  },

  mounted() {},

  methods: {

  },

  computed: {
    visibleProducts() {
      return this.products.filter(p => p.isVisible);
    },
  }
};
</script>
