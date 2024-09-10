<template>
  <a href="javascript:;" @click="toggleSection($event)" :data-row-button="target" class="btn-toggle">
    <slot />
   {{title}}
  </a>
</template>

<script>
export default {

  props: {
    title: String,
    target: String,
  },

  methods: {
    toggleSection($event) {
      this.$parent.toggleSection($event);
    },
  },
}
</script>
