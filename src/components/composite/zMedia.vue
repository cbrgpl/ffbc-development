<template >
  <component :is="mediaComponent" ></component>
</template>

<script>
import zImage from '@components/atomic/zImage.vue'
import zVideo from '@components/atomic/zVideo.vue'

export default {
  name: 'zMedia',
  props: {
    mediaType: {
      type: String,
      default: 'image',
      validator ( value ) {
        return [ 'image', 'video' ].includes( value )
      }
    }
  },
  computed: {
    mediaComponent () {
      return 'z' + this.mediaType.charAt( 0 ).toUpperCase() + this.mediaType.slice( 1 )
    }
  },
  components: {
    zImage,
    zVideo
  }
}
</script>

<style lang="scss" scoped>

</style>
