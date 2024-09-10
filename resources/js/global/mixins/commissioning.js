export default {

  methods: {

    /**
     * Toggle sections
     * @param element btn
     */
    toggleSection(btn) {
      let el = btn.target.dataset.rowButton;

      if (
        this.$el
          .querySelector('[data-row="' + el + '"]')
          .classList.contains(this.classes.active)
      ) {
        this.$el
          .querySelector('[data-row="' + el + '"]')
          .classList.remove(this.classes.active);

      } else {
        this.$el
          .querySelectorAll("[data-row]")
          .forEach(element => element.classList.remove(this.classes.active));
        this.$el
          .querySelector('[data-row="' + el + '"]')
          .classList.add(this.classes.active);
        this.$el
          .querySelector('[data-row="' + el + '"]')
          .classList.remove(this.classes.error);
          
          btn.target.scrollIntoView({block: "start", behavior: "smooth"});
      }
    },

  }

};