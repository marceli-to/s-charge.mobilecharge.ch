<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>Abrechnungslösung Öffentlich</h3>
        Einem Besucher oder Gast eine Ladestation zur Verfügung stellen und die Einnahmen erhalten. Direkt mit dem Smartphone freischalten und bezahlen.
      </div>
      <div class="form-input radio span-4 justify-end:sm align-center">
        <button
          value="1"
          :data-button="'cloud_public'"
          :data-prop="'cloud_public'"
          :data-variations="false"
          :data-opts="1"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'cloud_public'"
          :data-prop="'cloud_public'"
          :data-variations="false"
          :data-opts="0"
          :data-opts-default="'1'"
          @click.prevent="setProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element is-option grid-cols-12:sm is-hidden" data-options="cloud_public">
      <div class="span-8">
        <h3>Anzahl Ladepunkte?</h3>
      </div>
      <div class="form-input counter span-4 align-center justify-end:sm">
        <a
          href
          :data-prop="'cloud_public'"
          :data-has-price="true"
          @click.prevent="decrementUnit($event, 'cloud_public')"
          class="btn-decrement"
        ></a>
        <div class="count">{{quantities}}</div>
        <a
          href
          :data-prop="'cloud_public'"
          :data-has-price="true"
          @click.prevent="incrementUnit($event, 'cloud_public')"
          class="btn-increment"
        ></a>
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
    }
  },
}
</script>
