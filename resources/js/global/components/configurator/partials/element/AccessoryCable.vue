<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>Ladekabel</h3>
        Benötigen Sie zusätzliche Ladekabel? <a href="" @click.prevent="toggleLightbox($event)" data-target="cable" class="btn-info"></a>
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'accessory_cable'"
          :data-prop="'accessory_cable'"
          :data-opts="1"
          :data-opts-default="'2'"
          :data-opts-child="1"
          @click.prevent="setProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'accessory_cable'"
          :data-prop="'accessory_cable'"
          :data-opts="0"
          :data-opts-default="'2'"
          :data-opts-child="1"
          @click.prevent="setProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm is-option is-hidden" data-options="accessory_cable">
      <div class="span-8">
        <h3>Anzahl?</h3>
      </div>
      <div class="form-input counter span-4 align-center justify-end:sm">
        <a
          href
          :data-prop="'accessory_cable'"
          :data-has-options="true"
          @click.prevent="decrementUnit($event, 'accessory_cable')"
          class="btn-decrement"
        ></a>
        <div class="count">{{quantities}}</div>
        <a
          href
          :data-prop="'accessory_cable'"
          :data-has-options="true"
          @click.prevent="incrementUnit($event, 'accessory_cable')"
          class="btn-increment"
        ></a>
      </div>
      <div class="span-12">
        <div class="option-element__child grid-cols-12:sm">
          <div class="span-6 align-center">
            <h3>Welcher Typ Kabel?</h3>
          </div>
          <div class="form-input select span-6 align-center justify-end:sm">
            <div class="select-wrapper">
              <select
                @change="setChildOption($event, 'accessory_cable')"
                :data-prop="'accessory_cable_option'"
              >
                <option
                  value="Länge 4.0 m, 20 Ampere, 230 V, Stecker Typ 2"
                  data-id="119076259"
                >Länge 4.0 m, 20 Ampere, 230 V, Stecker Typ 2</option>
                <option
                  value="Länge 4.0 m, 20 Ampere, 400 V, Stecker Typ 2"
                  data-id="119076269"
                >Länge 4.0 m, 20 Ampere, 400 V, Stecker Typ 2</option>
                <option
                  value="Länge 7.5 m, 20 Ampere, 230 V, Stecker Typ 2"
                  data-id="119076279"
                >Länge 7.5 m, 20 Ampere, 230 V, Stecker Typ 2</option>
                <option
                  value="Länge 7.5 m, 20 Ampere, 400 V, Stecker Typ 2"
                  data-id="119076289"
                >Länge 7.5 m, 20 Ampere, 400 V, Stecker Typ 2</option>
                <option
                  value="Länge 4.0 m, 32 Ampere, 230 V, Stecker Typ 2"
                  data-id="119076209"
                >Länge 4.0 m, 32 Ampere, 230 V, Stecker Typ 2</option>
                <option
                  value="Länge 4.0 m, 32 Ampere, 400 V, Stecker Typ 2"
                  data-id="119076219"
                >Länge 4.0 m, 32 Ampere, 400 V, Stecker Typ 2</option>
                <option
                  value="Länge 7.5 m, 20 Ampere, 230 V, Stecker Typ 2"
                  data-id="119076229"
                >Länge 7.5 m, 20 Ampere, 230 V, Stecker Typ 2</option>
                <option
                  value="Länge 7.5 m, 32 Ampere, 400 V, Stecker Typ 2"
                  data-id="119076239"
                >Länge 7.5 m, 32 Ampere, 400 V, Stecker Typ 2</option>
              </select>
            </div>
          </div>
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
