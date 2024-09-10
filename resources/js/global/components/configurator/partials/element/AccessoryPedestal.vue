<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>Standfuss</h3>
        Brauchen Sie dazu einen Standfuss?
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'accessory_pedestal'"
          :data-prop="'accessory_pedestal'"
          :data-opts="1"
          :data-opts-default="'1'"
          :data-opts-child="1"
          @click.prevent="setProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'accessory_pedestal'"
          :data-prop="'accessory_pedestal'"
          :data-opts="0"
          :data-opts-default="'1'"
          :data-opts-child="1"
          @click.prevent="setProperty($event)"
        >Nein</button>
      </div>
    </div>

    <div class="option-element is-option grid-cols-12:sm is-hidden" data-options="accessory_pedestal">
      <div class="span-8">
        <h3>Anzahl?</h3>
      </div>
      <div class="form-input counter span-4 align-center justify-end:sm">
        <a
          href
          :data-prop="'accessory_pedestal'"
          :data-has-options="true"
          @click.prevent="decrementUnit($event, 'accessory_pedestal')"
          class="btn-decrement"
        ></a>
        <div class="count">{{quantities}}</div>
        <a
          href
          :data-prop="'accessory_pedestal'"
          :data-has-options="true"
          @click.prevent="incrementUnit($event, 'accessory_pedestal')"
          class="btn-increment"
        ></a>
      </div>
      <div class="span-12">
        <div class="option-element__child grid-cols-12:sm">
          <div class="span-8 align-center">
            <h3>Welcher Typ Standfuss?</h3>
          </div>
          <div class="span-4 align-center justify-end:sm">
            <div class="form-input select">
              <div class="select-wrapper">
                <select
                  @change="setChildOption($event, 'accessory_pedestal')"
                  :data-prop="'accessory_pedestal_option'"
                >
                  <option
                    value="Single Standsäule"
                    data-id="single"
                  >Single Standsäule</option>
                  <option
                    value="Double Standsäule"
                    data-id="double"
                  >Double Standsäule</option>                      
                </select>
              </div>
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
    }
  },
}
</script>
