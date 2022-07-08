<template >
  <section >
    <h4
      v-if="title"
      class="mb-3" >
      {{ title }}
    </h4>

    <slot />
  </section>
</template>
<script >
export default {
  name: 'OrderDetailSection',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="" >

</style>
