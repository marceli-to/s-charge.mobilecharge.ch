<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <strong>Installation mit Einzelzuleitung</strong><br>Soll die Ladestation mit Einzelzuleitung installiert werden?
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'installation_single_line'"
        :data-prop="'installation_single_line'"
        @click.prevent="setProperty($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'installation_single_line'"
        :data-prop="'installation_single_line'"
        @click.prevent="setProperty($event)"
      >Nein</button>
    </div>
  </div>  
</template>
<script>
export default {
  methods: {
    setProperty($event) {
      this.$parent.setProperty($event);
    },
  },
}
</script>