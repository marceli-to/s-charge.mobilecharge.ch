<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Solaranlage und Gebäudeautomation</h3>
      Soll die Ladestation mit einer Solaranlage oder einem anderen System vernetzt werden?
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'solar'"
        :data-prop="'solar'"
        @click.prevent="setProperty($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'solar'"
        :data-prop="'solar'"
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
