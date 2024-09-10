<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8 align-center">
      <h3>Kommunikation</h3>
    </div>
    <div class="span-4 align-center justify-end:sm">
      <div class="form-input radio">
        <button
          value="1"
          :data-button="'communication'"
          :data-prop="'communication_ethernet'"
          :data-swap="['communication_gsm', 'communication_wifi']"
          :data-variations="true"
          @click.prevent="setProperty($event)"
        >Ethernet</button>
        <button
          value="1"
          :data-button="'communication'"
          :data-prop="'communication_gsm'"
          :data-swap="['communication_ethernet', 'communication_wifi']"
          :data-variations="true"
          @click.prevent="setProperty($event)"
        >GSM</button>
        <button
          value="1"
          :data-button="'communication'"
          :data-prop="'communication_wifi'"
          :data-swap="['communication_ethernet', 'communication_gsm']"
          :data-variations="true"
          @click.prevent="setProperty($event)"
        >WIFI</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setProperty($event) {
      this.$parent.setProperty($event);
    }
  },
}
</script>
