<template>

  <section class="commissioning-app" v-if="hasTranslations && isLoaded">
    <div>
      <lightbox-save :url="edit_url"></lightbox-save>
      <div :class="[isLoading ? 'is-visible' : '', 'loading']">
        <div>Loading...</div>
      </div>
      <page-intro :title="this.__('Inbetriebnahme Formular')">
        <div>
          <p>{{ __('Zur effizienten Inbetriebnahme der Anlage ist es erforderlich, das Formular mit möglist allen relevanten Daten vollständig auszufüllen.') }}</p>
          <template v-if="isSubmitted && !hasErrors">
            <p class="message-success">{{ __('Vielen Dank, Ihre Angaben wurden übermittelt.') }}</p>
          </template>
          <template v-if="hasErrors">
            <p class="message-errors">{{ __('Es sind Fehler aufgetreten. Bitte überprüfen Sie ihre Eingaben!') }}</p>
          </template>
          <template v-if="isInvalid">
            <p class="message-errors">{{ __('Es konnte kein Formular gefunden werden!') }}</p>
          </template>
        </div>
      </page-intro>
      <article>

        <div :class="[!isSubmitted ? 'is-active' : '', 'commissioning-option']" data-row="subscription">
          <div :class="[errors.groups.subscription ? 'has-group-error' : '', '']">
            <button-toggle-section :title="this.__('Abonnement')" :target="'subscription'">
              <row-number :number="'1'"></row-number>
            </button-toggle-section>

            <div class="commissioning-option__content">
              <div class="option-elements">
                <div class="option-element">
                  <div :class="[errors.subscription ? 'has-error' : '', 'form-group']">
                    <header>
                      <h3>{{ __('Gewünschtes Abonnement') }}</h3>
                      <p>Informationen zu Abonnements und Preisen sind in der online verfügbaren <a href="https://mobilecharge.ch/de/preise" target="_blank">Preisliste</a> einsehbar.</p>
                    </header>
                    <div class="form-input sm:flex">
                      <div class="radio">
                        <button :class="[form.subscription == 'basic' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription', 'basic')">
                          <span>Basic</span>
                        </button>
                      </div>
                      <div class="radio">
                        <button :class="[form.subscription == 'connect' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription', 'connect')">
                          <span>Connect</span>
                        </button>
                      </div>
                      <div class="radio">
                        <button :class="[form.subscription == 'pay' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription', 'pay')">
                          <span>Pay</span>
                        </button>
                      </div>
                      <div class="radio">
                        <button :class="[form.subscription == 'pay+' ? 'is-selected' : '', '']"  @click.prevent="setProperty('subscription', 'pay+')">
                          <span>Pay+</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <template v-if="form.subscription === 'pay' || form.subscription === 'pay+'">
                    <div class="form-group">
                      <header>
                        <h3>{{ __('Bevorzugte Zahlungsweise für Abonnements') }}</h3>
                      </header>
                      <div :class="[errors.subscription_payment ? 'has-error' : '', 'form-input sm:flex']">
                        <div class="radio">
                          <button :class="[form.subscription_payment == 'rechnung' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription_payment', 'rechnung')">
                            <span>{{ __('Rechnung') }}</span>
                          </button>
                        </div>
                        <div class="radio">
                          <button :class="[form.subscription_payment == 'driver_pay' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription_payment', 'driver_pay')">
                            <span>{{ __('Driver Pay (Bezahlen via Ladetransaktion)') }}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>

                  <template v-if="form.subscription === 'pay+'">
                    <div class="form-group">
                      <header>
                        <h3>{{ __('Angaben zum Elektrizitätswerk und Stromprodukt') }}</h3>
                      </header>
                      <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap">
                        <div :class="[errors.subscription_payment_ew ? 'has-error' : '', 'sm:col-span-6 mb-16x sm:mb-0']">
                          <label for="subscription_payment_ew">{{ __('Elektrizitätswerk') }}*</label>
                          <input type="text" id="subscription_payment_ew" name="subscription_payment_ew" v-model="form.subscription_payment_ew" />
                        </div>
                        <div :class="[errors.subscription_payment_power_product ? 'has-error' : '', 'sm:col-span-6']">
                          <label for="subscription_payment_power_product">{{ __('Stromprodukt') }}*</label>
                          <input type="text" id="subscription_payment_power_product" name="subscription_payment_power_product" v-model="form.subscription_payment_power_product" />
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <header>
                        <h3>{{ __('Datum oder Periode der Inbetriebnahme') }}</h3>
                      </header>

                      <div :class="[errors.subscription_meter_type ? 'has-error' : '', 'form-input sm:flex']">
                        <div class="radio">
                          <button :class="[form.subscription_meter_type == 'new' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription_meter_type', 'new')">
                            <span>{{ __('Neuer Zähler') }}</span>
                          </button>
                        </div>
                        <div class="radio">
                          <button :class="[form.subscription_meter_type == 'existing' ? 'is-selected' : '', '']" @click.prevent="setProperty('subscription_meter_type', 'existing')">
                            <span>{{ __('Bestehender Zähler') }}</span>
                          </button>
                        </div>
                      </div>
                      <template v-if="form.subscription_meter_type == 'new'">
                        <div class="sm:grid sm:grid-cols-12 mt-24x">
                          <div :class="[errors.subscription_meter_commissioning_date ? 'has-error' : '', 'form-input sm:col-span-6']">
                            <label for="meter_commissioning_date">{{ __('Datum') }}</label>
                            <input type="date" id="subscription_meter_commissioning_date" name="subscription_meter_commissioning_date" v-model="form.subscription_meter_commissioning_date" />
                          </div>
                        </div>
                      </template>
                      <template v-else-if="form.subscription_meter_type === 'existing'">
                        <div class="sm:grid sm:grid-cols-12 sm:grid-gap mt-24x">
                          <div :class="[errors.subscription_meter_number ? 'has-error' : '', 'form-input sm:col-span-6']">
                            <label for="subscription_meter_number">{{ __('Zählernummer') }}</label>
                            <input type="text" id="subscription_meter_number" name="subscription_meter_number" v-model="form.subscription_meter_number" />
                          </div>
                          <div :class="[errors.subscription_meter_commissioning_quarter ? 'has-error' : '', 'form-input sm:col-span-6']">
                            <label for="subscription_meter_commissioning_quarter">{{ __('Quartal') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.subscription_meter_commissioning_quarter">
                                <option 
                                  v-for="quarter in quarters" 
                                  :value="quarter.key" 
                                  :key="quarter.key">
                                  {{ __(quarter.quarter) }} {{ quarter.year }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </template>
                      <div class="mt-32x lg:mt-56x">
                        <ul>
                          <li>{{ __('Melden Sie dem dem Elektrizitätswerk, dass die Ferratec Technics AG der Kunde des Emoblity-Zählers wird.') }}</li>
                          <template v-if="_getLocale() == 'de'">
                            <li>Lesen Sie die Vertragsbestimmungen zu <a href="/assets/mobilecharge/downloads/Nutzungsvertrag_mobilecharge.pdf" target="_blank">PAY+</a> durch.</li>
                          </template>
                          <template v-if="_getLocale() == 'en'">
                            <li>Read the contract terms for <a href="/assets/mobilecharge/downloads/Nutzungsvertrag_mobilecharge.pdf" target="_blank">PAY+</a>.</li>
                          </template>
                          <template v-if="_getLocale() == 'fr'">
                            <li>Lisez les conditions contractuelles pour <a href="/assets/mobilecharge/downloads/Nutzungsvertrag_mobilecharge.pdf" target="_blank">PAY+</a>.</li>
                          </template>
                          <template v-if="_getLocale() == 'it'">
                            <li>Leggere le condizioni contrattuali per <a href="/assets/mobilecharge/downloads/Nutzungsvertrag_mobilecharge.pdf" target="_blank">PAY+</a>.</li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </template>
                </div>  
              </div>
            </div>
          </div>
        </div>

        <div class="commissioning-option" data-row="location">
          <div :class="[errors.groups.location ? 'has-group-error' : '', '']">
            <button-toggle-section :title="this.__('Standort')" :target="'location'" :disabled="form.subscription === null ? true : false">
              <row-number :number="'2'"></row-number>
            </button-toggle-section>
            <div class="commissioning-option__content">
              <div class="option-elements">
                <div class="option-element">
                  <div class="form-group">
                    <header>
                      <h3>{{ __('Standort der Ladestation (Liegenschaftsadresse)') }}</h3>
                    </header>
                    <div :class="[errors.location_address ? 'has-error' : '', 'form-input']">
                      <label for="location_address">{{ __('Strasse, Nr.') }}*</label>
                      <input type="text" id="location_address" name="location_address" v-model="form.location_address" />
                    </div>
                    <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                      <div :class="[errors.location_zip ? 'has-error' : '', 'form-input sm:col-span-6 mb-16x sm:mb-0']">
                        <label for="location_zip">{{ __('PLZ') }}*</label>
                        <input type="text" id="location_zip" name="location_zip" v-model="form.location_zip" />
                      </div>
                      <div :class="[errors.location_city ? 'has-error' : '', 'form-input sm:col-span-6']">
                        <label for="location_city">{{ __('Ort') }}*</label>
                        <input type="text" id="location_city" name="location_city" v-model="form.location_city" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="commissioning-option" data-row="operator">
          <div :class="[errors.groups.operator ? 'has-group-error' : '', '']">
            <button-toggle-section :title="this.__('Betreiber')" :target="'operator'" :disabled="form.subscription === null ? true : false">
              <row-number :number="'3'"></row-number>
            </button-toggle-section>
            <div class="commissioning-option__content">
              <div class="option-elements">
                <div class="option-element">
                  <div class="form-group">
                    <header>
                      <h3>{{ __('Betreiber der Ladestation') }}</h3>
                    </header>
                    <div :class="[errors.operator ? 'has-error' : '', 'form-input sm:flex']">
                      <div class="radio">
                        <button :class="[form.operator == 'new' ? 'is-selected' : '', '']" @click.prevent="setProperty('operator', 'new')">
                          <span>{{ __('Neuer Betreiber') }}</span>
                        </button>
                      </div>
                      <div class="radio">
                        <button :class="[form.operator == 'existing' ? 'is-selected' : '', '']" @click.prevent="setProperty('operator', 'existing')">
                          <span>{{ __('Bereits Registriert') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <template v-if="form.operator === 'new' || form.operator === 'existing'">
                    <div class="form-group">
                      <template v-if="form.operator === 'new'">
                        <div :class="[errors.operator_company ? 'has-error' : '', 'form-input']">
                          <label for="operator_company">{{ __('Firma') }}*</label>
                          <input type="text" id="operator_company" name="operator_company" v-model="form.operator_company" />
                        </div>
                        <div :class="[errors.operator_contact ? 'has-error' : '', 'form-input']">
                          <label for="operator_contact">{{ __('Kontaktperson') }}*</label>
                          <input type="text" id="operator_contact" name="operator_contact" v-model="form.operator_contact" />
                        </div>
                        <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                          <div :class="[errors.operator_phone ? 'has-error' : '', 'form-input sm:col-span-6 mb-16x sm:mb-0']">
                            <label for="operator_phone">{{ __('Telefon') }}*</label>
                            <input type="text" id="operator_phone" name="operator_phone" v-model="form.operator_phone" />
                          </div>
                          <div :class="[errors.operator_email ? 'has-error' : '', 'form-input sm:col-span-6']">
                            <label for="operator_email">{{ __('E-Mail') }}*</label>
                            <input type="text" id="operator_email" name="operator_email" v-model="form.operator_email" />
                          </div>
                        </div>
                        <div :class="[errors.operator_address ? 'has-error' : '', 'form-input']">
                          <label for="operator_address">{{ __('Strasse, Nr.') }}*</label>
                          <input type="text" id="operator_address" name="operator_address" v-model="form.operator_address" />
                        </div>
                        <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                          <div :class="[errors.operator_zip ? 'has-error' : '', 'form-input sm:col-span-6 mb-16x sm:mb-0']">
                            <label for="operator_zip">{{ __('PLZ') }}*</label>
                            <input type="text" id="operator_zip" name="operator_zip" v-model="form.operator_zip" />
                          </div>
                          <div :class="[errors.operator_location ? 'has-error' : '', 'form-input sm:col-span-6']">
                            <label for="operator_location">{{ __('Ort') }}*</label>
                            <input type="text" id="operator_location" name="operator_location" v-model="form.operator_location" />
                          </div>
                        </div>
                      </template>
                      <template v-else-if="form.operator === 'existing'">
                        <div :class="[errors.operator_existing_company ? 'has-error' : '', 'form-input']">
                          <label for="operator_existing_company">{{ __('Firma') }}*</label>
                          <input type="text" id="operator_existing_company" name="operator_existing_company" v-model="form.operator_existing_company" />
                        </div>
                        <div class="form-input">
                          <label for="operator_existing_customer_number">{{ __('Kundennummer (Ferratec Technics)') }}</label>
                          <input 
                            type="text" 
                            id="operator_existing_customer_number" 
                            name="operator_existing_customer_number"
                            v-model="form.operator_existing_customer_number" />
                        </div>
                      </template>
                    </div>
                  </template>
                  <div class="form-group">
                    <header>
                      <h3>{{ __('Plattform Login mobilecharge.ch') }} <em>({{ __('Optional') }})</em></h3>
                    </header>
                    <div class="form-input">
                      <label for="operator_login_email">{{ __('E-Mail-Adresse(n)') }}</label>
                      <input
                      type="text" v-for="(email, index) in form.operator_login_email" 
                      :key="index" 
                      v-model="form.operator_login_email[index]"
                      class="mb-16x" />
                      <a href="" @click.prevent="addEmail('operator_login_email')" class="flex justify-center">
                        <icon-plus />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <template v-if="form.subscription !== 'basic'">
          <div class="commissioning-option" data-row="revenue">
            <div :class="[errors.groups.revenue ? 'has-group-error' : '', '']">
              <button-toggle-section :title="this.__('Einnahmen')" :target="'revenue'" :disabled="form.subscription === null ? true : false">
                <row-number :number="'4'"></row-number>
              </button-toggle-section>
              <template v-if="form.subscription !== 'pay+'">
                <div class="commissioning-option__content">
                  <div class="option-elements">
                    <div class="option-element">
                      <div class="mb-24x">
                        <p>{{ __('Für die Inbetriebnahme muss das Backend vorkonfiguriert werden. Erhalten wir bis zu 24 h vor der Inbetriebnahme keine Informationen, werden die folgenden Tarife eingestellt:') }}</p>
                        <ul>
                          <li>{{ __('Hochtarif: CHF 0.25 pro kWh (07.00 – 20.00 Uhr, ausser Sonntags)') }}</li>
                          <li>{{ __('Niedertarif: CHF 0.20 pro kWh (20.00 – 07.00 Uhr, Sonntags durchgehend)') }}</li>
                          <li>{{ __('Zusatztarif:  CHF 0.03 pro kWh') }}</li>
                        </ul>
                        <p>{{ __('Öffentlicher Ladepunkt / Direct Payment:') }}</p>
                        <ul>
                          <li>{{ __('Startgebühr: CHF 0.5 pro Transaktion') }}</li>
                          <li>{{ __('Zeitgebühr: CHF 0.5 pro Stunde') }}</li>
                          <li>{{ __('Zusatztarif: CHF 0.15 pro kWh') }}</li>
                        </ul>
                      </div>
                      <div class="form-group">
                        <header>
                          <h3>{{ __('Laden mit RFID Karte') }}</h3>
                        </header>
                        <div :class="[errors.rfid_tariff ? 'has-error' : '', 'form-input flex mb-24x']">
                          <div class="radio">
                            <button :class="[form.rfid_tariff == 'flat' ? 'is-selected' : '', '']" @click.prevent="setProperty('rfid_tariff', 'flat')">
                              <span>{{ __('Flat-Tarif') }}</span>
                            </button>
                          </div>
                          <div class="radio">
                            <button :class="[form.rfid_tariff == 'high_low' ? 'is-selected' : '', '']" @click.prevent="setProperty('rfid_tariff', 'high_low')">
                              <span>{{ __('Hoch-/Niedertarif') }}</span>
                            </button>
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.rfid_tariff == 'flat' || form.rfid_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="rfid_tariff_start">{{ __('Starttarif (CHF)') }}</label>
                            <input type="text" id="rfid_tariff_start" name="rfid_tariff_start" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_start" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="rfid_tariff_time">{{ __('Zeittarif (CHF/Std.)') }}</label>
                            <input type="text" id="rfid_tariff_time" name="rfid_tariff_time" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_time" />
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.rfid_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="rfid_tariff_high">{{ __('Hochtarif (CHF/kWh)') }}</label>
                            <input type="text" id="rfid_tariff_high" name="rfid_tariff_high" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_high" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="rfid_tariff_low">{{ __('Niedertarif (CHF/kWh)') }}</label>
                            <input type="text" id="rfid_tariff_low" name="rfid_tariff_low" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_low" />
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.rfid_tariff == 'flat' || form.rfid_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0" v-if="form.rfid_tariff == 'flat'">
                            <label for="rfid_tariff_flat">{{ __('Flat-Tarif (CHF/kWh)') }}</label>
                            <input type="text" id="rfid_tariff_flat" name="rfid_tariff_flat" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_flat" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="rfid_tariff_add">{{ __('Zusatztarif (CHF/kWh)') }}</label>
                            <input type="text" id="rfid_tariff_add" name="rfid_tariff_add" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.rfid_tariff_add" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <header>
                          <h3>{{ __('Laden via QR-Code (öffentliches Laden)') }}</h3>
                          <p>{{ __('Beim öffentlichen Ladenpunkt werden 10% der Transaktionsgebühr verrechnet. Mit dieser Gebühr werden die anfallenden Kosten gedeckt.') }}</p>
                        </header>
                        <div :class="[errors.qr_tariff ? 'has-error' : '', 'form-input flex mt-20x mb-24x']">
                          <div class="radio">
                            <button :class="[form.qr_tariff == 'flat' ? 'is-selected' : '', '']" @click.prevent="setProperty('qr_tariff', 'flat')">
                              <span>{{ __('Flat-Tarif') }}</span>
                            </button>
                          </div>
                          <div class="radio">
                            <button :class="[form.qr_tariff == 'high_low' ? 'is-selected' : '', '']" @click.prevent="setProperty('qr_tariff', 'high_low')">
                              <span>{{ __('Hoch-/Niedertarif') }}</span>
                            </button>
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.qr_tariff == 'flat' || form.qr_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="qr_tariff_start">{{ __('Starttarif (CHF)') }}</label>
                            <input type="text" id="qr_tariff_start" name="qr_tariff_start" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_start" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="qr_tariff_time">{{ __('Zeittarif (CHF/Std.)') }}</label>
                            <input type="text" id="qr_tariff_time" name="qr_tariff_time" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_time" />
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.qr_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="qr_tariff_high">{{ __('Hochtarif (CHF/kWh)') }}</label>
                            <input type="text" id="qr_tariff_high" name="qr_tariff_high" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_high" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="qr_tariff_low">{{ __('Niedertarif (CHF/kWh)') }}</label>
                            <input type="text" id="qr_tariff_low" name="qr_tariff_low" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_low" />
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap" v-if="form.qr_tariff == 'flat' || form.qr_tariff == 'high_low'">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0" v-if="form.qr_tariff == 'flat'">
                            <label for="qr_tariff_flat">{{ __('Flat-Tarif (CHF/kWh)') }}</label>
                            <input type="text" id="qr_tariff_flat" name="qr_tariff_flat" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_flat" />
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="qr_tariff_add">{{ __('Zusatztarif (CHF/kWh)') }}</label>
                            <input type="text" id="qr_tariff_add" name="qr_tariff_add" :placeholder="__('in CHF, z.B. 0.25')" v-model="form.qr_tariff_add" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group" v-if="form.rfid_tariff == 'high_low' || form.qr_tariff == 'high_low'">
                        <header>
                          <h3>{{ __('Zeiten Hochtarif') }}</h3>
                        </header>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_weekday_start_tariff_high">{{ __('Start Wochentag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_weekday_start_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_weekday_end_tariff_high">{{ __('Ende Wochentag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_weekday_end_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_saturday_start_tariff_high">{{ __('Start Samstag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_saturday_start_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_saturday_end_tariff_high">{{ __('Ende Samstag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_saturday_end_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-input sm:grid sm:grid-cols-12 sm:grid-gap">
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_sunday_start_tariff_high">{{ __('Start Sonntag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_sunday_start_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="form-input sm:col-span-6 mb-16x sm:mb-0">
                            <label for="time_sunday_end_tariff_high">{{ __('Ende Sonntag') }}</label>
                            <div class="select-wrapper is-full">
                              <select v-model="form.time_sunday_end_tariff_high">
                                <option v-for="time in times" :value="time.key" :key="time.key">
                                  {{ time.value }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="commissioning-option__content">
                  <div class="option-elements">
                    <div class="option-element">
                      <p>{{ __('Preise werden von Ferratec Technics AG festgelegt.') }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="commissioning-option" data-row="payouts">
            <div :class="[errors.groups.payouts ? 'has-group-error' : '', '']">
              <button-toggle-section :title="this.__('Auszahlungen')" :target="'payouts'" :disabled="form.subscription === null ? true : false">
                <row-number :number="'5'"></row-number>
              </button-toggle-section>
              <div class="commissioning-option__content">
                <div class="option-elements">
                  <div class="option-element">
                    <div class="form-group">
                      <header>
                        <h3>{{ __('Angaben bei Einnahmen durch Mobilecharge') }}</h3>
                      </header>
                      <div :class="[errors.finance_company ? 'has-error' : '', 'form-input']">
                        <label for="finance_company">{{ __('Firma') }}</label>
                        <input type="text" id="finance_company" name="finance_company" v-model="form.finance_company" />
                      </div>
                      <div :class="[errors.finance_address ? 'has-error' : '', 'form-input']">
                        <label for="finance_address">{{ __('Strasse, Nr.') }}</label>
                        <input type="text" id="finance_address" name="finance_address" v-model="form.finance_address" />
                      </div>
                      <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                        <div :class="[errors.finance_zip ? 'has-error' : '', 'form-input sm:col-span-6 mb-16x sm:mb-0']">
                          <label for="finance_zip">{{ __('PLZ') }}</label>
                          <input type="text" id="finance_zip" name="finance_zip" v-model="form.finance_zip" />
                        </div>
                        <div :class="[errors.finance_city ? 'has-error' : '', 'form-input sm:col-span-6']">
                          <label for="finance_city">{{ __('Ort') }}</label>
                          <input type="text" id="finance_city" name="finance_city" v-model="form.finance_city" />
                        </div>
                      </div>
                      <div :class="[errors.finance_bank ? 'has-error' : '', 'form-input']">
                        <label for="finance_bank">{{ __('Bank') }}</label>
                        <input type="text" id="finance_bank" name="finance_bank" v-model="form.finance_bank" />
                      </div>
                      <div :class="[errors.finance_bank_account ? 'has-error' : '', 'form-input']">
                        <label for="finance_bank_account">{{ __('Bankkonto') }}</label>
                        <input type="text" id="finance_bank_account" name="finance_bank_account" v-model="form.finance_bank_account" />
                      </div>
                      <div :class="[errors.finance_iban ? 'has-error' : '', 'form-input']">
                        <label for="finance_iban">{{ __('IBAN') }}</label>
                        <input type="text" id="finance_iban" name="finance_iban" v-model="form.finance_iban" />
                      </div>
                    </div>
                    <div class="form-group">
                      <header>
                        <h3>{{ __('E-Mail für Gutschriftsbeleg') }}</h3>
                      </header>
                      <div class="form-input">
                        <label for="operator_login_email">{{ __('E-Mail-Adresse(n)') }}</label>
                        <input
                        type="text" v-for="(email, index) in form.finance_credit_note_email" 
                        :key="index" 
                        v-model="form.finance_credit_note_email[index]"
                        class="mb-16x" />
                        <a href="" @click.prevent="addEmail('finance_credit_note_email')" class="flex justify-center">
                          <icon-plus />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="commissioning-option" data-row="users">
          <div :class="[errors.groups.users ? 'has-group-error' : '', '']">
            <button-toggle-section :title="this.__('Registrierte Fahrer')" :target="'users'" :disabled="form.subscription === null ? true : false">
              <row-number :number="form.subscription == 'basic' ? '4' : '6'"></row-number>
            </button-toggle-section>
            <div class="commissioning-option__content">
              <div class="option-elements">
                <div class="option-element">
                  <div class="form-group">
                    <header>
                      <h3>{{ __('Registrierte Fahrer der Ladestation') }}</h3>
                      <p>{{ __('Personen, die mit einer RFID-Karte für die Nutzung der Ladestation ausgestattet werden, sind hier aufzulisten.') }}</p>
                    </header>
                    <div class="mb-24x" v-for="(user, index) in form.users" :key="index">
                      <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                        <div :class="[errors.users[index] && errors.users[index].name ? 'has-error' : '', 'form-input sm:col-span-4']">
                          <label :for="`user_name_${index}`">{{ __('Vorname, Name') }}</label>
                          <input type="text" :id="`user_name_${index}`" v-model="form.users[index].name" />
                        </div>
                        <div :class="[errors.users[index] && errors.users[index].email ? 'has-error' : '', 'form-input sm:col-span-4']">
                          <label :for="`user_name_${index}`">{{ __('E-Mail') }}</label>
                          <input type="text" :id="`user_name_${index}`" v-model="form.users[index].email" />
                        </div>
                        <div :class="[errors.users[index] && errors.users[index].mobile ? 'has-error' : '', 'form-input sm:col-span-4']">
                          <label :for="`user_name_${index}`">Mobile</label>
                          <input type="text" :id="`user_name_${index}`" v-model="form.users[index].mobile" />
                        </div>
                      </div>
                      <div class="sm:grid sm:grid-cols-12 sm:grid-gap">
                        <div :class="[errors.users[index] && errors.users[index].qty_cards ? 'has-error' : '', 'form-input sm:col-span-4']">
                          <label :for="`user_name_${index}`">{{ __('RFID Karten (Stk.)') }}</label>
                          <input type="text" :id="`user_name_${index}`" v-model="form.users[index].qty_cards" />
                        </div>
                        <div class="form-input sm:col-span-4">
                          <label :for="`user_name_${index}`">{{ __('Parkplatz-Nummer') }}</label>
                          <input type="text" :id="`user_name_${index}`" v-model="form.users[index].no_parking" />
                        </div>
                        <div class="form-input flex items-end justify-start pb-16x sm:col-span-4">
                          <a href="" @click.prevent="removeUser(index)" class="btn-remove-user flex items-center">
                            <span>{{ __('Benutzer entfernen') }}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href="" @click.prevent="addUser()" class="flex justify-center">
                      <icon-plus />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="commissioning-option" data-row="contract">
          <div>
            <button-toggle-section :title="this.__('Vertrag')" :target="'contract'" :disabled="form.subscription == null ? true : false">
              <row-number :number="form.subscription == 'basic' ? '5' : '7'"></row-number>
            </button-toggle-section>
            <div class="commissioning-option__content">
              <div class="option-elements">
                <div class="option-element">
                  <div class="form-group">
                    <header>
                      <p>Nach dem <a href="https://mobilecharge.ch/assets/mobilecharge/downloads/Nutzungsvertrag_mobilecharge.pdf" target="_blank">Herunterladen</a> bitten wir um Ausfüllung und Unterzeichnung des Dokuments. Bitte laden Sie den unterzeichneten Vertrag anschließend wieder hoch.</p>
                    </header>
                  </div>
                  <div class="form-group">
                    <template v-if="form.contract && form.contract.uri">
                      <div class="flex">
                        <a :href="form.contract.uri" target="_blank">
                          <span>{{ __('Vertrag Anzeigen') }}</span>
                        </a>
                        <a href="javascript:;" @click.prevent="removeContract()" class="ml-12x is-dark">
                          <span>{{ __('Entfernen') }}</span>
                        </a>
                      </div>
                    </template>
                    <template v-else>
                      <div class="form-input">
                        <input type="file" id="contract" name="contract" @change="addFile()" />
                      </div>  
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </article>
      <page-footer>
        <template v-if="form.subscription">
          <a href="" @click.prevent="save()" data-target="lightbox" :class="[isLoading ? 'disabled' : '', 'btn-commissioning mt-24x sm:mt-0 is-secondary']">
            <span>{{ __('Formular speichern') }}</span>
          </a>
          <a href="javascript:;" @click.prevent="submit()" :class="[isLoading ? 'disabled' : '', 'btn-commissioning is-primary']">
            <span>{{ __('Formular absenden') }}</span>
          </a>
        </template>
      </page-footer>
    </div>
  </section>
</template>
<script>
import css from "@/global/config/css/classes.js";
import i18n from "@/global/mixins/i18n";
import helpers from "@/global/mixins/helpers";
import functions from "@/global/mixins/commissioning";
import store from '@/global/store-commissioning';
import LightboxSave from "@/global/components/commissioning/partials/LightboxSave.vue";
import IconPlus from "@/global/components/commissioning/icons/Plus.vue";
import IconMinus from "@/global/components/commissioning/icons/Minus.vue";
import PageIntro from "@/global/components/commissioning/layout/PageIntro.vue";
import ButtonToggleSection from "@/global/components/commissioning/partials/buttons/ButtonToggleSection.vue";
import RowNumber from "@/global/components/commissioning/partials/ui/RowNumber.vue";
import PageFooter from "@/global/components/commissioning/layout/PageFooter.vue";

export default {
  components: {
    PageIntro,
    PageFooter,
    LightboxSave,
    ButtonToggleSection,
    RowNumber,
    IconPlus,
    IconMinus
  },

  mixins: [i18n, helpers, functions],

  props: {
    uuid: {
      type: String,
      default: null
    }
  },

  data() {
    return {

      form: {
        subscription: null,
        subscription_payment: null,
        subscription_payment_ew: null,
        subscription_payment_power_product: null,
        subscription_meter_type: null,
        subscription_meter_commissioning_date: null,
        subscription_meter_commissioning_quarter: null,
        subscription_meter_number: null,
        location_address: null,
        location_zip: null,
        location_city: null,
        operator: null,
        operator_company: null,
        operator_contact: null,
        operator_phone: null,
        operator_email: null,
        operator_address: null,
        operator_zip: null,
        operator_location: null,
        operator_existing_company: null,
        operator_existing_customer_number: null,
        operator_login_email: [''],
        finance_company: null,
        finance_address: null,
        finance_zip: null,
        finance_city: null,
        finance_bank: null,
        finance_bank_account: null,
        finance_iban: null,
        finance_credit_note_email: [''],
        rfid_tariff: null,
        rfid_tariff_start: null,
        rfid_tariff_time: null,
        rfid_tariff_add: null,
        rfid_tariff_flat: null,
        rfid_tariff_high: null,
        rfid_tariff_low: null,

        qr_tariff: null,
        qr_tariff_start: null,
        qr_tariff_time: null,
        qr_tariff_add: null,
        qr_tariff_flat: null,
        qr_tariff_high: null,
        qr_tariff_low: null,

        time_weekday_start_tariff_high: '08:00',
        time_weekday_end_tariff_high: '18:00',
        time_saturday_start_tariff_high: '08:00',
        time_saturday_end_tariff_high: '18:00',
        time_sunday_start_tariff_high: '08:00',
        time_sunday_end_tariff_high: '18:00',

        users: [],

        contract: null,
      },

      errors: {
        groups: {
          subscription: false,
          location: false,
          operator: false,
          revenue: false,
          payouts: false,
        },
        subscription: false,
        subscription_payment: false,
        subscription_payment_ew: false,
        subscription_payment_power_product: false,
        subscription_meter_type: false,
        subscription_meter_commissioning_date: false,
        subscription_meter_commissioning_quarter: false,
        subscription_meter_number: false,
        location_address: false,
        location_zip: false,
        location_city: false,
        operator: false,
        operator_company: false,
        operator_contact: false,
        operator_phone: false,
        operator_email: false,
        operator_address: false,
        operator_zip: false,
        operator_location: false,
        operator_existing_company: false,
        operator_existing_customer_number: false,
        finance_company: false,
        finance_address: false,
        finance_zip: false,
        finance_city: false,
        finance_bank: false,
        finance_bank_account: false,
        finance_iban: false,
        rfid_tariff: false,
        rfid_tariff_start: false,
        rfid_tariff_time: false,
        rfid_tariff_add: false,
        rfid_tariff_flat: false,
        rfid_tariff_high: false,
        rfid_tariff_low: false,
        qr_tariff: false,
        users: [],
      },

      // css classes
      classes: css,

      // quarters
      quarters: [],

      // times
      times: [],

      // download url
      edit_url: '',

      // states
      isLoaded: true,
      isLoading: false,
      isSubmitted: false,
      isInvalid: false,
      hasTranslations: false,
      hasErrors: false,

      // store
      store: store,

      // routes
      routes: {
        submit: '/api/commissioning-form/store',
        save: '/api/commissioning-form/save',
        load: '/api/commissioning-form',
        deleteContract: '/api/commissioning-form/delete-contract'
      }
    };
  },

  mounted() {
    this.init();
    this.getQuarters();
    this.getTimes();
  },

  methods: {

    init() {
      if (this.uuid) {
        this.load();
      }
    },

    load() {
      this.isInvalid = false;
      this.isLoaded = false;
      this.axios.get(`${this.routes.load}/${this.uuid}`).then(response => {
        this.form.users = JSON.parse(response.data.users);
        for (let key in response.data) {
          if (key == 'users') {
            continue;
          }
          if (key == 'operator_login_email') {
            const emails = response.data[key].split(',');
            this.form[key] = emails;
            continue;
          }
          if (key == 'finance_credit_note_email') {
            const emails = response.data[key].split(',');
            this.form[key] = emails;
            continue;
          }
          if (key == 'subscription_meter_type') {
            this.setProperty('subscription_meter_type', response.data[key]);
            this.form[key] = response.data[key];
            continue;
          }
          this.form[key] = response.data[key];
        }
        this.isLoaded = true;
      }).catch(error => {
        this.isInvalid = true;
      });
    },

    submit() {
      this.isLoading = true;
      this.isSubmitted = false;
      // if uuid is set, update the form, add the uuid to the form
      if (this.uuid) {
        this.form.uuid = this.uuid;
      }

      // make the form multipart
      let formData = new FormData();
      for (let key in this.form) {
        // don't append empty fields
        if (key == 'users') {
          formData.append(key, JSON.stringify(this.form['users']));
        }
        else if (this.form[key] != null && this.form[key] != 'null' && this.form[key] != '') {
          formData.append(key, this.form[key]);
        }
      }
      this.axios.post(`${this.routes.submit}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        this.isLoading = false;
        this.handleValidationErrors(error.response.data);
      });
    },

    save() {
      this.isLoading = true;
      this.isSubmitted = false;

      // if uuid is set, update the form, add the uuid to the form
      if (this.uuid) {
        this.form.uuid = this.uuid;
      }

      // make the form multipart
      let formData = new FormData();
      for (let key in this.form) {
        // remove contract from form if null
        if (key == 'contract' && this.form[key] == null) {
          continue;
        }
        else if (key == 'users') {
          let users = this.form.users;
          formData.append(key, JSON.stringify(users));
        }
        else if (this.form[key] != null && this.form[key] != 'null' && this.form[key] != '') {
          formData.append(key, this.form[key]);
        }
      }

      this.axios.post(`${this.routes.save}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        this.isLoading = false;
        this.edit_url = response.data.edit_url;
        this.toggleLightbox();
      })
      .catch(error => {
        this.isLoading = false;
        this.handleValidationErrors(error.response.data);
      });
    },

    reset() {
      this.form = {
        subscription: null,
        subscription_payment: null,
        subscription_payment_ew: null,
        subscription_payment_power_product: null,
        subscription_meter_type: null,
        subscription_meter_commissioning_date: null,
        subscription_meter_commissioning_quarter: null,
        subscription_meter_number: null,
        location_address: null,
        location_zip: null,
        location_city: null,
        operator: null,
        operator_company: null,
        operator_contact: null,
        operator_phone: null,
        operator_email: null,
        operator_address: null,
        operator_zip: null,
        operator_location: null,
        operator_existing_company: null,
        operator_existing_customer_number: null,
        operator_login_email: [''],
        finance_company: null,
        finance_address: null,
        finance_zip: null,
        finance_city: null,
        finance_bank: null,
        finance_bank_account: null,
        finance_iban: null,
        finance_credit_note_email: [],
        rfid_tariff: null,
        rfid_tariff_start: null,
        rfid_tariff_time: null,
        rfid_tariff_add: null,
        rfid_tariff_flat: null,
        rfid_tariff_high: null,
        rfid_tariff_low: null,
        qr_tariff: null,
        qr_tariff_start: null,
        qr_tariff_time: null,
        qr_tariff_add: null,
        qr_tariff_flat: null,
        qr_tariff_high: null,
        qr_tariff_low: null,
        time_weekday_start_tariff_high: '08:00',
        time_weekday_end_tariff_high: '18:00',
        time_saturday_start_tariff_high: '08:00',
        time_saturday_end_tariff_high: '18:00',
        time_sunday_start_tariff_high: '08:00',
        time_sunday_end_tariff_high: '18:00',
        users: [],
        contract: null,
      };

      let elements = this.$el.querySelectorAll('.commissioning-option');
      elements.forEach(element => {
        element.classList.remove('is-active');
      });
    },

    /**
     * Set a property
     * @param string prop
     * @param string value
     * @return void
     */
     setProperty(prop, value) {
      this.form[prop] = this.form[prop] == value ? null : value;
      this.errors[prop] = false;
    },

    /**
     * Get quarters
     * @return array
     */
    getQuarters() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentQuarter = Math.floor(currentMonth / 3);
      this.quarters = []; // Assuming this.quarters is already defined in your class

      for (let i = 1; i <= 4; i++) {
        // Calculate the quarter and year for each of the next four quarters
        const quarterNumber = (currentQuarter + i) % 4;
        const quarterYear = currentYear + Math.floor((currentQuarter + i) / 4);
        const quarterI18N = this._getLocale() == 'de' ? 'Quartal' : this._getLocale() == 'en' ? 'Quarter' : this._getLocale() == 'fr' ? 'Trimestre' : 'Quartile';
        const quarterLabel = `${quarterNumber + 1}. ${quarterI18N}`;

        // Adjust the key and label based on the quarter and year
        this.quarters.push({
          key: 'q' + (quarterNumber + 1) + '_' + quarterYear,
          quarter: quarterLabel + ' ' + quarterYear,
          value: this.__(quarterLabel + ' ' + quarterYear)
        });
      }
    },

    /**
     * Get times
     * @return array
     */
    getTimes() {
      for (let i = 0; i < 24; i++) {
        const t = i < 10 ? '0' + i + ':00' : i + ':00';
        this.times.push({
          key: t,
          value: t
        });
      }
    },

    addFile() {
      let file = this.$el.querySelector('input[type="file"]').files[0];
      this.form.contract = file;
    },

    addEmail(field) {
      this.form[field].push('');
    },

    addUser() {
      const user = {
        name: null,
        email: null,
        mobile: null,
        qty_cards: null,
        no_parking: null
      };
      this.form.users.push(user);
    },

    removeUser(index) {
      this.form.users.splice(index, 1);
    },

    removeContract() {
      this.form.contract = null;
      this.axios.delete(`${this.routes.deleteContract}/${this.uuid}`).then(response => {
        console.log(response);
      });
    },

    handleValidationErrors(data) {
      let errors = [];
      for (let key in data.errors) {
        if (key.includes('users')) {
          // key looks like this: users.0.name
          // split the key by the dot
          let parts = key.split('.');
          // get the index of the user
          let index = parts[1];
          // get the field of the user
          let field = parts[2];

          // if the user does not exist, create it
          if (!this.errors.users[index]) {
            this.errors.users[index] = {};
          }

          // set the error
          this.errors.users[index][field] = data.errors[key][0]['error'];
        }
        else {
          this.errors[data.errors[key][0]['field']] = data.errors[key][0]['error'];
        }
        this.errors['groups'][data.errors[key][0]['group']] = true;
      }
      this.hasErrors = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleLightbox() {
      let lightbox = this.$el.querySelector('[data-lightbox="save"]');
      if (lightbox.classList.contains(this.classes.visible)) {
        lightbox.classList.remove(this.classes.visible);
      }
      else {
        lightbox.classList.add(this.classes.visible);
      }
    },
  },

  computed: {

  },

  watch: {
    'form.subscription': function (val) {

      if (val === 'basic' || val === 'connect' || val === 'pay') {
        this.form.subscription_payment = null;
        this.form.subscription_payment_ew = null;
        this.form.subscription_payment_power_product = null;
        this.form.subscription_meter_type = null;
        this.form.subscription_meter_commissioning_date = null;
        this.form.subscription_meter_commissioning_quarter = null;
        this.form.subscription_meter_number = null;
      }

      if (val === 'basic') {
        this.errors.groups.finance = false;
        this.form.finance_company = null;
        this.form.finance_zip = null;
        this.form.finance_city = null;
        this.form.finance_bank = null;
        this.form.finance_iban = null;
        this.form.finance_bank_account = null;
        this.form.qr_tariff = null;
        this.form.rfid_tariff = null;
        this.finance_credit_note_email = [''];
      }

      if (val === 'pay' || val === 'pay+') {
        this.form.subscription_payment = null;
        this.form.subscription_meter_type = null
      }

      this.hasErrors = false;
      this.isInvalid = false;

      // reset errors
      if (this.errors.groups.subscription) {
        this.errors.groups.subscription = false;
        this.errors.subscription_payment = false;
        this.errors.subscription_payment_ew = false;
        this.errors.subscription_payment_power_product = false;
        this.errors.subscription_meter_type = false;
        this.errors.subscription_meter_commissioning_date = false;
        this.errors.subscription_meter_commissioning_quarter = false;
        this.errors.subscription_meter_number = false;
      }
    },

    'form.subscription_payment': function (val) {
      this.errors.groups.subscription = false;
      // if (val === 'invoice') {
      //   this.form.subscription_payment_ew = null;
      //   this.form.subscription_payment_power_product = null;
      // }
      // if (val === 'driver_pay') {
      //   this.form.subscription_payment_ew = null;
      //   this.form.subscription_payment_power_product = null;
      // }
    },

    'form.subscription_payment_ew': function (val) {
      this.errors.groups.subscription = false;
      this.errors.subscription_payment_ew = false;
    },

    'form.subscription_payment_power_product': function (val) {
      this.errors.groups.subscription = false;
      this.errors.subscription_payment_power_product = false;
    },

    'form.subscription_meter_type': function (val) {
      if (val == 'new') {
        this.form.subscription_meter_commissioning_quarter = null;
        this.form.subscription_meter_number = null;
      }
      else if (val == 'existing') {
        this.form.subscription_meter_commissioning_date = null;
      }
    },

    'form.subscription_meter_commissioning_quarter': function (val) {
      this.errors.groups.subscription = false;
      this.errors.subscription_meter_commissioning_quarter = false;
    },

    'form.subscription_meter_number': function (val) {
      this.errors.groups.subscription = false;
      this.errors.subscription_meter_number = false;
    },

    'form.location_address': function (val) {
      this.errors.groups.location = false;
      this.errors.location_address = false;
    },

    'form.location_zip': function (val) {
      this.errors.groups.location = false;
      this.errors.location_zip = false;
    },

    'form.location_city': function (val) {
      this.errors.groups.location = false;
      this.errors.location_city = false;
    },

    'form.operator': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator = false;
      if (val == 'new') {
        this.form.operator_existing_company = null;
        this.form.operator_existing_customer_number = null;
      }
      if (val == 'existing') {
        this.form.operator_company = null;
        this.form.operator_contact = null;
        this.form.operator_phone = null;
        this.form.operator_email = null;
        this.form.operator_address = null;
        this.form.operator_zip = null;
        this.form.operator_location = null;
      }
    },

    'form.operator_company': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_company = false;
    },

    'form.operator_contact': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_contact = false;
    },

    'form.operator_phone': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_phone = false;
    },

    'form.operator_email': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_email = false;
    },

    'form.operator_address': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_address = false;
    },

    'form.operator_zip': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_zip = false;
    },

    'form.operator_location': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_location = false;
    },

    'form.operator_existing_company': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_existing_company = false;
    },

    'form.operator_existing_customer_number': function (val) {
      this.errors.groups.operator = false;
      this.errors.operator_existing_customer_number = false;
    },

    'form.finance_company': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_company = false;
    },

    'form.finance_address': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_address = false;
    },

    'form.finance_zip': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_zip = false;
    },

    'form.finance_city': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_city = false;
    },

    'form.finance_bank': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_bank = false;
    },

    'form.finance_bank_account': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_bank_account = false;
    },

    'form.finance_iban': function (val) {
      this.errors.groups.payouts = false;
      this.errors.finance_iban = false;
    },

    'form.rfid_tariff': function (val) {
      this.errors.groups.revenue = false;
      this.errors.rfid_tariff = false;
      this.errors.qr_tariff = false;
      if (val === 'flat') {
        this.form.rfid_tariff_flat = null;
        this.form.rfid_tariff_high = null;
        this.form.rfid_tariff_low = null;
      }
      else {
        this.form.rfid_tariff_flat = null;
        this.form.rfid_tariff_high = null;
        this.form.rfid_tariff_low = null;
      }
    },

    'form.qr_tariff': function (val) {
      this.errors.groups.revenue = false;
      this.errors.rfid_tariff = false;
      this.errors.qr_tariff = false;

      if (val === 'flat') {
        this.form.qr_tariff_flat = null;
        this.form.qr_tariff_high = null;
        this.form.qr_tariff_low = null;
      }
      else {
        this.form.qr_tariff_flat = null;
        this.form.qr_tariff_high = null;
        this.form.qr_tariff_low = null;
      }
    },
    'form.users': {
      handler: function (val) {
        this.errors.groups.users = false;
        this.errors.users = [];
      },
      deep: true
    }
  }
};
</script>