// components
import zButton from '@components/atomic/zButton.vue'
import zForm from '@components/atomic/zForm.vue'
import zSpacer from '@components/atomic/zSpacer.vue'
import zLink from '@components/atomic/zLink.vue'
import zLoader from '@components/atomic/zLoader.vue'
import zChip from '@components/atomic/zChip.vue'
import zTape from '@components/atomic/zTape.vue'
import zTabsNav from '@components/atomic/zTabsNav.vue'
import zTimer from '@components/atomic/zTimer.vue'
import zToggle from '@components/atomic/zToggle.vue'
import zDivider from '@components/atomic/zDivider.vue'
import zActionButton from '@components/atomic/zActionButton.vue'
import zInputFile from '@/components/composite/zInputFile.vue'

import zIconButton from '@components/composite/zIconButton.vue'
import zLoaderButton from '@components/composite/zLoaderButton.vue'
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

const customFunctional = {
  components: {
    registrator: ( app, component, componentName ) => app.component( componentName, component ),
    elements: {
      zButton,
      zForm,
      zSpacer,
      zIconButton,
      zLoaderButton,
      zCheckboxMulti,
      zCheckboxSingle,
      zIconBase,
      zInput,
      zLink,
      zLoader,
      zChip,
      zTape,
      zTabsNav,
      zTimer,
      zToggle,
      zDivider,
      zInputFile,
      zActionButton,
    }
  },
  directives: {
    registrator: ( app, directive, directiveName ) => app.directive( directiveName, directive ),
    elements: {
      lazyImage,
      tooltip,
      autofocus
    }

  },
  plugins: {
    registrator: ( app, plugin ) => app.use( plugin ),
    elements: {
      dialogPlugin,
      toastPlugin
    }
  }
}

export default ( app ) => {
  for ( const functionalType in customFunctional ) {
    const functionalInner = customFunctional[ functionalType ]

    for ( const elementName in functionalInner.elements ) {
      const element = functionalInner.elements[ elementName ]
      functionalInner.registrator( app, element, elementName )
    }
  }
}