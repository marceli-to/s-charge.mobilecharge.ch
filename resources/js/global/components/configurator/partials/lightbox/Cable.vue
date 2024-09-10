<template>
  <div class="lightbox" data-lightbox="cable">
    <div>
      <a href="javascript:;" class="btn-close" data-target="cable" @click.prevent="toggleLightbox($event)"></a>
      <h2>Ladekabel</h2>
      <p>
        20 A = Leistung in Ampere<br>
        1 P = Einphasig<br>
        3 P = 3 Phasig<br>
        N = Neutralleiter<br>
        PE = Schutzleiter<br>
        T1 = Stecker Typ 1<br>
        T2 = Stecker Typ 2
      </p>
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