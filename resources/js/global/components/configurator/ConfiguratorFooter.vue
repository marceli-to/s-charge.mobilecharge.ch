<template>
  <footer class="configurator-footer">
    <div>
      <router-link :to="{name: 'compare'}" class="btn-configurator is-primary" v-if="btnProducts">
        <span>Weiter</span>
      </router-link>
    
      <router-link :to="{name: 'form'}" class="btn-configurator is-primary" v-if="btnQuote">
      <span>Weiter</span>
      </router-link>
      
      <a href="/" @click.prevent="back()" class="btn-configurator is-secondary" v-if="btnBack">
        <span>Zurück</span>
      </a>

      <a href="/" @click.prevent="reset()" class="btn-configurator is-secondary" v-if="btnReset">
        <span>Neu Konfigurieren</span>
      </a>
    </div>
  </footer>
</template>
<script>
import store from '@/global/store';

export default {

  props: {
    btnProducts: {
      type: Boolean,
      default: false
    },
    btnQuote: {
      type: Boolean,
      default: false
    },
    btnBack: {
      type: Boolean,
      default: false
    },
    btnReset: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      store: store
    };
  },

  methods: {

    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    reset() {
      this.store.commit("reset");
      document.location.href = "/domain";
    }
  },
};
</script>