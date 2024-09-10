<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>Abrechnungslösung Privat</h3>
        <br>Einem Mieter oder Mitarbeiter eine Ladestation zur Verfügung stellen und die Einnahmen erhalten (App-Lösung).
      </div>
      <div class="form-input radio span-4 justify-end:sm align-center">
        <button
          value="1"
          :data-button="'cloud_private'"
          :data-prop="'cloud_private'"
          :data-variations="variations"
          :data-opts="1"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'cloud_private'"
          :data-prop="'cloud_private'"
          :data-variations="variations"
          :data-opts="0"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm is-option is-hidden" data-options="cloud_private">
      <div class="span-8">
        <h3>Anzahl Ladepunkte?</h3>
      </div>
      <div class="form-input counter span-4 align-center justify-end:sm">
        <a
          href
          :data-prop="'cloud_private'"
          :data-has-price="true"
          @click.prevent="decrementUnit($event, 'cloud_private')"
          class="btn-decrement"
        ></a>
        <div class="count">{{quantities}}</div>
        <a
          href
          :data-prop="'cloud_private'"
          :data-has-price="true"
          @click.prevent="incrementUnit($event, 'cloud_private')"
          class="btn-increment"
        ></a>
      </div>
    </div> 
  </div> 
</template>
<script>
export default {

  props: {
    quantities: Number,
    variations: Boolean,
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
    }
  },
}
</script>
