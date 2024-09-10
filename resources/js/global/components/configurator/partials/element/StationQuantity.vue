<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Anzahl Ladestationen</h3>
      Wie viele Ladestationen möchten Sie einsetzen?
    </div>
    <div class="span-4 align-center justify-end:sm">
      <div class="form-input counter">
        <a href @click.prevent="decrement('product')" class="btn-decrement"></a>
        <div class="count">{{quantities}}</div>
        <a href @click.prevent="increment('product')" class="btn-increment"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    quantities: Number
  },

  methods: {
    decrement(type) {
      this.$parent.decrement(type);
    },
    increment(type) {
      this.$parent.increment(type);
    }
  },
}
</script>