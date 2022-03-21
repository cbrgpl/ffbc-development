<template >
  <label
    class="block"
    v-bind="wrapperAttrs" >
    <div :class="['relative'] " >
      <input
        placeholder=" "
        :class="['z-input', inputSizeClasses]"
        :value="modelValue"
        @input="emitModelValue"
        v-mask="mask"
        type="text"
        :data-error-state="errorState"
        v-bind="attrs" >

      <h5
        :ref="setLabelBackground"
        class="z-input__label" >
        <zIconBrand
          v-if="icon"
          class="mr-2"
          width="25"
          height="25" />
        {{ label }}
      </h5>
    </div>

    <small
      v-show="errorState"
      class="inline-block text-danger text-sm mt-2.5" >
      {{ onError }}
    </small>
  </label>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mask } from '@directives/index.js'
import extenderMixin from '@mixins/extender.mixin.js'

import DomHandler from '@classes/DomHandler.class'

export default {
  name: 'zInput',
  emits: [ 'update:modelValue' ],
  mixins: [ extenderMixin ],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [ String, Number ],
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    onError: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'base',
      validator ( value ) {
        return [ 'sm', 'base', 'lg' ].includes( value )
      }
    },
    mask: {
      type: [ String, Array ],
      default: ''
    },
    errorState: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputSizeClasses () {
      switch ( this.size ) {
      case 'sm':
        return 'px-2 py-1.5 text-sm'
      case 'lg':
        return ''
      default:
        return 'pl-4 py-3 pr-2'
      }
    }
  },
  methods: {
    setLabelBackground ( $label ) {
      if ( !$label ) {
        return
      }

      setTimeout( () => {
        const defaultBackgroundColor = 'rgba(0, 0, 0, 0)'

        const backgroundedParentsList = DomHandler.getParents( $label, ( $node ) => {
          return window.getComputedStyle( $node ).backgroundColor !== defaultBackgroundColor
        } )

        const $closestBackgroundedParent = backgroundedParentsList.shift()

        $label.style.backgroundColor = window.getComputedStyle( $closestBackgroundedParent ).backgroundColor
      }, 0 )
    },
    emitModelValue ( event ) {
      this.$emit( 'update:modelValue', event.target.value )
    }
  },
  directives: {
    mask
  },
  components: {
    zIconBrand: defineAsyncComponent( () => import( '@components/composite/zBrandIcon.vue' ) ),
  },
}
</script>

<style lang="scss" scoped>
.z-input {
  @apply bg-transparent border-2  border-primary-lighten border-solid
    text-white rounded-md cursor-pointer w-full;

  &:hover + .z-input__label {
    @apply text-primary-darken text-opacity-60;
  }

  &:focus {
    @apply ring-4 ring-primary ring-opacity-20;

    + .z-input__label {
      @apply text-primary;
    }
  }

  &:placeholder-shown + .z-input__label {
    @apply top-2/4 -translate-y-2/4;
  }

  &[data-error-state="true"] + .z-input__label {
    @apply text-danger-darken text-opacity-80;
  }
}

.z-input__label {
  @apply flex items-center text-placeholder bg-black-lighten cursor-pointer select-none leading-5
    absolute transform left-4 top-0 -translate-y-2/4 px-1 transition-all;
}

</style>
