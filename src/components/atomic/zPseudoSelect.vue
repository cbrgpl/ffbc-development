<template >
  <div class="flex items-end border-b border-placeholder border-solid pb-1.5 select-none cursor-pointer" >
    <div class="flex flex-col flex-grow" >
      <h6 class="text-placeholder text-opacity-80" >
        {{ title }}
      </h6>
      <slot />
    </div>

    <div class="flex-shrink-0 w-8" >
      <zIconBase icon="code" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'zPseudoSelect',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
