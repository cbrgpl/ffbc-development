<template >
  <svg
    class="inline-block align-middle"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation" >
    <title
      v-if="isTitle"
      :id="iconName"
      lang="en" >{{ getTitle }}</title>
    <g :fill="iconColor" >
      <component
        @icon-before-mount="viewBox = $event"
        :is="iconComponentName" ></component>
    </g>
  </svg>
</template>

<script>
import ableIcons from '@/enums/info/icons.js'

// TODO Протестировать вариант с динамичной подгрузкой иконок, сравнить результаты с этим
import IconCatchingPokemon from '@icons/IconCatchingPokemon.vue'
import IconCleaningService from '@icons/IconCleaningService.vue'
import IconFitness from '@icons/IconFitness.vue'
import IconLogout from '@icons/IconLogout.vue'
import IconManageAccount from '@icons/IconManageAccount.vue'
import IconMenu from '@icons/IconMenu.vue'
import IconSettings from '@icons/IconSettings.vue'
import IconShare from '@icons/IconShare.vue'
import IconTicket from '@icons/IconTicket.vue'
import IconVisibility from '@icons/IconVisibility.vue'
import IconWarning from '@icons/IconWarning.vue'
import IconError from '@icons/IconError.vue'
import IconEvent from '@icons/IconEvent.vue'
import IconFire from '@icons/IconFire.vue'
import IconGallery from '@icons/IconGallery.vue'
import IconHistory from '@icons/IconHistory.vue'
import IconHome from '@icons/IconHome.vue'
import IconInterests from '@icons/IconInterests.vue'
import IconInventory from '@icons/IconInventory'
import IconLocation from '@icons/IconLocation'
import IconLogin from '@icons/IconLogin.vue'
import IconClose from '@icons/IconClose.vue'
import IconDoubleArrow from '@icons/IconDoubleArrow.vue'
import IconDoubleArrowUp from '@icons/IconDoubleArrowUp.vue'
import IconSignUp from '@icons/IconSignUp.vue'
import IconStorefront from '@icons/IconStorefront.vue'
import IconMessage from '@icons/IconMessage.vue'
import IconMicrowave from '@/components/icons/IconMicrowave.vue'
import IconSuccess from '@icons/IconSuccess.vue'
import IconFileUpload from '@icons/IconFileUpload.vue'
import IconCart from '@icons/IconCart.vue'
import IconUser from '@icons/IconUser.vue'
import IconBackArrow from '@icons/IconBackArrow.vue'

import { stringUtils } from '@js_utils'

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
    title: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    isTitle () {
      return this.title !== ''
    },
    iconComponentName () {
      return 'Icon' + stringUtils.capitalize( this.iconName )
    },
    getTitle () {
      return this.title || ( this.iconName + ' icon' )
    }
  },
  components: {
    IconCatchingPokemon,
    IconCleaningService,
    IconFitness,
    IconLogout,
    IconManageAccount,
    IconMenu,
    IconSettings,
    IconShare,
    IconTicket,
    IconVisibility,
    IconWarning,
    IconError,
    IconEvent,
    IconFileUpload,
    IconFire,
    IconGallery,
    IconHistory,
    IconHome,
    IconInterests,
    IconInventory,
    IconLocation,
    IconLogin,
    IconClose,
    IconDoubleArrow,
    IconDoubleArrowUp,
    IconSignUp,
    IconStorefront,
    IconMessage,
    IconMicrowave,
    IconSuccess,
    IconCart,
    IconUser,
    IconBackArrow
  },
}
</script>

<style lang="scss" scoped>
</style>
