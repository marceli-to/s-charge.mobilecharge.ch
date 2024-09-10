<template>
<section class="configurator-app">
  <div>
    <!-- Lightboxes -->
    
      <lightbox-rfid></lightbox-rfid>
      <lightbox-plugs></lightbox-plugs>
      <lightbox-cable></lightbox-cable>
   
    <!-- // Lightboxes -->
    <page-intro :title="'Einzelstation'"></page-intro>

    <article>

      <!-- Ladestation -->
      <div class="configurator-option" data-row="ladestation" data-require="charge,power,communication">
        <button-toggle-section :title="'Ladestation'" :target="'ladestation'">
          <row-number :number="'1'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content">
          <div class="option-elements">
            <station-quantity :quantities="quantities.product"></station-quantity>
            <station-charge></station-charge>
            <station-performance :variations="false"></station-performance>
            <station-communication></station-communication>
          </div>
        </div>
      </div>
      <!-- // Ladestation -->

      <!-- System -->
      <div class="configurator-option" data-row="system" data-require="solar,dyn_load_mgmt">
        <button-toggle-section :title="'System'" :target="'system'">
          <row-number :number="'2'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content">
          <div class="option-elements">
            <system-solar></system-solar>
            <system-dynamic-load-management></system-dynamic-load-management>
          </div>
        </div>
      </div>
      <!-- // System -->

      <!-- Installation -->
      <div class="configurator-option" data-row="installation" data-require="installation">
        <button-toggle-section :title="'Installation'" :target="'installation'">
          <row-number :number="'3'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content">
          <div class="option-elements">
            <installation-monteur></installation-monteur>
          </div>
        </div>
      </div>
      <!-- // Installation -->

      <!-- Cloud -->
      <div class="configurator-option" data-row="cloud" data-require="cloud_data,cloud_connect,cloud_pay">
        <button-toggle-section :title="'mobilecharge Cloud'" :target="'cloud'">
          <row-number :number="'4'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content">
          <div class="option-elements">
            <cloud-data :quantities="parseInt(quantities.cloud_data)" :variations="true"></cloud-data>
            <cloud-connect :quantities="parseInt(quantities.cloud_connect)" :variations="true"></cloud-connect>
            <cloud-pay :quantities="parseInt(quantities.cloud_pay)" :variations="true"></cloud-pay>
          </div>
        </div>
      </div>
      <!-- // Cloud -->

      <!-- Zubehör -->
      <div class="configurator-option" data-row="accessories" data-require="accessory_pedestal,accessory_rfid,accessory_cable">
        <button-toggle-section :title="'Zubehör'" :target="'accessories'">
          <row-number :number="'5'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content">
          <div class="option-elements">
            <accessory-pedestal :quantities="parseInt(quantities.accessory_pedestal)"></accessory-pedestal>
            <accessory-rfid :quantities="parseInt(quantities.accessory_rfid)"></accessory-rfid>
            <accessory-cable :quantities="parseInt(quantities.accessory_cable)"></accessory-cable>
          </div>
        </div>
      </div>
      <!-- // Zubehör -->

      <!-- Zusatzpackete -->
      <div class="configurator-option" data-row="packages" data-require="packages" data-required-items="package_abo,package_plus,package_combi">
        <button-toggle-section :title="'E-Mobility Zusatzpackete'" :target="'packages'">
          <row-number :number="'6'"></row-number>
        </button-toggle-section>
        <div class="configurator-option__content is-last">
          <div class="option-elements">
            <packages></packages>
          </div>
        </div>
      </div>
      <!-- // Zusatzpackete -->

    </article>

    <configurator-footer :btnProducts="true" :btnBack="true"></configurator-footer>


    <article class="products-preview">
      <div class="product-preview" v-for="product in products" :key="product.id" :style="[product.isVisible ? {'display':'block'} : {'display':'none'}]">
        <product-preview
          :product="product"
          :selection="selection"
          :id="product.id"
          :prices="prices"
          :quantities="quantities"
          :isMatch="product.match == 1 ? true : false"
        >
        </product-preview>
      </div>
    </article>

  </div>
</section>
</template>
<script>
import css from "@/global/config/css/classes.js";
import descriptions from "@/global/config/properties/descriptions.js";

import helpers from "@/global/mixins/helpers";
import functions from "@/global/mixins/functions";
import store from '@/global/store';

import PageIntro from "@/global/components/layout/PageIntro.vue";
import ProductPreview from "@/global/components/configurator/ProductPreview.vue";
import ConfiguratorFooter from "@/global/components/configurator/ConfiguratorFooter.vue";

import LightboxRfid from "@/global/components/configurator/partials/lightbox/Rfid.vue";
import LightboxPlugs from "@/global/components/configurator/partials/lightbox/Plugs.vue";
import LightboxCable from "@/global/components/configurator/partials/lightbox/Cable.vue";

