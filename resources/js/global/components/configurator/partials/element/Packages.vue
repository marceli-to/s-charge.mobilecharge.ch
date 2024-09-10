<template>
  <div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>E-Mobility Abo</h3>
        Das E-Mobility Abo beinhaltet jährliche Wartung-und Prüfarbeiten an Ihrer Ladeinfrastruktur durch unseren Spezialisten Vorort. Stichworte: Sicherheit, optimale Wartung, Langlebigkeit, zuverlässige Funktion, Werterhaltung, ökologischer Betrieb, fix kalkulierbare Kosten
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'package_abo'"
          :data-prop="'package_abo'"
          :data-has-price="true"
          @click.prevent="setPackagePrice($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'package_abo'"
          :data-prop="'package_abo'"
          :data-has-price="true"
          ref="package_abo"
          @click.prevent="setPackagePrice($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>E-Mobility Plus (Garantieverlängerung)</h3>
        Keine Angst mehr vor Schäden und hohen Reparaturkosten – Im Reparaturfall übernehmen wir die anfallenden Kosten und stellen sicher, dass ihre Ladeinfrastruktur auch während der Reparaturzeit weiterhin einsatzbereit bleibt.
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'package_plus'"
          :data-prop="'package_plus'"
          :data-opts="1"
          :data-opts-default="'package_plus_4'"
          @click.prevent="setPackageProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'package_plus'"
          :data-prop="'package_plus'"
          :data-opts="0"
          :data-opts-default="false"
          ref="package_plus"
          @click.prevent="setPackageProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm is-option is-hidden" data-options="package_plus">
      <div class="span-6 align-center">
        <h3>Welches?</h3>
      </div>
      <div class="form-input select span-6 align-center justify-end:sm">
        <div class="select-wrapper is-wide">
          <select @change="setPackageOption($event, 'package_plus')" name="package_plus_option" :data-prop="'package_plus_option'">
            <option value="package_plus_4">E-Mobility Plus 4 Jahre</option>
            <option value="package_plus_6">E-Mobility Plus 6 Jahre</option>
            <option value="package_plus_8">E-Mobility Plus 8 Jahre</option>
            <option value="package_plus_10">E-Mobility Plus 10 Jahre</option>
          </select>
        </div>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm">
      <div class="span-8">
        <h3>E-Mobility Plus &amp; E-Mobility Abo – Das Rund um sorglos Paket</h3>
        Entscheiden Sie sich für maximale Sicherheit und Zuverlässigkeit mit der Kombination von E-Mobility Plus und E-Mobility Abo und profitieren Sie von einer 50.- Ermässigung.
      </div>
      <div class="form-input radio span-4 align-center justify-end:sm">
        <button
          value="1"
          :data-button="'package_combi'"
          :data-prop="'package_combi'"
          :data-opts="1"
          :data-opts-default="'package_combi_4'"
          @click.prevent="setPackageProperty($event)"
        >Ja</button>
        <button
          value="0"
          :data-button="'package_combi'"
          :data-prop="'package_combi'"
          :data-opts="0"
          :data-opts-default="false"
          ref="package_combi"
          @click.prevent="setPackageProperty($event)"
        >Nein</button>
      </div>
    </div>
    <div class="option-element grid-cols-12:sm is-option is-hidden" data-options="package_combi">
      <div class="span-6 align-center">
        <h3>Welches?</h3>
      </div>
      <div class="form-input select span-6 align-center justify-end:sm">
        <div class="select-wrapper is-wide">
          <select @change="setPackageOption($event, 'package_combi')" name="package_combi_option" :data-prop="'package_combi_option'">
            <option value="package_combi_4">E-Mobility Abo &amp; Plus (4 Jahre)</option>
            <option value="package_combi_6">E-Mobility Abo &amp; Plus (6 Jahre)</option>
            <option value="package_combi_8">E-Mobility Abo &amp; Plus (8 Jahre)</option>
            <option value="package_combi_10">E-Mobility Abo &amp; Plus (10 Jahre)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  methods: {
    setPackagePrice($event) {
      this.$parent.setPackagePrice($event);
    },
    setPackageProperty($event) {
      this.$parent.setPackageProperty($event);
    },
    setPackageOption($event, type) {
      this.$parent.setPackageOption($event, type);
    }
  },
}
</script>

