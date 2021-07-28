import ObserverableController from '@/helpers/classes/observerableController.class'

/*
    Works with effect controllers with such Interface

    EffectController {
      effect($bindingEl, $observableNodes)
      preproccess($bindingEl, $singleObservableNode) - apply to every observableNode just after mounted
    }

    $observableNodes struct is
    {
      $node: Element,
      params: {}, - Object with 'data-obs-option-*' data attributies as props;
    }

    For Expamle data-obs-option-speed-mov transforms to ...params.speedMov
*/

export default {
  mounted ( $el, binding ) {
    if ( !( binding.value instanceof Function ) ) {
      for ( const node of $el.querySelectorAll( '[data-observable]' ) ) {
        binding.value.preproccess( $el, node )
      }
    } else {
      binding.value = {
        effect: binding.value
      }
    }

    const $observableElements = $el.querySelectorAll( '[data-observable]' )

    const controller = new ObserverableController( $el, binding.value )
    const observerCallback = ( entries, observer ) => {
      entries.forEach( entry => {
        if ( entry.isIntersecting ) {
          controller.addTarget( entry.target )
        } else {
          controller.removeTarget( entry.target )
        }
      } )
    }

    const observer = new IntersectionObserver( observerCallback )

    for ( const node of $observableElements ) {
      observer.observe( node )
    }
  },
  unmounted ( $el ) {
    $el.removeEventListener( 'scroll', $el.zEffectFunction )
  },
}
