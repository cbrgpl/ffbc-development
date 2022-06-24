// components
import zButton from '@general_components/atomic/zButton.vue'
import zForm from '@general_components/atomic/zForm.vue'
import zSpacer from '@general_components/atomic/zSpacer.vue'
import zLink from '@general_components/atomic/zLink.vue'
import zLoader from '@general_components/atomic/zLoader.vue'
import zChip from '@general_components/atomic/zChip.vue'
import zTape from '@general_components/atomic/zTape.vue'
import zTabsNav from '@general_components/atomic/zTabNav.vue'
import zTimer from '@general_components/atomic/zTimer.vue'
import zToggle from '@general_components/atomic/zToggle.vue'
import zDivider from '@general_components/atomic/zDivider.vue'
import zActionButton from '@general_components/atomic/zActionButton.vue'
import zPseudoSelect from '@general_components/atomic/zPseudoSelect.vue'
import zIconBase from '@general_components/atomic/zIconBase.vue'
import zRadioButton from '@general_components/atomic/zRadioButton.vue'
import zSelect from '@general_components/atomic/zSelect.vue'

import zIconButton from '@general_components/composite/zIconButton.vue'
import zLoaderButton from '@general_components/composite/zLoaderButton.vue'
import zCheckboxMulti from '@general_components/composite/zCheckboxMulti.vue'
import zCheckboxSingle from '@general_components/composite/zCheckboxSingle.vue'
import zInput from '@general_components/composite/zInput.vue'
import zTooltipInput from '@general_components/composite/zTooltipInput/zTooltipInput.vue'
import zMedia from '@general_components/composite/zMedia.vue'
import zInputFile from '@general_components/composite/zInputFile.vue'
import zMediaWithTitle from '@general_components/composite/zMediaWithTitle.vue'
import zDialogNonLayoutWrapper from '@general_components/composite/zDialogNonLayoutWrapper.vue'

// directives
import autofocus from '@directives/autofucs.directive.js'
import lazyImage from '@directives/lazyImage.directive.js'
import tooltip from '@directives/tooltip.directive.js'

// plugins
import dialogPlugin from '@plugins/dialog.plugin'
import toastPlugin from '@plugins/toast.plugin'
import mediaViewOverlay from '@plugins/mediaViewOverlay/index'

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
      zTooltipInput,
      zMedia,
      zPseudoSelect,
      zDialogNonLayoutWrapper,
      zMediaWithTitle,
      zRadioButton,
      zSelect
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
      toastPlugin,
      mediaViewOverlay
    }
  }
}

export const registrateVueFunctionality = ( app ) => {
  for ( const functionalType in customFunctional ) {
    const functionalInner = customFunctional[ functionalType ]

    for ( const elementName in functionalInner.elements ) {
      const element = functionalInner.elements[ elementName ]
      functionalInner.registrator( app, element, elementName )
    }
  }
}
