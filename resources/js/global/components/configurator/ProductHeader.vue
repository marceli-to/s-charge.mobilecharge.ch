<template>
  <div>
    <header>
      <h2>
        <em>{{productName}}</em>
        <br>
        <span>{{productByline}}</span>
      </h2>
      <div class="price-total">
        <strong>{{priceFormat(prices[id].totalOptions + (prices[id].basic * quantities.product))}}</strong>
      </div>
    </header>
  </div>
</template>
<script>
import helpers from "@/global/mixins/helpers";

export default {
  mixins: [helpers],

  props: {
    id: Number,
    productName: String,
    productByline: String,
    productArticle: String,
    prices: Object,
    quantities: Object
  }
};
</script>