<template>
  <div class="lightbox" data-lightbox="save">
    <div>
      <a href="javascript:;" class="btn-close" data-target="cable" @click.prevent="hide($event)"></a>
      <h2>{{ __('Eingaben erfolgreich') }}</h2>
      <p>{{ __('Die Eingaben sind erfolgreich gespeichert worden. Um die Bearbeitung des Formulars zu einem späteren Zeitpunkt fortzusetzen, kann der nachfolgende Link kopiert werden. Alternativ kann eine E-Mail-Adresse angegeben werden, an die der Bearbeitungslink gesendet wird.') }}</p>
      
      <template v-if="isSent">
        <div class="is-success mb-24x">
          {{ __('Der Link wurde an die angegebene Adresse versendet.') }}
        </div>
      </template>

      <template v-if="!hasForm">
        <div class="sm:flex sm:justify-between mt-32x">
          <a href="javascript:;" @click.prevent="copyUrl()" target="_blank" :class="[isCopied ? 'disabled' : '', 'btn-commissioning is-primary mb-16x sm:mb-0']">
            <icon-copy v-if="!isCopied" />
            <span class="ml-12x" v-if="!isCopied">{{ __('Link kopieren') }}</span>
            <span class="mr-12x" v-else>{{ __('Link kopiert!') }}</span>
          </a>
          <a href="javascript:;" @click.prevent="showForm()" target="_blank" :class="[isSending ? 'disabled' : '', 'btn-commissioning is-primary']">
            <icon-inbox />
            <span class="ml-12x">{{ __('Per E-Mail senden') }}</span>
          </a>
        </div>
      </template>

      <template v-if="hasForm">
        <form class="mt-24x">
          <template v-if="hasError">
            <div class="has-error mb-24x">
              {{ __('Bitte überprüfen Sie die E-Mail-Adresse!') }}
            </div>
          </template>
          <div :class="[errors.email ? 'has-error' : '', 'form-input']">
            <label for="email">{{ __('E-Mail') }}</label>
            <input type="email" id="email" name="email" v-model="email" @focus="resetErrors()" />
          </div>
          <div class="mt-24x flex justify-between items-center">
            <a href="javascript:;" @click.prevent="sendUrl()" :class="[isSending ? 'disabled' : '', 'btn-commissioning is-primary']">
              <icon-inbox />
              <template v-if="isSending">
                <span class="ml-12x">{{ __('Sende...') }}</span>
              </template>
              <template v-else>
                <span class="ml-12x">{{ __('Senden') }}</span>
              </template>
            </a>
            <a href="javascript:;" @click.prevent="cancelForm()">
              {{ __('Abbrechen') }}
            </a>
          </div>
        </form>
      </template>

      <div class="mt-24x lg:mt-32x">
        <div class="fs-xxs leading-2">
          {{ __('Sollte das kopieren nicht klappen, verwenden Sie untenstehende URL:') }}
        </div>
        <div class="fs-xxs leading-2">
          <a :href="`${url}`" target="_blank">{{ url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconArrow from '@/global/components/commissioning/icons/Arrow.vue';
import IconCopy from '@/global/components/commissioning/icons/Copy.vue';
import IconInbox from '@/global/components/commissioning/icons/Inbox.vue';
import i18n from "@/global/mixins/i18n";

export default {

  components: {
    IconArrow,
    IconCopy,
    IconInbox
  },

  data() {
    return {
      isCopied: false,
      isSent: false,
      isSending: false,
      hasForm: false,
      hasError: false,

      errors: {
        email: false,
      },

      // email
      email: null,

      // routes
      routes: {
        send: '/api/commissioning-form/send',
      }
    }
  },

  mixins: [i18n],

  props: {
    url: {
      type: String,
      default: ''
    }
  },

  methods: {
    hide() {
      document.querySelector('.lightbox[data-lightbox="save"]').classList.remove('is-visible');
      this.isCopied = false;
    },

    copyUrl() {
      const el = document.createElement('textarea');
      el.value = this.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.isCopied = true;
    },

    showForm() {
      this.hasForm = true;
      this.isSent = false;
      this.isSending = false;
    },

    cancelForm() {
      this.hasForm = false;
      this.isSent = false;
      this.isSending = false;
    },

    sendUrl() {
      // send url via post request
      this.isSending = true;

      const data = {
        email: this.email,
        url: this.url
      };

      this.axios.post(`${this.routes.send}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        this.isSent = true;
        this.isSending = false;
        this.email = null;
        this.hasForm = false;
      }).catch(error => {
        this.hasError = true;
        this.errors.email = true;
        this.isSending = false;
      });
    },

    resetErrors() {
      this.errors = {
        email: false,
      };
      this.hasError = false;
    }
  },

}
</script>