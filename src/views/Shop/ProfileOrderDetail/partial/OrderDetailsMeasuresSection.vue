<template >
  <section class="mb-5 pb-2" >
    <h4 class="underline mb-2.5" >
      {{ name }}
    </h4>

    <ul >
      <li
        class="mb-1"
        v-for="measureFieldWithName of measureFieldsWithName"
        :key="measureFieldWithName.measureField.measureField" >
        <b >{{ measureFieldWithName.name }}:&nbsp;</b>
        <i >{{ measureFieldWithName.measureField.value }}</i>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'OrderDetailsMeasuresSection',
  props: {
    name: {
      type: String,
      required: true,
    },
    measureFields: {
      type: Array,
      required: true,
    }
  },
  computed: {
    measureFieldsWithName () {
      const getMeasureFieldWithName = this.$store.getters[ 'measure/measureFieldWithName' ]
      const getMeasureFieldId = ( measureField ) => measureField.measureField
      return this.measureFields.map( ( measureField ) => getMeasureFieldWithName( measureField, getMeasureFieldId ) )
    }
  }
}
</script>

<style lang="">

</style>
