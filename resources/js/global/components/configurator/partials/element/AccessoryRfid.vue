<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>RFID</h3>
        Benötigen Sie RFID-Schlüssel? <a href="" @click.prevent="toggleLightbox($event)" data-target="rfid" class="btn-info"></a>
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'accessory_rfid'"
          :data-prop="'accessory_rfid'"
          :data-opts="1"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'accessory_rfid'"
          :data-prop="'accessory_rfid'"
          :data-opts="0"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element is-option grid-cols-12:sm is-hidden" data-options="accessory_rfid">
      <div class="span-8">
        <h3>Anzahl?</h3>
      </div>
      <div class="span-4 align-center justify-end:sm">
        <div class="form-input counter">
          <a
            href
            :data-prop="'accessory_rfid'"
            :data-has-price="true"
            @click.prevent="decrementUnit($event, 'accessory_rfid')"
            class="btn-decrement"
          ></a>
          <div class="count">{{quantities}}</div>
          <a
            href
            :data-prop="'accessory_rfid'"
            :data-has-price="true"
            @click.prevent="incrementUnit($event, 'accessory_rfid')"
            class="btn-increment"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    quantities: Number
  },

  methods: {
    setProperty($event) {
      this.$parent.setProperty($event);
    },
    decrementUnit($event, type) {
      this.$parent.decrementUnit($event, type);
    },
    incrementUnit($event, type) {
      this.$parent.incrementUnit($event, type);
    },
    setChildOption($event, type) {
      this.$parent.setChildOption($event, type);
    },
    toggleLightbox($event) {
      this.$parent.toggleLightbox($event);
    }
  },
}
</script>
