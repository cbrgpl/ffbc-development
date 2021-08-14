import { reactive } from 'vue'

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
    this._add( arguments[ 0 ], this._SEVERITY.WARN )
  }

  success ( { summary, detail, life } ) {
    this._add( arguments[ 0 ], this._SEVERITY.SUCC )
  }

  error ( { summary, detail, life } ) {
    this._add( arguments[ 0 ], this._SEVERITY.ERR )
  }

  info ( { summary, detail, life } ) {
    this._add( arguments[ 0 ], this._SEVERITY.INFO )
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

  remove ( id ) {
    this._toastList.removeCallback( ( el ) => el.id === id )
  }

  _getUniqueID () {
    return this._toastCounter++
  }
}
