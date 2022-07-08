<template >
  <div class="chip flex items-center justify-center px-2 py-2 rounded-sm select-none" >
    <slot />
  </div>
</template>

<script >
export default {
  name: 'ZChip',
}

</script>

<style lang="scss" scoped >
.chip {
  min-width: rem(128px);
}

</style>
