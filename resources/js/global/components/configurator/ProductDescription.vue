<template>
<div class="product-description">
  <div class="product-description__list">
    <h3>Produktinfo</h3>
    <ul>
      <li v-for="(d, index) in descriptionFull" :key="index">{{d}}</li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  props: {
    descriptionFull: Array,
  },
};
</script>