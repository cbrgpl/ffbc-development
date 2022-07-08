<template >
  <zMedia
    ref="media"
    @loaded="toggleMediaLoaded" >
    <template #actions >
      <div
        v-if="showTitle"
        class="bg-black bg-opacity-40 coarse:opacity-100 opacity-0 hover:opacity-100 transition-opacity h-full w-full" >
        <div class="flex items-end break-all text-shadow h-full select-none py-3 px-2" >
          <slot name="title" >
            {{ title }}
          </slot>
        </div>
      </div>
    </template>
  </zMedia>
</template>

<script >
export default {
  name: 'ZMediaWithTitle',
  expose: [ 'startLoading' ],
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mediaLoaded: false,
    }
  },
  computed: {
    showTitle () {
      return this.title !== null && this.mediaLoaded
    },
  },
  methods: {
    // public
    startLoading () {
      this.$refs.media.startLoading()
    },
    // private
    toggleMediaLoaded () {
      this.mediaLoaded = true
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
