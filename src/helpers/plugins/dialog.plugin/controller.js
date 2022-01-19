import { reactive, computed, ref, watch } from 'vue'
import { ArgError } from '@errors/argError'

export default class {
  constructor () {
    this._dialogs = reactive( {} )
  }

  register ( name ) {
    if ( this._exists( name ) ) {
      throw new ArgError( name, 'Dialog already exists' )
    }

    this._dialogs[ name ] = {
      visible: false,
      modal: true,
    }
  }

  show ( dialogName, modal = true ) {
    if ( !this._exists( dialogName ) ) {
      throw new ArgError( dialogName, 'Dialog does not exists' )
    }

    const oldVisible = this._dialogs[ dialogName ].visible

    this._dialogs[ dialogName ].modal = !oldVisible && modal
    this._dialogs[ dialogName ].visible = true
  }

  hide ( dialogName ) {
    if ( !this._exists( dialogName ) ) {
      throw new ArgError( dialogName, 'Dialog does not exists' )
    }

    this._dialogs[ dialogName ].visible = false
  }

  getDialogs () {
    return this._dialogs
  }

  addWatcher ( dialogName, watcher = ( unwatch ) => unwatch(), watcherOptions = {} ) {
    this._exists( dialogName )

    const unwatch = ref( null )

    unwatch.value = watch(
      () => this._dialogs[ dialogName ].visible,
      ( newValue, oldValue ) => watcher( newValue, oldValue ),
      watcherOptions
    )
  }

  _exists ( name ) {
    const existsDialogue = this._getDialogNames().value

    return !!existsDialogue.includes( name )
  }

  _getDialogNames () {
    return computed( () => Object.keys( this._dialogs ) )
  }
}