import StationQuantity from "@/global/components/configurator/partials/element/StationQuantity.vue";
import StationCharge from "@/global/components/configurator/partials/element/StationCharge.vue";
import StationPerformance from "@/global/components/configurator/partials/element/StationPerformance.vue";
import StationCommunication from "@/global/components/configurator/partials/element/StationCommunication.vue";
import SystemSolar from "@/global/components/configurator/partials/element/SystemSolar.vue";
import SystemStaticLoadManagement from "@/global/components/configurator/partials/element/SystemStaticLoadManagement.vue";
import SystemDynamicLoadManagement from "@/global/components/configurator/partials/element/SystemDynamicLoadManagement.vue";
import InstallationMonteur from "@/global/components/configurator/partials/element/InstallationMonteur.vue";

import CloudData from "@/global/components/configurator/partials/element/CloudData.vue";
import CloudConnect from "@/global/components/configurator/partials/element/CloudConnect.vue";
import CloudPay from "@/global/components/configurator/partials/element/CloudPay.vue";

import AccessoryPedestal from "@/global/components/configurator/partials/element/AccessoryPedestal.vue";
import AccessoryRfid from "@/global/components/configurator/partials/element/AccessoryRfid.vue";
import AccessoryCable from "@/global/components/configurator/partials/element/AccessoryCable.vue";
import Packages from "@/global/components/configurator/partials/element/Packages.vue";

import ButtonToggleSection from "@/global/components/configurator/partials/buttons/ButtonToggleSection.vue";
import RowNumber from "@/global/components/configurator/partials/ui/RowNumber.vue";


export default {
  components: {
    PageIntro,
    ProductPreview,
    ConfiguratorFooter,
    
    // Lightboxes
    LightboxRfid,
    LightboxPlugs,
    LightboxCable,

    // Elements
    StationQuantity,
    StationCharge,
    StationPerformance,
    StationCommunication,
    SystemSolar,
    SystemStaticLoadManagement,
    SystemDynamicLoadManagement,
    InstallationMonteur,

    CloudData,
    CloudConnect,
    CloudPay,
    
    AccessoryPedestal,
    AccessoryRfid,
    AccessoryCable,
    Packages,

    // Buttons/UI
    ButtonToggleSection,
    RowNumber,
  },

  mixins: [helpers, functions],

  data() {
    return {
      // user selection
      selection: [],

      // css classes
      classes: css,

      // quantities
      quantities: {},

      // prices
      prices: {},

      // products
      products: {},

      // property descriptions
      descriptions: descriptions,

      // store
      store: store
    };
  },

  created() {
    this.selection    = this.store.state.selection;
    this.quantities   = this.store.state.quantities;
    this.prices       = this.store.state.prices;
  },

  mounted() {
    this.axios.get("/api/data/get/single").then(response => {
      this.products = response.data.products;
      if (this.store.state.products.length == 0) {
        this.store.commit('products', this.products);
      }
      else {
        this.products = this.store.state.products;
      }
      this.init();
    });
  },

  methods: {

    swapProducts() {
      let selection = this.selection.props;
      let idxCloudPrivate = selection.findIndex(x => x.prop == 'cloud_private');
      let idxCloudPublic  = selection.findIndex(x => x.prop == 'cloud_public');
      let idxChargeCable  = selection.findIndex(x => x.prop == 'charge_cable');
      let idxChargePlug   = selection.findIndex(x => x.prop == 'charge_plug');
      let ids = [];
      let prod = this.products;

      if (idxChargeCable > -1) {
        prod = prod.filter(x => x.charge_cable == selection[idxChargeCable].value);
      }

      if (idxChargePlug > -1) {
        prod = prod.filter(x => x.charge_plug == selection[idxChargePlug].value);
      }

      if (idxCloudPrivate > -1 && idxCloudPublic > -1) {
        prod = prod.filter(x => x.cloud_private == selection[idxCloudPrivate].value || x.cloud_public == selection[idxCloudPublic].value);
      }
      else if (idxCloudPrivate > -1 && idxCloudPublic == -1) {
        prod = prod.filter(x => x.cloud_private == selection[idxCloudPrivate].value);
      }
      else if (idxCloudPrivate == -1 && idxCloudPublic > -1) {
        prod = prod.filter(x => x.cloud_public == selection[idxCloudPublic].value);
      }

      // Map matching ids
      ids.push(...prod.map(x => x.id));

      // Get lowest priced product from matching ids
      let lowest = this.getLowestPriceProducts(ids, this.products);
      let products = this.products;

      // Change visibility for lowest priced matching product
      Object.keys(products).forEach(function(key) {
        if (products[key].hasVariation) {
          products[key].isVisible = lowest.indexOf(products[key].id) !== -1 ? true : false;
        }
      });
      this.products = products;
      this.store.commit('products', this.products);
    }
  },

  computed: {
    selected: function() {
      return this.selection.props.filter(s => s.value != "0");
    },
  }
};
</script>
