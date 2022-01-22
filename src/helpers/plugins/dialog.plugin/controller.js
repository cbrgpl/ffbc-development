import { reactive, computed, ref, watch } from 'vue'
import { ArgError } from '@errors/argError'

export default class {
  constructor () {
    this._dialogs = reactive( {} )
  }

  register ( dialogName ) {
    this.checkDialogName( dialogName, 'Dialog already exists' )

    this._dialogs[ dialogName ] = {
      visible: false,
      modal: true,
    }
  }

  show ( dialogName, modal = true ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    const oldVisible = this._dialogs[ dialogName ].visible

    this._dialogs[ dialogName ].modal = !oldVisible && modal
    this._dialogs[ dialogName ].visible = true
  }

  hide ( dialogName ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    this._dialogs[ dialogName ].visible = false
  }

  getDialogs () {
    return this._dialogs
  }

  addWatcher ( dialogName, watcher = null, watcherOptions = {} ) {
    this.checkDialogName( dialogName, 'Dialog does not exists' )

    if ( typeof watcher !== 'function' ) {
      throw new TypeError( 'Dialog watcher must be callable' )
    }

    const unwatch = ref( null )

    unwatch.value = watch(
      () => this._dialogs[ dialogName ].visible,
      ( newValue, oldValue ) => watcher( { newValue, oldValue, unwatch } ),
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
