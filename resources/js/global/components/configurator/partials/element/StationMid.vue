<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>MID-Zähler</h3>
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'mid'"
        :data-prop="'mid'"
        :data-variations="true"
        @click.prevent="setProperty($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'mid'"
        :data-prop="'mid'"
        :data-variations="true"
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
