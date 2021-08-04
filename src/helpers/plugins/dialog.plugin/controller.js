import { reactive, computed } from 'vue'

export default class {
  constructor () {
    this._dialogue = reactive( {} )
  }

  register ( name ) {
    if ( this._exists( name ) ) {
      console.error( `Dialog with name "${ name }" already exists` )
      return
    }

    this._dialogue[ name ] = false
  }

  show ( name ) {
    this._existWithLog( name )

    this._dialogue[ name ] = true
  }

  hide ( name ) {
    this._existWithLog( name )

    this._dialogue[ name ] = false
  }

  _existWithLog ( name ) {
    if ( !this._exists( name ) ) {
      console.warn( `Dialog with name "${ name }" was added dynamicly` )
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
