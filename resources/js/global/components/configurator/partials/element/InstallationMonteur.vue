<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Installation und Inbetriebnahme durch e-Moblity Partner.</h3>
      1 x Durchbruch, 10 m Anschlussleitung, Verkabelung in der Hauptverteilung (Richtpreis). Kann nach örtlichen Gegebenheiten variieren. Abklärung mit lokalem Installateur notwendig.<br>
      Basispreis: 1000.00 + 500.00/Station
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'installation'"
        :data-prop="'installation'"
        @click.prevent="setPrice($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'installation'"
        :data-prop="'installation'"
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
