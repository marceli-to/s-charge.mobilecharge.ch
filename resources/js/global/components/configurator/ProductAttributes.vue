<template>
  <div class="product-attributes" v-show="hasSelection">
    <div
      v-for="(prop, index) in product.props"
      :key="index"
      :class="prop == -1 ? 'not-available' : ''"
      :data-prop="index"
      style="display:none"
    ></div>
  </div>
</template>
<script>

import helpers from "@/global/mixins/helpers";
import descriptions from "@/global/config/properties/descriptions.js";

export default {
  mixins: [helpers],
  props: {
    product: Object,
    hasSelection: Boolean,
  },
}
</script>

