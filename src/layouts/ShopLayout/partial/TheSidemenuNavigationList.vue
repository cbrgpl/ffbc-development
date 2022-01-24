<template >
  <ul class="text-2xl select-none" >
    <li
      class="mb-1.5"
      v-for="(value, key) in navigationOptions"
      :key="key + value" >
      <slot
        :key="key"
        :value="value" ></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SidemenuNavigationList',
  props: {
    navigationOptions: {
      type: [ Array, Object ],
      required: true,
    }
  },
}
</script>

<style>

</style>
