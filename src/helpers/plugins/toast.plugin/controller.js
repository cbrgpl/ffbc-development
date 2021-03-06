import { reactive } from 'vue'
import { arrayUtils } from '@js_utils'

const severity = {
  INFO: 'info',
  WARN: 'warning',
  ERR: 'error',
  SUCC: 'success'
}

export default class ToastController {
  constructor ( defaultLife = 3000 ) {
    this._toastCounter = 0
    this._toastList = reactive( [] )
    this._defaultLife = defaultLife
    this._SEVERITY = severity
  }

  warn ( { summary, detail, life } ) {
    return this._add( arguments[ 0 ], this._SEVERITY.WARN )
  }

  success ( { summary, detail, life } ) {
    return this._add( arguments[ 0 ], this._SEVERITY.SUCC )
  }

  error ( { summary, detail, life } ) {
    return this._add( arguments[ 0 ], this._SEVERITY.ERR )
  }

  info ( { summary, detail, life } ) {
    return this._add( arguments[ 0 ], this._SEVERITY.INFO )
  }

  remove ( id ) {
    arrayUtils.remove( this._toastList, ( el ) => el.id === id )
  }

  _add ( toastParams, severity ) {
    this._modifyParams( toastParams, severity )

    this._toastList.push( toastParams )

    return toastParams.id
  }

  _modifyParams ( userParams, severity ) {
    if ( !Object.keys( userParams ).includes( 'life' ) ) {
      userParams.life = this._defaultLife
    }
    userParams.severity = severity
    userParams.id = this._getUniqueID()
  }

  _getUniqueID () {
    return this._toastCounter++
  }
}
