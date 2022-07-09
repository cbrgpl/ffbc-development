<template >
  <label
    class="block"
    v-bind="wrapperAttrs" >
    <div class="relative" >
      <input
        v-mask="mask"
        placeholder=" "
        :class="['z-input', inputSizeClasses]"
        :value="modelValue"
        type="text"
        :data-error-state="errorState"
        v-bind="attrs"
        @input="emitModelValue" >

      <h5
        ref="inputLabel"
        class="z-input__label" >
        <zIconBrand
          v-if="icon"
          class="mr-2"
          width="25"
          height="25" />
        {{ label }}
      </h5>
    </div>

    <slot
      name="error-label"
      :error-state="errorState"
      :on-error="onError" >
      <small
        v-show="errorState"
        class="inline-block text-danger text-sm mt-2.5" >
        {{ onError }}
      </small>
    </slot>
  </label>
</template>

<script >
import { defineAsyncComponent } from 'vue'
import { mask } from '@directives/index.js'
import extenderMixin from '@mixins/extender.mixin.js'

import DomHandler from '@classes/DomHandler.class'

export default {
  name: 'ZInput',
  directives: {
    mask
  },
  components: {
    zIconBrand: defineAsyncComponent( () => import( '@general_components/composite/zBrandIcon.vue' ) ),
  },
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
  emits: [ 'update:modelValue' ],
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
  mounted () {
    this.setLabelBackground()
  },
  methods: {
    setLabelBackground ( ) {
      const $label = this.$refs.inputLabel

      const defaultBackgroundColor = 'rgba(0, 0, 0, 0)'

      const backgroundedParentsList = DomHandler.getParents( $label, ( $node ) => {
        return $node ? window.getComputedStyle( $node ).backgroundColor !== defaultBackgroundColor : false
      } )

      if ( backgroundedParentsList.length === 0 ) {
        return
      }

      const $closestBackgroundedParent = backgroundedParentsList.shift()

      $label.style.backgroundColor = window.getComputedStyle( $closestBackgroundedParent ).backgroundColor
    },
    emitModelValue ( event ) {
      this.$emit( 'update:modelValue', event.target.value )
    }
  },
}
</script>

<style lang="scss" scoped >
.z-input__label {
  @apply flex items-center text-placeholder bg-black-lighten cursor-pointer select-none leading-5
    absolute transform left-4 top-0 -translate-y-2/4 px-1 transition-all;
}

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

  &[data-error-state='true'] {
    @apply border-danger-darken border-opacity-80;
  }
}
</style>
