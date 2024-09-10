<template>
  <a href="javascript:;" @click="toggleSection($event)" :data-row-button="target" :class="[$props.disabled ? 'is-disabled' : '', 'btn-toggle']">
    <slot />
   {{title}}
  </a>
</template>

<script>
export default {

  props: {
    title: String,
    target: String,
    disabled: Boolean,
  },

  methods: {
    toggleSection($event) {
      this.$parent.toggleSection($event);
    },
  },
}
</script>
