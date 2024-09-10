<template>
  <div class="lightbox" data-lightbox="plugs">
    <div>
      <a href="" class="btn-close" data-target="plugs" @click.prevent="toggleLightbox($event)"></a>
      <h2>Kabel oder Steckdose?</h2>
      <p>Vorteil Kabel: Einfachere Handhabung.<br>Vorteil Steckdose: Es können auch Autos die nicht den Typ 2 Stecker haben das Auto aufladen</p>
      <h2>Steckertypen</h2>
      <carousel :perPage="1" :paginationActiveColor="'#FAB900'" :paginationColor="'#C4C4C4'" :paginationSize="10" :paginationPadding="6">
        <slide>
          <figure>
            <img :src="'/assets/img/info-stecker-typ-1.png'" height="200" width="200">
            <figcaption>Typ-1-Stecker - Japanische Fahrzeuge</figcaption>
          </figure>
        </slide>
        <slide>
          <figure>
            <img :src='"/assets/img/info-stecker-typ-2.png"' height="200" width="200">
            <figcaption>Typ-1-Stecker - Europäische Lösung</figcaption>
          </figure>
        </slide>
      </carousel>        
    </div>
  </div>  
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide,
  },
  methods: {
    toggleLightbox($event) {
      this.$parent.toggleLightbox($event);
    }
  },
}
</script>
<style>
.VueCarousel {
  margin-bottom: 0;
  margin-top: 0;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
.VueCarousel-dot {
  padding: 4px !important;
}
</style>