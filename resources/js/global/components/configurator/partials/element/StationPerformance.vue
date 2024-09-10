<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Leistung</h3>
    </div>
    <div class="span-4 align-center justify-end:sm">
      <div class="form-input radio">
        <button
          value="1"
          :data-button="'power'"
          :data-prop="'power_11'"
          :data-swap="'power_22'"
          :data-variations="variations"
          @click.prevent="setProperty($event)"
        ><em class="thinsp">11</em> kWh</button>
        <button
          value="1"
          :data-button="'power'"
          :data-prop="'power_22'"
          :data-swap="'power_11'"
          @click.prevent="setProperty($event)"
        >22 kWh</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    variations: Boolean,
  },

  methods: {
    setProperty($event) {
      this.$parent.setProperty($event);
    }
  },
}
</script>
