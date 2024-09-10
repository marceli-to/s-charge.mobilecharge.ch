<template>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8 align-center">
      <h3>Aufbauart</h3>
    </div>
    <div class="span-4 align-center justify-end:sm">
      <div class="form-input radio">
        <button
          value="1"
          :data-button="'setup'"
          :data-prop="'setup_pillar'"
          :data-swap="'setup_wall'"
          @click.prevent="setProperty($event)"
        >Stehsäule</button>
        <button
          value="1"
          :data-button="'setup'"
          :data-prop="'setup_wall'"
          :data-swap="'setup_pillar'"
          @click.prevent="setProperty($event)"
        >Wandsäule</button>
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