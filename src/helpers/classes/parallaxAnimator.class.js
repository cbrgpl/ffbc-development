import DomHandler from '@classes/DomHandler.class'
// Я пожалуй этот пиздец нормально закоменчу, авось потом что-то доработать захочется
// Если хочешь стереть комменты, подумай об этом 10 раз! Если стираешь комменты без моего ведома - акстись

// returns value of px that was passed through the viewport
function getViewportPassedPx ( $el ) {
  const elBoundingRect = $el.getBoundingClientRect()
  return window.innerHeight - elBoundingRect.top
}

function getBaseShift ( $el ) {
  const wrapperHeight = $el.getBoundingClientRect().height
  const viewportPassedPx = getViewportPassedPx( $el )
  // if elem above
  if ( viewportPassedPx >= window.innerHeight + wrapperHeight ) {
    return window.innerHeight + wrapperHeight
  }
  // if elem below
  else if ( viewportPassedPx <= 0 ) {
    return 0
  }
  // if elem in viewport
  else {
    return viewportPassedPx
  }
}

// Калькулирует коэфицент жесткости, чтобы картинка не уезжала за видимую границу.
// Чем ближе одна из сторон(top, bottom) элемента-окна(по дефолту враппера)
// Тем меньшее число будет возвращаться вплоть до 0.000000000001
// direction is 1 || -1
function calculateHardnessCoef ( $el, imageShift, direction ) {
  const $parent = $el
  const $img = $el.querySelector( 'img' )
  const imgClientRect = $img.getBoundingClientRect()
  const parentClientRect = $parent.getBoundingClientRect()

  const imgOffsetTop = $parent.offsetTop - 0.5 * ( imgClientRect.height - parentClientRect.height ) + imageShift

  const distanceBtwTops = Math.abs( $parent.offsetTop - imgOffsetTop )
  const distanceBtwBottoms = Math.abs( ( $parent.offsetTop + parentClientRect.height ) - ( imgOffsetTop + imgClientRect.height ) )

  return direction === 1 ? distanceBtwBottoms / ( imgClientRect.height * 0.5 )
    : direction === -1 ? distanceBtwTops / ( imgClientRect.height * 0.5 )
      : false
}

export default class {
  constructor () {
    this.scrollingParent = null
    this.oldScrollTop = 0

    this.elementsYPoses = []
    this.elementsCounter = 0
  }

  effect ( $el, $nodes ) {
    $el.zEffectFunction = () => {
      if ( !this.ticking ) {
        window.requestAnimationFrame( () => {
          const scrollTop = this.scrollingParent.scrollTop

          // Расчитываю сколько было прокручено с прошлого ивента
          const scrollingShift = scrollTop - this.oldScrollTop

          $nodes.forEach( nodeParams => this._updateElement( nodeParams, scrollingShift ) )

          this.oldScrollTop = scrollTop
          this.ticking = false
        } )

        this.ticking = true
      }
    }

    this.scrollingParent.addEventListener( 'scroll', $el.zEffectFunction )
  }

  _updateElement ( nodeParams, scrollingShift ) {
    const $node = nodeParams.$node
    const speed = nodeParams.params.speed

    const elNum = $node._elemNumber

    const hardnessFactor = calculateHardnessCoef( $node, this.elementsYPoses[ elNum ], scrollingShift / Math.abs( scrollingShift ) )

    // Вместо того, чтобы картинка сдвигалась в одном синхронно всей страннице
    // Она сдвигается с небольшим сдвигом обратно
    this.elementsYPoses[ elNum ] -= scrollingShift * speed * hardnessFactor

    $node.querySelector( 'img' ).style.transform = `translate3d(0px, calc(50% + ${ this.elementsYPoses[ elNum ] }px), 0px) `
  }

  preproccess ( $el, $image ) {
    if ( this.scrollingParent === null ) {
      this.scrollingParent = DomHandler.getParent( $el, node => {
        const overflowY = window.getComputedStyle( node ).overflowY
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'
        return isScrollable & node.scrollHeight > node.clientHeight
      } )
    }

    this.oldScrollTop = this.scrollingParent.scrollTop

    const baseShift = -1 * getBaseShift( $image ) * $image.dataset.obsOptionSpeed
    $image._elemNumber = this.elementsCounter
    // Выбираем либо значение сдвига, либо половину высоты видимой части(потому что это максимальный сдвиг для картинки)
    // В зависимости от значения модуля baseShift; Если модуль больше - выбираем половину высоты, иначе сам baseShift
    this.elementsYPoses[ this.elementsCounter++ ] = Math.abs( baseShift ) > $image.offsetHeight * 0.5 ? -1 * $image.offsetHeight * 0.5 : baseShift

    const $img = $image.querySelector( 'img' )

    $img.style.position = 'absolute'
    $img.style.bottom = '50%'
    $img.style.transform = `translate3d(0px, calc(50% + ${ this.elementsYPoses[ $image._elemNumber ] }px), 0px)`
  }
}
