<template>
  <article class="configurator-form-confirmation">
    <div>
      <icon-check-circle></icon-check-circle>
      <h1>Vielen Dank</h1>
      <p>Vielen Dank für Ihre Anfrage. Wir haben Ihnen die gewünschte/n Offerte/n per Mail zugestellt. Sie können diese auch mittels untenstehenden Links direkt herunterladen:</p>
      <div class="configurator-form-confirmation__documents justify-center">
        <div v-for="(file, index) in files" :key="index">
          <a
            :href="file.uri + file.name"
            target="_blank"
            class="btn-configurator is-primary is-download"
          >
            {{file.title}}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import IconCheckCircle from "@/global/components/configurator/icons/CheckCircle.vue";

export default {

  components: {
    IconCheckCircle
  },

  props: {
    files: Array,
  },
}
</script>

