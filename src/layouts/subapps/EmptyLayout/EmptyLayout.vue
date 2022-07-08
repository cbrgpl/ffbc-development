<template >
  <div class="layout-empty" >
    <slot >
      <router-view class="layout-content" />
    </slot>
  </div>
</template>

<script >
export default {
  name: 'LayoutEmpty'
}
</script>

<style lang="scss" scoped >
.layout-empty {
  width: 100%;
  height: 100%;
}
</style>
