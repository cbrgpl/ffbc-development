<template >
  <ul :class="[{'translate-y-full': !visible},'flex flex-col z-10 items-center rounded-tl-md rounded-tr-md absolute right-0 bottom-0 transform translate-x-full transition-transform duration-500 bg-black text-white border border-b-0 border-solid border-white border border-opacity-30 pt-3 pb-4 px-3']" >
    <router-link
      v-for="option in userNavigation"
      :key="option.name"
      v-tooltip.top.10="option.label"
      class="mb-3.5 last:mb-0 hover:text-secondary transition-colors "
      :to="{name: option.name}"
      exact-active-class="text-secondary" >
      <zIconBase
        :icon="option.iconName"
        height="30"
        width="30" />
    </router-link>
  </ul>
</template>

<script >
import userNavOptions from '@enums/nav/router.competitionsUser.options.js'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      userNavigation: userNavOptions
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
