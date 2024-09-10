<template>
  <div class="price-summary">
    <div class="price-summary__item">
      <div>{{quantities.product}} x Basispreis</div>
      <div>{{priceFormat(prices[id].basic * quantities.product)}}</div>
    </div>
    <div class="price-summary__item" v-if="showOptionSummary == true && prices[id].totalOptions > 0 && prices[id].options.length > 1">
      <div>Gewählte Optionen</div>
      <div>{{priceFormat(prices[id].totalOptions)}}</div>
    </div>
    <div class="price-summary__option" v-if="(showOptionDetails == true  && prices[id].totalOptions >= 0) || prices[id].options.length <= 1">
      <div v-for="(price, index) in prices[id].options" :key="index">
        
        <div v-if="price.isRatePerMonth">
          <div v-if="quantities[price.prop]">
            {{quantities[price.prop]}} x 
            <span v-if="price.unit">{{descriptions[price.unit]}} <em class="fs-xs">({{priceFormat(price.value)}}/Monat)</em></span>
            <span v-else>{{descriptions[price.prop]}} <em class="fs-xs">({{priceFormat(price.value)}}/Monat)</em></span>
          </div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        
        <div v-else-if="price.isRatePerYear">
          <div v-if="quantities[price.prop]">
            {{quantities[price.prop]}} x 
            <span v-if="price.unit">{{descriptions[price.unit]}} <em class="fs-xs">({{priceFormat(price.value)}}/Jahr)</em></span>
            <span v-else>{{descriptions[price.prop]}} <em class="fs-xs">({{priceFormat(price.value)}}/Jahr)</em></span>
          </div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        
        <div v-else>
          <div v-if="quantities[price.prop]">{{quantities[price.prop]}} x <span v-if="price.unit">{{descriptions[price.unit]}}</span><span v-else>{{descriptions[price.prop]}}</span></div>
          <div v-else>{{descriptions[price.prop]}}</div>
        </div>
        
        <div>
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
    <div class="price-summary__total">
      <div>
        <a href="" @click.prevent="toggleOptions()" v-if="prices[id].totalOptions >= 0 && prices[id].options.length > 1">
          Optionen <span v-if="showOptionSummary">anzeigen</span><span v-else>verbergen</span>
        </a>
      </div>
      <div>
        <div>Total</div>
        <div>{{priceFormat(prices[id].totalOptions + (prices[id].basic * quantities.product))}}</div>
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
    prices: Object,
    quantities: Object
  },

  data() {
    return {
      descriptions: descriptions,
      showOptionDetails: false,
      showOptionSummary: true,
    };
  },

  mounted() {
  },

  methods: {
    toggleOptions() {
      this.showOptionDetails = this.showOptionDetails ? false : true;
      this.showOptionSummary = this.showOptionSummary ? false : true;
    }
  }
};
</script>