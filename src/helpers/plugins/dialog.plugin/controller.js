import { reactive, computed, ref, watch } from 'vue'
import { ArgError } from '@errors'

export default class {
  constructor () {
    this._dialogs = reactive( {} )
    this._dialogParam = ref( null )
    this._removeBuffer = reactive( [] )
  }

  register ( dialogName ) {
    if ( this._exists( dialogName ) ) {
      throw new ArgError( dialogName, 'Dialog already exists' )
    }

    this._dialogs[ dialogName ] = {
      visible: false,
      modal: true,
    }
  }

  getDialogParam ( ) {
    return this._dialogParam
  }

  show ( dialogName, param = null, modal = true ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    this._dialogParam.value = param

    const oldVisible = this._dialogs[ dialogName ].visible

    this._dialogs[ dialogName ].modal = !oldVisible && modal
    this._dialogs[ dialogName ].visible = true
  }

  close ( dialogName ) {
    this._removeBuffer.pop()

    this._dialogs[ dialogName ].visible = false
  }

  hide ( dialogName ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    this._removeBuffer.push( dialogName )
  }

  getDialogs () {
    return this._dialogs
  }

  getRemoveBuffer () {
    return this._removeBuffer
  }

  addWatcher ( dialogName, watcherCallback, watcherOptions = {} ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    if ( typeof watcherCallback !== 'function' ) {
      throw new TypeError( 'Dialog watcher must be callable' )
    }

    const unwatch = ref( null )

    unwatch.value = watch(
      () => this._dialogs[ dialogName ].visible,
      ( newValue, oldValue ) => watcherCallback( { newValue, oldValue, unwatch } ),
      watcherOptions
    )
  }

  checkDialogName ( dialogName, message ) {
    if ( !this._exists( dialogName ) ) {
      throw new ArgError( dialogName, message )
    }
  }

  _exists ( name ) {
    const existsDialogue = this._getDialogNames().value

    return !!existsDialogue.includes( name )
  }

  _getDialogNames () {
    return computed( () => Object.keys( this._dialogs ) )
  }
}
