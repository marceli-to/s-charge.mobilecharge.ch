<template>
<div>
  <div class="option-element grid-cols-12:sm">
    <div class="span-8">
      <h3>Kommunikation</h3>
    </div>
    <div class="form-input radio span-4 align-center justify-end:sm">
      <button
        value="1"
        :data-button="'communication'"
        :data-prop="'communication'"
        :data-opts="1"
        :data-opts-default="'Ethernet'"
        @click.prevent="setProperty($event)"
      >Ja</button>
      <button
        value="0"
        :data-button="'communication'"
        :data-prop="'communication'"
        :data-opts="0"
        :data-opts-default="false"
        @click.prevent="setProperty($event)"
      >Nein</button>
    </div>
  </div>
  <div class="option-element grid-cols-12:sm is-option is-hidden" data-options="communication">
    <div class="span-8 align-center">
      <h3>Anschluss über</h3>
    </div>
    <div class="form-input select span-4 align-center justify-end:sm">
      <div class="select-wrapper">
        <select @change="setOption($event, 'communication')" name="communication">
          <option value="Ethernet">Ethernet</option>
          <option value="WIFI">WIFI</option>
        </select>
      </div>
    </div>
  </div>  
</div>
</template>
<script>
export default {
  methods: {
    setProperty($event) {
      this.$parent.setProperty($event);
    },
    setOption($event, type) {
      this.$parent.setOption($event, type);
    }
  },
}
</script>
