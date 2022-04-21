<template >
  <div class="layout-empty" >
    <slot >
      <router-view />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'layout-empty'
}
</script>

<style lang="scss" scoped>
.layout-empty {
  width: 100%;
  height: 100%;
}
</style>
