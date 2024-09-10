<template>
  <header class="commissioning-header">
    <h1>{{title}}</h1>
    <slot />
  </header>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>