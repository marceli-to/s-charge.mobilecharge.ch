<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Statisches Lastmanagement</h3>
      Soll an der Ladestation die maximale Leistung eingestellt werden?
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'stat_load_mgmt'"
        :data-prop="'stat_load_mgmt'"
        @click.prevent="setProperty($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'stat_load_mgmt'"
        :data-prop="'stat_load_mgmt'"
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

