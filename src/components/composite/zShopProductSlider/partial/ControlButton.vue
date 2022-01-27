<template >
  <button class="absolute bottom-2/4 transform translate-y-2/4 px-6 lg:px-4 h-full hover:bg-opacity-30 hover:bg-black transition-colors" >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ControlButton',
}
</script>

<style lang="scss" scoped>

</style>
