import { reactive, computed, ref, watch } from 'vue'
import consoleLogger from '@classes/consoleLogger.class.js'

// TODO прокинуть app и взаимодействовать через него со всем остальным
export default class {
  constructor () {
    this._dialogue = reactive( {} )
  }

  register ( name ) {
    if ( this._exists( name ) ) {
      consoleLogger.error( `"${ name }"`, 'Dialog with name//already exists' )
      return
    }

    this._dialogue[ name ] = {
      visible: false,
      modal: true,
    }
  }

  show ( name, modal = true ) {
    this._existWithLog( name )
    const oldVisible = this._dialogue[ name ].visible

    this._dialogue[ name ].modal = !oldVisible && modal
    this._dialogue[ name ].visible = true
  }

  hide ( name ) {
    if ( !this._existWithLog( name ) ) return

    this._dialogue[ name ].visible = false
  }

  addWatcher ( dialogName, callback = ( unwatch ) => unwatch(), watcherOptions = {} ) {
    if ( !this._existWithLog( dialogName ) ) return

    const unwatch = ref( null )

    unwatch.value = watch(
      () => this._dialogue[ dialogName ].visible,
      ( newValue, oldValue ) => callback( newValue, unwatch.value ),
      watcherOptions
    )
  }

  _existWithLog ( name ) {
    if ( !this._exists( name ) ) {
      consoleLogger.warn( `"${ name }"`, 'Dialog with name//is not exists' )
      return false
    }

    return true
  }

  _exists ( name ) {
    const existsDialogue = this._getDialogNames().value

    return !!existsDialogue.includes( name )
  }

  _getDialogNames () {
    return computed( () => Object.keys( this._dialogue ) )
  }
}
