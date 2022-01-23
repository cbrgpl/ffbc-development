<template >
  <ul >
    <li
      class="flex items-center mb-2"
      v-for="validation of validations"
      :key="validation" >
      <span class="w-2 h-2 bg-danger-darken rounded-sm mr-1.5" ></span>
      {{ validation }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'zValidationList',
  props: {
    validations: {
      type: Array,
    }
  },
}
</script>

<style>

</style>
