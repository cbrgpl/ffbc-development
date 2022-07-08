<template >
  <div class="relative overflow-hidden select-none" >
    <ContentStrip
      :active-element="activeElementNumber"
      class="w-full h-full" >
      <slot />
    </ContentStrip>
    <ControlButton
      class="left-0"
      @click="showPreviousElement" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :height="attributableControlSize"
        :width="attributableControlSize"
        viewBox="0 0 24 24"
        fill="#ffffff" >
        <path
          d="M0 0h24v24H0z"
          fill="none" />
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </ControlButton>

    <ControlButton
      class="right-0"
      @click="showNextElement" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :height="attributableControlSize"
        :width="attributableControlSize"
        viewBox="0 0 24 24"
        fill="#ffffff" >
        <path
          d="M0 0h24v24H0z"
          fill="none" />
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </ControlButton>

    <!-- <div v-if="useNavigation" >
      <slot name="navigation" >
        <Navigation :images-count="imagesCount" />
      </slot>
    </div> -->
  </div>
</template>

<script >
import ControlButton from './partial/ControlButton'
import ContentStrip from './partial/ContentStrip.vue'
import Navigation from './partial/Navigation'

export default {
  name: 'ZSlider',
  components: {
    ControlButton,
    ContentStrip,
    Navigation
  },
  props: {
    attributableControlSize: {
      type: String,
      default: '25px'
    },
    useNavigation: {
      type: Boolean,
      default: true,
    },
    elementsCount: {
      type: Number,
      default: 0,
    },
  },
  emits: [ 'newActiveElementNumber' ],
  data () {
    return {
      activeElementNumber: 0,
    }
  },
  watch: {
    activeElementNumber: {
      handler ( newValue ) {
        this.$emit( 'newActiveElementNumber', newValue )
      },
      immediate: true
    }
  },
  methods: {
    showNextElement () {
      this.changeActiveElementNumber( 1 )
    },
    showPreviousElement () {
      this.changeActiveElementNumber( -1 )
    },
    changeActiveElementNumber ( delta ) {
      const maxActiveElementNumber = this.elementsCount - 1
      const minActiveElementNumber = 0

      if ( delta === 1 && this.activeElementNumber === maxActiveElementNumber ) {
        this.activeElementNumber = minActiveElementNumber
      } else if ( delta === -1 && this.activeElementNumber === minActiveElementNumber ) {
        this.activeElementNumber = maxActiveElementNumber
      } else {
        this.activeElementNumber += delta
      }
    },
  }
}
</script>

<style lang="scss" scoped >

</style>
