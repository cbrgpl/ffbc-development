<template >
  <div class="mb-5" >
    <h5 class="mb-1 underline" >
      {{ title }}
    </h5>

    <ul >
      <li
        class="mb-2 last:mb-0"
        :key="infoInstance.label"
        v-for="infoInstance of info" >
        <strong > {{ infoInstance.label }}:&nbsp;</strong> {{ infoInstance.value }}
      </li>

      <slot name="sectionListEnd" />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DetailsYouSubsection',
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      tiype: Array,
      required: true,
    }
  }
}
</script>

<style lang="">

</style>
