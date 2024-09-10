<template>
<div class="product">
  <header class="product-header">
    <h2>{{product.name}}</h2>
    {{product.byline}}
    <icon-check v-if="isMatch"></icon-check>
    <icon-cross v-if="!isMatch"></icon-cross>
  </header>
  <div class="product-images">
    <carousel :perPage="1" :autoplay="true" :autoplayTimeout="getDelay(index)" :paginationActiveColor="'#FAB900'" :paginationColor="'#C4C4C4'" :paginationSize="10" :paginationPadding="6">
      <slide v-for="(image, index) in product.images" :key="index">
        <figure class="product-image">
          <img :src="'/assets/img/products/' + image" height="703" width="523">
        </figure>
      </slide>
    </carousel>
  </div>
  <product-description
    :descriptionFull="product.descriptionFull">
  </product-description>
  <div class="product-summary-header">
    <div class="grid-cols-12">
      <div class="span-6">
        <h2>{{product.name}}</h2>
        {{product.byline}}
      </div>
      <div class="span-6 justify-end">
        <div class="product__total">
          {{priceFormat(prices[id].totalOptions + (prices[id].basic * quantities.product))}}
        </div>
      </div>
    </div>
  </div>
  <product-summary :id="product.id" :product="product" :prices="prices" :quantities="quantities"></product-summary>
  <div class="product-attributes" v-show="selected.length">
    <div
      v-for="(s, index) in selected"
      :key="index"
      :class="propExists(s.prop, product.props) == false ? 'not-available' : 'is-selected'"
    >{{descriptions[s.prop]}}</div>
  </div>
</div>
</template>
<script>
import helpers from "@/global/mixins/helpers";
import functions from "@/global/mixins/functions";
import descriptions from "@/global/config/properties/descriptions.js";
import css from "@/global/config/css/classes.js";

import IconCheck from "@/global/components/configurator/icons/Check.vue";
import IconCross from "@/global/components/configurator/icons/Cross.vue";
import ProductSummary from "@/global/components/configurator/ProductSummary.vue";
import ProductAttributes from "@/global/components/configurator/ProductAttributes.vue";
import ProductDescription from "@/global/components/configurator/ProductDescription.vue";

import { Carousel, Slide } from 'vue-carousel';

export default {

  components: {
    IconCheck,
    IconCross,
    ProductSummary,
    ProductAttributes,
    ProductDescription,
    Carousel,
    Slide
  },

  mixins: [helpers, functions],

  props: {
    id: Number,
    index: Number,
    product: Object,
    prices: Object,
    quantities: Object,
    selection: Object,
    isMatch: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      classes: css,
      descriptions: descriptions,
    };
  },

  mounted() {
    console.log(this.$props.selection);
  },

  methods: {
    getDelay(index) {
      let delay = 2000, idx = index + 1;
      let timeout = parseInt(delay + (idx * 200));
      return parseInt(timeout);
    }
  },

  computed: {
    selected() {
      return this.$props.selection.props.filter(s => s.value != "0");
    },
  }
};
</script>
<style>
.VueCarousel {
  margin-bottom: 20px;
  margin-top: 20px;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
</style>
