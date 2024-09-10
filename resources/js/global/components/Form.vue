<template>
<section class="configurator-app">
  <div>
    <template v-if="isLoading">
      <loading />
    </template>
    <template v-if="isSent">
      <confirmation :files="files"></confirmation>
    </template>
    <article class="configurator-form" v-if="!isSent">
      <page-intro :title="'Ihre Angaben'"></page-intro>
      <div>
        <p>Möchten Sie eine Offerte basierend auf Ihrer Konfiguration? Wir brauchen nur ein paar Angaben, die Offerte erhalten Sie dann per E-Mail. Die Produkte können über Ihren lokalen Elektroinstallateur bezogen werden.</p>
        <p>Wählen Sie das für die Offerte gewünschte Produkte aus. Sie können auch mehrere Produkte auswählen.</p>
        <form>
          <div :class="[!valid.products ? 'has-error-products' : '', 'configurator-form__products']" :data-grid="visibleProductsLength">
            <p>Bitte mind. 1 Produkt auswählen</p>
            <div>
              <a
                href="javascript:;"
                @click.prevent="toggleProduct($event, product.id)"
                v-for="product in selectedProducts"
                :key="product.id"
                :class="'btn-select'"
              >
                <strong>{{product.name}}</strong><br>
                {{priceFormat(prices[product.id].totalOptions + (prices[product.id].basic * quantities.product))}}
                <icon-check></icon-check>
              </a>
            </div>
          </div>

          <div class="form-row">
            <label :class="!valid.commission ? classes.error : ''">Kommission <em>*</em></label>
            <input
              type="text"
              @focus="valid.commission = true"
              v-model="user.commission"
              name="name"
              :class="!valid.commission ? classes.error: ''"
            >
          </div>
          <div class="form-row">
            <label :class="!valid.name ? classes.error : ''">Name <em>*</em></label>
            <input
              type="text"
              @focus="valid.name = true"
              v-model="user.name"
              name="name"
              :class="!valid.name ? classes.error: ''"
            >
          </div>
          <div class="form-row">
            <label :class="!valid.firstname ? classes.error : ''">Vorname <em>*</em></label>
            <input
              type="text"
              @focus="valid.firstname = true"
              v-model="user.firstname"
              name="firstname"
              :class="!valid.firstname ? classes.error: ''"
            >
          </div>
          <div class="form-row">
            <label>Firma</label>
            <input type="text" value v-model="user.company" name="company">
          </div>
          <div class="form-row">
            <label :class="!valid.email ? classes.error : ''">E-Mail <em>*</em></label>
            <input
              type="email"
              @focus="valid.email = true"
              v-model="user.email"
              name="name"
              :class="!valid.email ? classes.error: ''"
            >
          </div>
          <div class="form-row">
            <label :class="!valid.phone ? classes.error : ''">Telefon <em>*</em></label>
            <input
              type="text"
              @focus="valid.phone = true"
              v-model="user.phone"
              name="phone"
              :class="!valid.phone ? classes.error: ''"
            >
          </div>
          <div class="form-row is-radio">
            <div class="form-input radio">
              <button
                value="1"
                @click.prevent="toggleBox($event, 'newsletter')"
              >Ja, ich möchte über Neuigkeiten zu den Ladestationen informiert werden.</button>
            </div>
          </div>
          <div class="form-row">
            <div class="form-input radio">
              <button
                value="1"
                @click.prevent="toggleBox($event, 'contactMe')"
              >Ja, ich möchte vom e-mobility Specialist kontaktiert werden.</button>
            </div>
          </div>
          <div class="form-row is-submit">
            <input type="submit" class="btn-configurator is-primary" @click.prevent="submit()" value="Abschicken">
          </div>
        </form>
      </div>
    </article>
    <configurator-footer :btnReset="true" :btnBack="true" v-show="!isSent"></configurator-footer>
  </div>
</section>
</template>

<script>
import css from "@/global/config/css/classes.js";
import store from '@/global/store';
import helpers from "@/global/mixins/helpers";
import IconCheck from "@/global/components/configurator/icons/Check.vue";
import PageIntro from "@/global/components/layout/PageIntro.vue";
import ConfiguratorFooter from "@/global/components/configurator/ConfiguratorFooter.vue";
import Loading from "@/global/components/configurator/Loading.vue";
import Confirmation from "@/global/components/configurator/Confirmation.vue";

export default {
  components: {
    PageIntro,
    ConfiguratorFooter,
    Loading,
    Confirmation,
    IconCheck
  },

  mixins: [helpers],

  data() {
    return {
      classes: css,
      prices: {},
      products: [],
      quantities: {},
      selection: {},
      store: store,
      files: [],
      isLoading: false,
      isSent: false,

      user: {
        name: "",
        firstname: "",
        commission: "",
        company: "",
        email: "",
        phone: "",
        newsletter: false,
        contactMe: false,
        products: []
      },

      valid: {
        name: true,
        firstname: true,
        commission: true,
        email: true,
        phone: true,
        products: true
      }
    };
  },

  created() {
    this.prices = this.store.state.prices;
    this.quantities = this.store.state.quantities;
    this.products = this.store.state.products;
    this.selection = this.store.state.selection;
  },

  mounted() {},

  methods: {
    validate() {
      let valid = true;
      if (this.user.name == "") {
        this.valid.name = false;
        valid = false;
      }

      if (this.user.firstname == "") {
        this.valid.firstname = false;
        valid = false;
      }

      if (this.user.commission == "") {
        this.valid.commission = false;
        valid = false;
      }

      if (this.user.email == "") {
        this.valid.email = false;
        valid = false;
      }

      if (this.user.phone == "") {
        this.valid.phone = false;
        valid = false;
      }

      if (this.user.products.length == 0) {
        this.valid.products = false;
        valid = false;
      }

      if (valid == false) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return valid;
    },

    submit() {
      if (this.validate()) {
        let data = {
          'quantities': this.quantities,
          'properties': this.selection.props,
          'user': this.user,
          'productIds': this.user.products
        };
        this.isLoading = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.axios.post('/proposal', data).then(response => {
          this.files = response.data;
          this.isLoading = false;
          this.isSent = true;
        });
      }
    },

    toggleProduct(event, id) {

      let idx = this.user.products.indexOf(id), btn = event.target.tagName != 'A' ? event.target.parentNode : event.target;
      if (idx == -1) {
        this.user.products.push(id);
        btn.classList.add(this.classes.selected);
      }
      else {
        this.user.products.splice(idx, 1);
        btn.classList.remove(this.classes.selected);
      }
      event.target.parentNode.classList.remove(this.classes.error);
    },

    toggleBox(event, box) {
      let btn = event.target;
      if (btn.classList.contains(this.classes.selected)) {
        btn.classList.remove(this.classes.selected);
        this.user[box] = false;
      } 
      else {
        btn.classList.add(this.classes.selected);
        this.user[box] = true;
      }
    },

    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    reset() {
      this.store.commit("reset");
      document.location.href = "/domain";
    },

    close() {
      this.isSent = false;
    }
  },

  computed: {
    selectedProducts: function() {
      return this.products.filter(p => p.isVisible == true);
    },
    visibleProductsLength() {
      let p = this.products.filter(x => x.isVisible);
      return p.length;
    }
  }
};
</script>
