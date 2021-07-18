<template >
  <svg
    class="inline-block align-middle -mb-1"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation" >
    <title
      :id="iconName"
      lang="en" >{{ iconName }} icon</title>
    <g :fill="iconColor" >
      <component
        @icon-before-mount="viewBox = $event"
        :is="iconComponentName" ></component>
    </g>
  </svg>
</template>

<script>
// TODO Протестировать вариант с динамичной подгрузкой иконок, сравнить результаты с этим
import IconFitness from '@icons/IconFitness.vue'
import IconLogout from '@icons/IconLogout.vue'
import IconManageAccount from '@icons/IconManageAccount.vue'
import IconMenu from '@icons/IconMenu.vue'
import IconSettings from '@icons/IconSettings.vue'
import IconTicket from '@icons/IconTicket.vue'
import IconVisibility from '@icons/IconVisibility.vue'
import IconWarning from '@icons/IconWarning.vue'
import IconError from '@icons/IconError.vue'
import IconEvent from '@icons/IconEvent.vue'
import IconGallery from '@icons/IconGallery.vue'
import IconLogin from '@icons/IconLogin.vue'

const ableIcons = [
  'fitness',
  'logout',
  'manageAccount',
  'menu',
  'settings',
  'ticket',
  'visibility',
  'warning',
  'error',
  'event',
  'gallery',
  'login',
]

export default {
  name: 'zIconBase',
  data () {
    return {
      viewBox: '0 0 18 18'
    }
  },
  props: {
    iconName: {
      type: String,
      default: 'fitness',
      validator: ( value ) => ableIcons.includes( value )
    },
    width: {
      type: [ Number, String ],
      default: 18
    },
    height: {
      type: [ Number, String ],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    iconComponentName () {
      return 'Icon' + this.iconName.capitalize()
    }
  },
  components: {
    IconFitness,
    IconLogout,
    IconManageAccount,
    IconMenu,
    IconSettings,
    IconTicket,
    IconVisibility,
    IconWarning,
    IconError,
    IconEvent,
    IconGallery,
    IconLogin
  },
}
</script>

<style lang="scss" scoped>
</style>
