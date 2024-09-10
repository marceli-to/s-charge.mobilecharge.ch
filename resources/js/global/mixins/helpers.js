export default {

  methods: {

    /**
     * Find array index of a given property
     *
     * @param arr array
     * @param str prop
     * @return index
     */

    findArrIndex(array, prop) {
      return array.findIndex(attr => attr.prop === prop);
    },

    /**
     * Find index of a given property
     *
     * @param obj object
     * @param str attr
     * @param str value
     * @return index
     */

    findByAttr(object, attr, value) {
      return object.find(x => x[attr] === value)
    },

    /**
     * Set price format
     * @param float price
     */

    priceFormat(price) {
      return price.toFixed(2);
    },

    /**
     * Toggle product card
     * @param event 
     */
    toggleCard(event) {
      let card = event.target;
      if (card.classList.contains(this.classes.visible)) {
        card.classList.remove(this.classes.visible);
        this.$el
          .querySelector(".content-products")
          .classList.remove("has-card");
      } else {
        card.classList.add(this.classes.visible);
        this.$el.querySelector(".content-products").classList.add("has-card");
      }
    },

    /**
     * Show product card
     * @param event 
     */
    showCard($event) {
      let card = event.target;
      card.classList.add(this.classes.visible);
      this.$el.querySelector(".content-products").classList.add("has-card");
    },

    /**
     * Hide product card
     * @param event 
     */
    hideCard($event) {
      let card = event.target;
      card.classList.remove(this.classes.visible);
      this.$el.querySelector(".content-products").classList.remove("has-card");
    },

    /**
     * Handle product card
     * @param event 
     */
    handleCard($event) {
      let card = event.target.parentNode;
      if (card.classList.contains(this.classes.visible)) {
        card.classList.remove(this.classes.visible);
        this.$el.querySelector(".content-products").classList.remove("has-card");
      }
      else {
        card.classList.remove(this.classes.visible);
        this.$el.querySelector(".content-products").classList.add("has-card");
      }
    },

    /**
     * Toggle lightbox
     * @param event 
     */
    toggleLightbox(event) {
      let lightbox = this.$el.querySelector('[data-lightbox="'+event.target.dataset.target+'"]');
      if (lightbox.classList.contains(this.classes.visible)) {
        lightbox.classList.remove(this.classes.visible);
      }
      else {
        lightbox.classList.add(this.classes.visible);
        this.$el.querySelector('.VueCarousel-inner').style.visibility = 'visible';
      }
    },

    getLowestPriceProducts(ids, products) {

      // Filter out products without group or not in ids array
      var group = products.filter(function(product) {
        return product.group != false && ids.indexOf(product.id) !== -1;
      });

      // Group items
      var grouped = this.groupBy(group, 'group'), lowest = [];

      // Get min price(s)
      Object.keys(grouped).forEach(function(key) {
        var min = grouped[key].reduce(function(prev, curr) {
          return prev.price < curr.price ? prev : curr;
        });
        lowest.push(min.id);
      });
      return lowest;
    },

    groupBy(data, key) { 
      return data.reduce(function(storage, item) {
        var group = item[key];
        storage[group] = storage[group] || [];
        storage[group].push(item);
        return storage; 
      }, {});
    }
  }
};
