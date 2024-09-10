<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>
        Mit Kabel oder Steckdose?
        <a href="" @click.prevent="toggleLightbox($event)" data-target="plugs" class="btn-info"></a>
      </h3>
      Vorteil Kabel: Einfachere Handhabung.<br>Vorteil Steckdose: Es können auch Autos die nicht den Typ 2 Stecker haben das Auto aufladen
    </div>
    <div class="span-4 align-center justify-end:sm">
      <div class="form-input radio">
        <button
          value="1"
          :data-button="'charge'"
          :data-prop="'charge_cable'"
          :data-swap="'charge_plug'"
          :data-variations="true"
          @click.prevent="setProperty($event)"
        >Kabel</button>
        <button
          value="1"
          :data-button="'charge'"
          :data-prop="'charge_plug'"
          :data-swap="'charge_cable'"
          :data-variations="true"
          @click.prevent="setProperty($event)"
        >Steckdose</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleLightbox($event) {
      this.$parent.toggleLightbox($event);
    },
    setProperty($event) {
      this.$parent.setProperty($event);
    }
  },
}
</script>