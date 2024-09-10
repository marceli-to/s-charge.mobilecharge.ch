<template>
  <div class="product-summary">
    <div class="product-summary__item grid-cols-12">
      <div class="span-6 align-center">
        {{quantities.product}} x Basispreis
      </div>
      <div class="span-6 align-center justify-end">{{priceFormat(prices[id].basic * quantities.product)}}</div>
    </div>
    <div class="product-summary__item grid-cols-12" v-if="showOptionSummary == true && prices[id].totalOptions > 0 && prices[id].options.length > 1">
      <div class="span-6 align-center">Gewählte Optionen</div>
      <div class="span-6 align-center justify-end">{{priceFormat(prices[id].totalOptions)}}</div>
    </div>
    <div class="product-summary__option" v-if="(showOptionDetails == true && prices[id].totalOptions >= 0) || prices[id].options.length == 1">
      <h2>Gewählte Optionen</h2>
      <div v-for="(price, index) in prices[id].options" :key="index" class="grid-cols-12">
        <div v-if="price.isRatePerMonth" class="span-9">
          <div v-if="quantities[price.prop]">
            {{quantities[price.prop]}} x 
            <span v-if="price.unit">{{descriptions[price.unit]}} ({{priceFormat(price.value)}}/Monat)</span>
            <span v-else>{{descriptions[price.prop]}} ({{priceFormat(price.value)}}/Monat)</span>
          </div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        <div v-else-if="price.isRatePerYear" class="span-9">
          <div v-if="quantities[price.prop]">
            {{quantities[price.prop]}} x 
            <span v-if="price.unit">{{descriptions[price.unit]}} ({{priceFormat(price.value)}}/Jahr)</span>
            <span v-else>{{descriptions[price.prop]}} ({{priceFormat(price.value)}}/Jahr)</span>
          </div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        <div v-else class="span-9">
          <div v-if="quantities[price.prop]">{{quantities[price.prop]}} x <span v-if="price.unit">{{descriptions[price.unit]}}</span><span v-else>{{descriptions[price.prop]}}</span></div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        <div class="span-3 justify-end">
          <div v-if="price.isRatePerMonth">
            {{priceFormat(price.value * 12)}}
          </div>
          <div v-else-if="price.isRatePerMonth">
            {{priceFormat(price.value)}}
          </div>
          <div v-else>
            {{priceFormat(price.value)}}
          </div>
        </div>
      </div>
    </div>
    <div class="product-summary__total grid-cols-12">
      <div class="span-6">
        <a href="" @click.prevent="toggleOptions()" v-if="prices[id].totalOptions >= 0 && prices[id].options.length > 1">
          Optionen <span v-if="showOptionSummary">anzeigen</span><span v-else>verbergen</span>
        </a>
      </div>
      <div class="span-6 justify-end">
        Total:&nbsp;<strong>{{priceFormat(prices[id].totalOptions + (prices[id].basic * quantities.product))}}</strong>
      </div>
    </div>
  </div>
</template>
<script>

import helpers from "@/global/mixins/helpers";
import descriptions from "@/global/config/properties/descriptions.js";

export default {
  
  mixins: [helpers],

  props: {
    id: Number,
    product: Object,
    prices: Object,
    quantities: Object,
  },

  data() {
    return {
      descriptions: descriptions,
      showOptionDetails: false,
      showOptionSummary: true,
    };
  },

  methods: {
    toggleOptions() {
      this.showOptionDetails = this.showOptionDetails ? false : true;
      this.showOptionSummary = this.showOptionSummary ? false : true;
    },
  }


}
</script>

