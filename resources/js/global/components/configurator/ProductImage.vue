<template>
  <div>
    <figure class="product-image">
      <img :src="'/assets/img/' + image" height="703" width="523">
    </figure>
  </div>
</template>
<script>
export default {
  props: {
    image: String,
  },
};
</script>