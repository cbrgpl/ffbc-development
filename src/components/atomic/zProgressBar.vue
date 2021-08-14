<template >
  <span
    class="progress-bar bg-black-lightest" >
    <div
      ref="bar"
      :style="{width: progress + '%'}"
      class="progress-bar__progress" ></div>
  </span>
</template>

<script>
import { watch, computed, ref } from 'vue'
export default {
  emits: [ 'finish', 'stop' ],
  name: 'zProgressBar',
  props: {
    progress: {
      type: Number,
      required: true,
    },
    background: {
      type: String,
      default: 'transparent',
    },
    overrun: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
      default: 'current'
    }
  },
  setup ( props, context ) {
    const validateProgress = ( progress ) => progress >= 0 && progress <= max.value
    const max = computed( () => 100 + props.overrun )
    const bar = ref( null )

    const unwatch = watch(
      () => props.progress,
      ( newValue ) => {
        if ( !validateProgress( newValue ) ) { console.warn( `Progress with value ${ newValue } in not valid;\n Valid range [0, ${ max.value }]` ) }

        if ( newValue >= 100 ) {
          context.emit( 'stop' )
          bar.value.addEventListener( 'transitionend', ( e ) => {
            context.emit( 'finish' )
          }, { once: true } )
          unwatch()
        }
      }
    )

    return { bar }
  },
}
</script>

<style lang="scss" scoped>
.progress-bar {
  @apply w-full overflow-hidden;
}

.progress-bar__progress {
  @apply w-0 h-full bg-current transition-all duration-200 ease-linear;
}
</style>
