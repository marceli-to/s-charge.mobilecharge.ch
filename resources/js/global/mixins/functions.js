export default {

  methods: {

    /**
     * Initialize configurator
     */
    init() {

      for (var s of this.selection.props) {

        // Init product cards
        // this.updateProductCard(s.prop, s.value, s.optionValue);

        // Set button states & option values
        this.$el
          .querySelectorAll('button[data-prop="' + s.prop + '"]')
          .forEach(element => {
            if (element.value == s.value) {
              element.classList.add(this.classes.selected);
            }

            if (s.value != 0 && element.dataset.opts == 1) {
              element.classList.add(this.classes.selected);

              // Show options
              let elementOpts = this.$el.querySelector(
                'div[data-options="' + s.prop + '"]'
              );
              elementOpts.classList.remove(this.classes.hidden);

              // Select option value
              let optVal = this.$el.querySelector('[value="' + s.optionValue + '"]');
              if (optVal !== null) {
                optVal.setAttribute("selected", true);
              }

              // Select child option value
              if (s.optionSubValue != null) {
                let childOpt = this.$el.querySelector(
                  '[value="' + s.optionSubValue + '"]'
                );
                if (childOpt !== null) {
                  childOpt.setAttribute("selected", true);
                }
              }
            }
          }
        );
        
        // Validate rows
        this.validateRows();

        // Compare products
        this.compareProducts();

        // Set product quantity based items
        this.quantities['package_abo']  = this.quantities['product'];
        this.quantities['package_plus'] = this.quantities['product'];
        this.store.commit('quantities', this.quantities);
      }
    },

    /**
     * Set a property
     * @param object event
     */
    setProperty(event) {
      if (event.target.classList.contains(this.classes.selected)) return;

      const data = event.target.dataset;
      const prop = data.prop;
      const val = event.target.value;

      // Update properties shown in cards
      this.updateProductCard(prop, val);

      // Add property to users' selection
      this.storeProperty(prop, val);

      // Swap property if defined
      if (data.swap !== undefined) {
        this.swapProperty(data.swap);
      }

      // Swap base price for products with multiple versions
      if (data.variations !== undefined && data.variations) {
        this.swapProducts();
      }

      // Handle options
      if (data.opts !== undefined) {
        this.initPropertyOption(prop, val, data.opts, data.optsDefault);

        // Unset option price
        if (data.opts == 0) {
          this.storePrice(prop, 0);
          this.quantities[prop] = 0;
          this.store.commit('quantities', this.quantities);
        }

        if (data.opts == 1) {

          if (data.optsChild !== undefined) {
            this.setChildPropertyOption(data.prop, this.getChildOptionValue(data.prop), this.getChildOptionId(data.prop));
            this.storePrice(data.prop, data.optsDefault, this.getChildOptionId(data.prop));
          }
          else {
            this.storePrice(prop, data.optsDefault);
          }
          this.quantities[prop] = data.optsDefault;
          this.store.commit('quantities', this.quantities);
        }
      }

      // Reset if value = 0
      if (event.target.value == 0) {
        this.resetDropDownByProperty(prop);
      }

      this.setButtonState(event.target);
      this.compareProducts();
      this.validateRows();
    },

    setPackageProperty(event) {
      if (event.target.classList.contains(this.classes.selected)) return;

      const data = event.target.dataset;
      const prop = data.prop;
      const val = event.target.value;

      // Update properties shown in cards
      this.updateProductCard(prop, val);

      // Add property to users' selection
      this.storeProperty(prop, val);

      this.initPropertyOption(prop, val, data.opts, data.optsDefault);

      // Unset option price
      if (data.opts == 0) {
        this.storePackagePrice(prop, false);
        this.quantities[prop] = 0;
        this.store.commit('quantities', this.quantities);
      }
      
      if (data.opts == 1) {
        this.storePackagePrice(prop, data.optsDefault);
        this.quantities[prop] = this.quantities['product'];
        this.store.commit('quantities', this.quantities);
      }

      // Reset drop down if value = 0
      if (val == 0) {
        this.resetDropDownByProperty(prop);
      }

      // Remove 'package_abo' and 'package_plus' from selection if 'package_combi' is selected
      if (prop == 'package_combi' && val == 1) {
        this.removePackage('package_abo');
        this.removePackage('package_plus');
      }

      // Remove 'package_combi' from selection if 'package_plus' is selected
      if (prop == 'package_plus' && val == 1) {
        this.removePackage('package_combi');
      }

      this.setButtonState(event.target);
      this.compareProducts();
      this.validateRows();
    },

    removePackage(prop) {
      // remove from selection
      let idx = this.findArrIndex(this.selection.props, prop);
      if (idx > -1) {
        this.selection.props[idx].value = 0;
        this.store.commit('selection', this.selection);
      }

      // remove from prices
      this.products.forEach(product => {
        let priceIdx = this.findArrIndex(this.prices[product.id].options, prop);
        if (priceIdx > -1) {
          this.prices[product.id].options.splice(priceIdx, 1);
          this.setTotal(product.id);
          this.store.commit('prices', this.prices);
        }
      });

      // toggle buttons
      this.$el.querySelector('[data-button="' + prop + '"][value="1"]').classList.remove(this.classes.selected);
      this.$el.querySelector('[data-button="' + prop + '"][value="0"]').classList.add(this.classes.selected);
      let option = this.$el.querySelector('div[data-options="' + prop + '"]');
      if (option) {
        option.classList.add(this.classes.hidden);
      }

      // reset dropdown
      this.resetDropDownByProperty(prop);

      // Update product card
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          element.classList.remove(this.classes.selected);
          element.style.display = 'none';
        })
      ;
    },

    /**
     * Validate all rows
     * @todo: validate only the current row
     */
    validateRows() {

      let rows = this.$el.querySelectorAll('div[data-row]');

      for (let r of rows) {
        let isComplete = false;

        // Some row names differentiate from the element names
        // i.e. 'packages' contains 'package_abo', 'package_plus' and 'package_combi'
        let els;
        if (r.dataset.requiredItems != undefined) {
          els = r.dataset.requiredItems.split(",");
        }
        else if (r.dataset.require != undefined) {
          els = r.dataset.require.split(",");
        }

        if (els.length > 0) {
          let count = 0;
          for (let e of els) {
            let btn = this.$el.querySelector('.is-selected[data-button="' + e + '"]');
            if (btn != null) {
              count++;
            }
            else {
              count--;
            }
          }

          if (count == els.length) {
            isComplete = true;
          }
        }

        if (isComplete) {
          r.classList.add(this.classes.complete);
        }
      }
    },

    /**
     * Set a price
     * @param object event
     */

    setPrice(event) {
      if (event.target.classList.contains(this.classes.selected)) return;
      const data = event.target.dataset;
      this.setProperty(event);
      this.storePrice(data.prop, event.target.value);
      this.setButtonState(event.target);
    },

    setPackagePrice(event) {
      if (event.target.classList.contains(this.classes.selected)) return;

      const data = event.target.dataset;
      this.setProperty(event);
      this.storePrice(data.prop, event.target.value);
      this.setButtonState(event.target);

      // Reset 'package_combi' if 'package_abo' is selected
      if (event.target.value == 1) {
        this.removePackage('package_combi');
      }

      this.quantities['package_abo'] = this.quantities['product'];
      this.store.commit('quantities', this.quantities);
    },

    /**
     * Set option from dropdown
     * @param object event
     * @param str prop
     */
    setOption(event, prop) {
      // Add option to users' selection
      this.setPropertyOption(prop, 1, event.target.value);

      // Update product card
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (!element.classList.contains('not-available')) {
            element.innerHTML = this.descriptions[prop] + " (" + event.target.value + ")";
          }
        })
      ;
    },

    setPackageOption(event, prop) {
      // Add option to users' selection
      this.setPropertyOption(prop, 1, event.target.value);
      this.storePackagePrice(prop, event.target.value);
      
      // Update product card
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (!element.classList.contains('not-available')) {
            element.innerHTML = this.descriptions[prop];
          }
        })
      ;
    },

    /**
     * Set child option from dropdown
     * @param object event
     * @param str prop
     */
    setChildOption(event, prop) {

      // Add option to users' selection
      this.setChildPropertyOption(prop, event.target.value, this.getChildOptionId(prop));
      this.storePrice(prop, this.quantities[prop], this.getChildOptionId(prop));
      
      // Update product card
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (!element.classList.contains('not-available')) {
            // element.innerHTML = this.descriptions[prop] + " (" + this.quantities[prop] + ")";
            element.innerHTML = this.descriptions[prop];
          }
        })
      ;
    },

    /**
     * Get child option id from dropdown
     * @param str prop
     */
    getChildOptionId(prop) {
      let opts = this.$el.querySelector('[data-prop="' + prop + '_option"]');
      let id = opts.options[opts.selectedIndex].dataset.id;
      return id;
    },

    /**
     * Get child option value from dropdown
     * @param str prop
     */
    getChildOptionValue(prop) {
      let opts = this.$el.querySelector('[data-prop="' + prop + '_option"]');
      let value = opts.options[opts.selectedIndex].value;
      return value;
    },

    /**
     * Initialize property options
     * @param str prop
     * @param bool value
     * @param bool opts
     * @param mixed optsDefault
     */
    initPropertyOption(prop, value, opts, optsDefault = false) {
      // Toggle options
      if (opts == 1) {
        this.$el
          .querySelector('[data-options="' + prop + '"]')
          .classList.remove(this.classes.hidden);
      } else {
        this.$el
          .querySelector('[data-options="' + prop + '"]')
          .classList.add(this.classes.hidden);
      }

      // Update card with default
      let defaultValue = optsDefault;
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (!element.classList.contains('not-available')) {
            // element.innerHTML = opts == 1 ? this.descriptions[prop] + " (" + defaultValue + ")" : this.descriptions[prop];
            element.innerHTML = this.descriptions[prop];
          }
        });

      // Add/remove property option
      if (opts == 1) {
        this.setPropertyOption(prop, value, defaultValue);
      } else {
        this.unsetPropertyOption(prop);
      }
    },

    /**
     * Add an option to users' selection
     * @param str prop
     * @param str val
     */
    setPropertyOption(prop, val, optionValue) {
      let idx = this.findArrIndex(this.selection.props, prop);
      this.selection.props[idx].option = 1;
      this.selection.props[idx].value = val;
      this.selection.props[idx].optionValue = optionValue;
      this.store.commit('selection', this.selection);
    },

    /**
     * Add an option to users' selection
     * @param str prop
     * @param str val
     */
    setChildPropertyOption(prop, val, id) {
      let idx = this.findArrIndex(this.selection.props, prop);
      this.selection.props[idx].optionSubValue = val;
      this.selection.props[idx].optionSubValueId = id;
      this.store.commit('selection', this.selection);
    },

    /**
     * Remove an option from users' selection
     * @param str prop
     */
    unsetPropertyOption(prop) {
      let idx = this.findArrIndex(this.selection.props, prop);
      delete this.selection.props[idx]["option"];
      this.store.commit('selection', this.selection);
    },

    /**
     * Update a option in users' selection
     * @param str prop
     * @param mixed val
     */
    updatePropertyOption(prop, val) {
      let idx = this.findArrIndex(this.selection.props, prop);
      this.selection.props[idx].optionValue = val;
      this.store.commit('selection', this.selection);

      // Update card
      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (!element.classList.contains('not-available')) {
            //element.innerHTML = this.descriptions[prop] + " (" + val + ")";
            element.innerHTML = this.descriptions[prop];
          }
        })
      ;
    },

    /**
     * Store property in selection
     * @param str prop
     * @param int val
     */
    storeProperty(prop, val) {
      let idx = this.findArrIndex(this.selection.props, prop);
      if (idx > -1) {
        this.selection.props[idx] = {
          prop: prop,
          value: val
        };
      } else {
        this.selection.props.push({
          prop: prop,
          value: val
        });
      }
      this.store.commit('selection', this.selection);
    },

    /**
     * Store price in price array
     * @param str prop
     * @param int qty
     */
    storePrice(prop, qty, option = false) {

      this.products.forEach(product => {

        if (
          this.propExists(prop, product.props) && 
          this.propExists(prop, product.options)
        )
        {
          let price = option === false ? product.options[prop].price : product.options[prop].price[option],
          isRatePerMonth = product.options[prop].isRatePerMonth,
          isRatePerYear = product.options[prop].isRatePerYear,
          idx = this.findArrIndex(this.prices[product.id].options, prop);
          
          if (idx > -1) {

            // Remove or update price
            if (qty == 0) {
              delete this.prices[product.id].options[idx];
              this.prices[product.id].options = this.prices[product.id].options.filter(function() {
                return true;
              });
            } 
            else {

              if (typeof price === 'object' && price !== null) {
                this.prices[product.id].options.push({
                  prop: prop,
                  value: price.base + (parseInt(this.quantities.product) * price.unit),
                  isRatePerMonth: isRatePerMonth,
                  isRatePerYear: isRatePerYear
                });
              }
              else {
                this.prices[product.id].options[idx] = {
                  prop: prop,
                  value: price * parseInt(qty),
                  isRatePerMonth: isRatePerMonth,
                  isRatePerYear: isRatePerYear
                };
              }
            }
          } 
          else if (qty > 0) {
            if (typeof price === 'object' && price !== null) {
              this.prices[product.id].options.push({
                prop: prop,
                value: price.base + (parseInt(this.quantities.product) * price.unit),
                isRatePerMonth: isRatePerMonth,
                isRatePerYear: isRatePerYear
              });
            }
            else {
              this.prices[product.id].options.push({
                prop: prop,
                value: price * parseInt(qty),
                isRatePerMonth: isRatePerMonth,
                isRatePerYear: isRatePerYear,
              });
            }
          }
          this.setTotal(product.id);
        }
      });

      this.store.commit('prices', this.prices);
    },

    /**
     * Store package price in price array
     * @param str prop
     * @param int index
     */
    storePackagePrice(prop, index) {
      this.products.forEach(product => {
        if (this.propExists(prop, product.props)) {
          let idx = this.findArrIndex(this.prices[product.id].options, prop),
              price = product.options[prop].price,
              isRatePerMonth = product.options[prop].isRatePerMonth,
              isRatePerYear = product.options[prop].isRatePerYear;

          if (idx > -1) {
            // Remove or update price
            if (index === false) {
              delete this.prices[product.id].options[idx];
              this.prices[product.id].options = this.prices[product.id].options.filter(function() {
                return true;
              });
            } 
            else {
              this.prices[product.id].options[idx] = {
                prop: prop,
                unit: index,
                value: parseInt(this.quantities.product) * price.unit[index],
                isRatePerMonth: isRatePerMonth,
                isRatePerYear: isRatePerYear
              };
            }
          } 
          else {

            if (price.unit[index] !== undefined) {
              this.prices[product.id].options.push({
                prop: prop,
                unit: index,
                value: parseInt(this.quantities.product) * price.unit[index],
                isRatePerMonth: isRatePerMonth,
                isRatePerYear: isRatePerYear
              });
            }
          }

          this.setTotal(product.id);
        }
      });

      this.store.commit('prices', this.prices);
    },

    updatePricePerUnit(prop, qty) {
      this.products.forEach(product => {
        if (this.propExists(prop, product.props)) {
          let idx = this.findArrIndex(this.prices[product.id].options, prop);
          if (idx > -1) {
            var price = product.options[prop].price;
            if (typeof price === 'object' && price !== null) {
              if (typeof price.unit === 'object' && price.unit !== null) {
                this.prices[product.id].options[idx].value = price.base + (parseInt(this.quantities.product) * price.unit);
              }
              else {
                this.prices[product.id].options[idx].value = price.base + (parseInt(this.quantities.product) * price.unit);
              }
              this.setTotal(product.id);
            }
          }
        }
      });

      this.store.commit('prices', this.prices);
    },

    updatePackagePricePerUnit(prop) {
      this.products.forEach(product => {
        if (this.propExists(prop, product.props)) {
          let p = this.findByAttr(this.selection.props, prop),
              idx = this.findArrIndex(this.prices[product.id].options, prop),
              price = product.options[prop].price;
          if (idx > -1 && p.optionValue != undefined) {
            this.prices[product.id].options[idx].value = parseInt(this.quantities.product * price.unit[p.optionValue]);
            this.setTotal(product.id);
          }
        }
      });

      this.store.commit('prices', this.prices);
    },

    /**
     * Swap a property
     * @param str prop
     */
    swapProperty(prop) {
      let props = prop.split(',');
      props.forEach(p => {
        let idx = this.findArrIndex(this.selection.props, p);
        if (idx > -1) {
          // Remove property from selection
          // and reset array keys of selection
          delete this.selection.props[idx];
          this.selection.props = this.selection.props.filter(function() {
            return true;
          });
          // Remove selected-class from product card
          this.updateProductCard(p, 0);
          this.store.commit('selection', this.selection);
        }
      });
    },

    /**
     * Update the product cards
     * @param str prop
     * @param int val
     */

    updateProductCard(prop, val, optionValue = false) {

      this.$el
        .querySelectorAll('div[data-prop="' + prop + '"]')
        .forEach(element => {
          if (val != 0) {
            element.classList.add(this.classes.selected);
            element.style.display = 'flex';
          }
          else {
            element.classList.remove(this.classes.selected);
            element.style.display = 'none';
          }
          // + " (" + this.descriptions[optionValue] + ")"
          element.innerHTML = this.descriptions[prop];
        })
      ;
    },

    /**
     * Set the state of a button
     * @param element btn
     */
    setButtonState(btn) {
      this.$el
        .querySelectorAll('[data-button="' + btn.dataset.button + '"]')
        .forEach(element => element.classList.remove(this.classes.selected));
      btn.classList.add(this.classes.selected);
    },

    /**
     * Compare the products and set product state
     */
    compareProducts() {
      this.products.forEach(product => {
        let matches = 0;
        this.selection.props.forEach(selection => {
          if (product.props[selection.prop] == -1 && selection.value != 0) {
            matches--;
          }
          else {
            matches++
          }
          
          // Handle special case 'installation_cable'
          if (selection.prop == 'installation_cable' && product.installation_cable == -1 && selection.value == 1 && product.id < 19) {
            matches--;
          }
        });
        product.match = this.selection.props.length == matches ? 1 : 0;
      });
    },

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
          
          btn.target.scrollIntoView({block: "start", behavior: "smooth"});
      }
    },

    /**
     * Increment a certain type
     * @param str type
     */
    increment(type) {
      this.quantities[type]++;
      if (type == 'product') {
        this.updateUnitBasedItems();
      }
    },

    /**
     * Decrement a certain type
     * @param str type
     */
    decrement(type) {
      this.quantities[type] = this.quantities[type] > 1 ? this.quantities[type] - 1 : 1;
      if (type == 'product') {
        this.updateUnitBasedItems();
      }
    },

    incrementUnit(event, type) {
      const data = event.target.dataset;
      this.quantities[type]++;
      this.store.commit('quantities', this.quantities);
      this.updatePropertyOption(data.prop, this.quantities[data.prop]);
      if (data.hasPrice !== undefined && data.hasPrice) {
        this.storePrice(data.prop, this.quantities[data.prop]);
      }
      if (data.hasOptions !== undefined && data.hasOptions) {
        this.storePrice(data.prop, this.quantities[data.prop], this.getChildOptionId(data.prop));
      }
    },

    decrementUnit(event, type) {
      const data = event.target.dataset;
      this.quantities[data.prop] = this.quantities[data.prop] > 1 ? this.quantities[data.prop] - 1 : 1;
      this.store.commit('quantities', this.quantities);
      this.updatePropertyOption(data.prop, this.quantities[data.prop]);
      if (data.hasPrice !== undefined && data.hasPrice) {
        this.storePrice(data.prop, this.quantities[data.prop]);
      }
      if (data.hasOptions !== undefined && data.hasOptions) {
        this.storePrice(data.prop, this.quantities[data.prop], this.getChildOptionId(data.prop));
      }
    },

    updateUnitBasedItems() {
      this.updatePricePerUnit('installation', this.quantities.product);
      this.updatePricePerUnit('package_abo', this.quantities.product);
      this.updatePackagePricePerUnit('package_plus', this.quantities.product);
      this.updatePackagePricePerUnit('package_combi', this.quantities.product);
      this.quantities['package_abo'] = this.quantities.product;
      this.quantities['package_plus'] = this.quantities.product;
      this.quantities['package_combi'] = this.quantities.product;
      this.store.commit('quantities', this.quantities);
    },

    /**
     * Set the total for a product
     * @param int productId
     */
    setTotal(id) {
      let total = 0;
      if (this.prices[id].options.length > 0) {
        this.prices[id].options.forEach(price => {
          if (price.isRatePerMonth || price.isRatePerYear) {
            if (price.isRatePerMonth) {
              total = total + parseFloat(12 * price.value);
            }
            if (price.isRatePerYear) {
              total = total + parseFloat(price.value);
            }
          }
          else {
            total = total + parseFloat(price.value);
          }
        });
        this.prices[id].totalOptions = total;
      }
      else {
        this.prices[id].totalOptions = 0;
      }
    },

    /**
     * Check if a propery exists
     * @param str prop
     * @param obj props
     */
    propExists(prop, props) {
      if (props[prop] != -1 && props[prop] != undefined) return true;
      return false;
    },

    resetDropDownByProperty(prop) {
      let dd = this.$el.querySelector('[name="'+prop+'_option"]');
      if (dd) {
        dd.selectedIndex = 0;
      }
    },
  }
};