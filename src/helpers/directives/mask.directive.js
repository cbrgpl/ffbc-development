import Inputmask from 'inputmask'
/*

    9 : numeric
    a : alphabetical
    * : alphanumeric

Для обозначения постфикса используется <>
Пример строки "7 (923) 000-05-20 Рублей"
{7} (000) 000-00-00< Рублей>
*/

function getExpressionParams ( expression ) {
  const modificator = expression.match( /<.*>/g ) || []

  return {
    expression: expression.replace( modificator, '' ),
    modificator: modificator[ 0 ] ? '\\' + modificator[ 0 ].replace( /<|>/g, '' ) : ''
  }
}

function getMask ( maskFormat ) {
  if ( Array.isArray( maskFormat ) ) {
    return maskFormat
  } else {
    const expressionParams = getExpressionParams( maskFormat )
    return expressionParams.expression + expressionParams.modificator
  }
}

export default {
  mounted: function ( $el, binding ) {
    const maskFormat = binding.value

    if ( maskFormat.length === 0 ) {
      // mask disabled, so simply fire modified-input
      $el.addEventListener( 'input', () => {
        $el.dispatchEvent( new CustomEvent( 'modified-input' ), { bubbles: true } )
      } )

      return
    }

    const maskOptions = {
      mask: getMask( maskFormat ),
      placeholder: '',
      showMaskOnHover: false,
      showMaskOnFocus: false,
      isComplete: function () {
        $el.dispatchEvent( new CustomEvent( 'modified-input' ), { bubbles: true } )
      }
    }

    Inputmask( maskOptions ).mask( $el )
  }
}
