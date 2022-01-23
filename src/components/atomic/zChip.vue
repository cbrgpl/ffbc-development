<template >
  <div class="chip flex items-center justify-center bg-primary text-white px-2 py-2 rounded-sm select-none" >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'zChip',
}

</script>

<style lang="scss" scoped>
.chip {
  min-width: rem(128px);
}

</style>
