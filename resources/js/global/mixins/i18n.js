export default {
  
  data() {
    return {

      translations: {},

      fallback_locale: 'en',

      routes: {
        get: '/api/translations',
      },
    }
  },

  mounted() {
    this._getTranslations();
  },

  methods: {

    __(key) {
      if (this.translations[key]) {
        return this.translations[key];
      }
      return key;
    },

    _getLocale() {
      let ll = document.documentElement.lang ? document.documentElement.lang : 'de';
      return ll;
    },

    _getTranslations() {
      const locale = this._getLocale();
      if (locale) {
        this.axios.get(`${this.routes.get}/${locale}`).then(response => {
          this.translations = JSON.parse(response.data);
          this.hasTranslations = true;
        });
      }
    },
  }
};