// components
import zButton from '@components/atomic/zButton.vue'
import zForm from '@components/atomic/zForm.vue'
import zSpacer from '@components/atomic/zSpacer.vue'

import zButtonIcon from '@components/composite/zButtonIcon.vue'
import zButtonLoader from '@components/composite/zButtonLoader.vue'
import zCheckboxMulti from '@components/composite/zCheckboxMulti.vue'
import zCheckboxSingle from '@components/composite/zCheckboxSingle.vue'
import zIconBase from '@components/composite/zIconBase.vue'
import zInput from '@components/composite/zInput.vue'

// directives
import autofocus from '@directives/autofucs.directive.js'
import lazyImage from '@directives/lazyImage.directive.js'
import tooltip from '@directives/tooltip.directive.js'

// plugins
import dialogPlugin from '@plugins/dialog.plugin'
import toastPlugin from '@plugins/toast.plugin'

export default {
  components: {
    zButton,
    zForm,
    zSpacer,
    zButtonIcon,
    zButtonLoader,
    zCheckboxMulti,
    zCheckboxSingle,
    zIconBase,
    zInput
  },
  directives: {
    lazyImage,
    tooltip,
    autofocus
  },
  plugins: {
    dialogPlugin,
    toastPlugin
  },
}
