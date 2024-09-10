<template>
<div>
  <header class="product-summary-header">
    <a href="javascript:;" @click.prevent="toggleDetails()">
      <div class="grid-cols-12">
        <div class="span-6">
          <h2>{{product.name}}</h2>
          {{product.byline}}
        </div>
        <div class="span-6 justify-end">
          <div class="product__match align-center">
            <icon-check v-if="isMatch"></icon-check>
            <icon-cross v-if="!isMatch"></icon-cross>
          </div>
          <div class="product__total align-center">
            {{priceFormat(prices[id].totalOptions + (prices[id].basic * quantities.product))}}
          </div>
          <div class="align-center">
            <icon-chevron-down v-if="!showDetails"></icon-chevron-down>
            <icon-chevron-up v-if="showDetails"></icon-chevron-up>
          </div>
        </div>
      </div>
    </a>
  </header>
  <div v-show="showDetails">
    <product-summary :id="product.id" :product="product" :prices="prices" :quantities="quantities"></product-summary>
    <product-attributes :hasSelection="selection.props.length ? true : false" :product="product"></product-attributes>
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
import IconChevronDown from "@/global/components/configurator/icons/ChevronDown.vue";
import IconChevronUp from "@/global/components/configurator/icons/ChevronUp.vue";

import ProductSummary from "@/global/components/configurator/ProductSummary.vue";
import ProductAttributes from "@/global/components/configurator/ProductAttributes.vue";


export default {

  components: {
    IconCheck,
    IconCross,
    IconChevronDown,
    IconChevronUp,
    ProductSummary,
    ProductAttributes
  },

  mixins: [helpers, functions],

  props: {
    id: Number,
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
      showOptionDetails: false,
      showOptionSummary: true,
      showDetails: false,
    };
  },

  mounted() {
  },

  methods: {
    toggleOptions() {
      this.showOptionDetails = this.showOptionDetails ? false : true;
      this.showOptionSummary = this.showOptionSummary ? false : true;
    },

    toggleDetails() {
      this.showDetails = this.showDetails ? false : true;
      if (this.showDetails) {
        for (var s of this.$props.selection.props) {
          this.updateProductCard(s.prop, s.value);
        }
      }
    }
  }
};
</script>