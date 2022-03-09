<template >
  <zMedia >
    <template #actions >
      <div
        class="bg-black bg-opacity-40 coarse:opacity-100 opacity-0 hover:opacity-100 transition-opacity h-full w-full"
        v-if="title !== null" >
        <div class="flex items-end break-all text-shadow h-full select-none py-3 px-2" >
          <slot name="title" >
            {{ title }}
          </slot>

        </div>
      </div>
    </template>
  </zMedia>
</template>

<script>
export default {
  name: 'zMediaWithTitle',
  props: {
    title: {
      type: String,
      default: null
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
