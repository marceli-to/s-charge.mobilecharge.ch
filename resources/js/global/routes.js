// Configurator
import ConfiguratorSingle from '@/global/components/ConfiguratorSingle.vue';
import ConfiguratorMultiple from '@/global/components/ConfiguratorMultiple.vue';
import ConfiguratorCorporate from '@/global/components/ConfiguratorCorporate.vue';
import ConfiguratorPublic from '@/global/components/ConfiguratorPublic.vue';
import CompareProducts from '@/global/components/CompareProducts.vue';
import Form from '@/global/components/Form.vue';
import CommissioningForm from '@/global/components/CommissioningForm.vue';

const routes = [
  {
    name: 'configurator-single',
    path: '/konfigurator/einzelstation',
    component: ConfiguratorSingle,
  },
  {
    name: 'configurator-multiple',
    path: '/konfigurator/mehrfamilienhaus',
    component: ConfiguratorMultiple,
  },
  {
    name: 'configurator-corporate',
    path: '/konfigurator/unternehmen-gastgewerbe',
    component: ConfiguratorCorporate,
  },
  {
    name: 'configurator-public',
    path: '/konfigurator/oeffentlich',
    component: ConfiguratorPublic,
  },
  {
    name: 'compare',
    path: '/konfigurator/produkte',
    component: CompareProducts,
  },
  {
    name: 'form',
    path: '/konfigurator/offerte-anfordern',
    component: Form,
  },

  {
    name: 'commissioning-form',
    path: '/formular-inbetriebnahme/:uuid?',
    component: CommissioningForm,
  },
];

export default routes;