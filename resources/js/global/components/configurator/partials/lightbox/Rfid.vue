<template>
  <div class="lightbox" data-lightbox="rfid">
    <div>
      <a href="" class="btn-close" data-target="rfid" @click.prevent="toggleLightbox($event)"></a>
      <h2>RFID-Schlüssel</h2>
      <figure>
        <img src="/assets/img/info-rfid.png" height="200" width="200">
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toggleLightbox($event) {
      this.$parent.toggleLightbox($event);
    }
  },
}
</script>
