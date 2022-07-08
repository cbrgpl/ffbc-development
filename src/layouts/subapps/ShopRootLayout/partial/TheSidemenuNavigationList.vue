<template >
  <ul class="text-xl select-none" >
    <li
      v-for="(value, key) in navigationOptions"
      :key="key"
      class="mb-1.5" >
      <slot
        :value="value" />
    </li>
  </ul>
</template>

<script >
export default {
  name: 'SidemenuNavigationList',
  props: {
    navigationOptions: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style >

</style>
