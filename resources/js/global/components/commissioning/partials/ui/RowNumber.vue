<template>
  <div>
    <span>{{number}}</span>
    <icon-check></icon-check>
  </div>
</template>
<script>
import IconCheck from "@/global/components/commissioning/icons/Check.vue";
export default {
  components: {
    IconCheck
  },
  props: {
    number: String,
  },
}
</script>
