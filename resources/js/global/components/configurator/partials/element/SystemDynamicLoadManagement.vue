<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Dynamisches Lastmanagement</h3>
      Ist die zur Verfügung stehende Leistung knapp: Die Ladeleistung dem Verbrauch der Gesamtanlage dynamisch anpassen.
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'dyn_load_mgmt'"
        :data-prop="'dyn_load_mgmt'"
        @click.prevent="setPrice($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'dyn_load_mgmt'"
        :data-prop="'dyn_load_mgmt'"
        @click.prevent="setPrice($event)"
      >Nein</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setPrice($event) {
      this.$parent.setPrice($event);
    },
  },
}
</script>

