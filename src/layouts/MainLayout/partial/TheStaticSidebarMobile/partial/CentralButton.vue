<template >
  <li class="self-stretch transform -translate-y-1/4" >
    <span
      ref="centralButton"
      @click="isIconsVisible = !isIconsVisible"
      class="relative bg-primary-darkest rounded-full flex cursor-pointer p-2.5" >
      <zIconBase
        :class="['m-auto transform transition-transform duration-200', doubleArrowClasses]"
        width="56"
        height="56"
        icon="doubleArrowUp" />

      <CentralButtonIcons
        :is-visible="isIconsVisible" />
    </span>
  </li>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CentralButton',
  data () {
    return {
      isIconsVisible: false,
    }
  },
  computed: {
    doubleArrowClasses () {
      return this.isIconsVisible ? '-translate-y-2' : ''
    },
  },
  mounted () {
    this.setBodyListener()
  },
  beforeDestroy () {
    document.body.removeEventListener( 'click', this.hideContainer )
  },
  methods: {
    setBodyListener () {
      document.body.addEventListener( 'click', this.hideContainer )
    },
    hideContainer ( event ) {
      if ( this.$refs.centralButton && !this.$refs.centralButton.contains( event.target ) ) {
        this.isIconsVisible = false
      }
    }
  },
  components: {
    CentralButtonIcons: defineAsyncComponent( () => import( './CentralButtonIcons.vue' ) )
  }
}
</script>

<style lang="scss">

</style>
