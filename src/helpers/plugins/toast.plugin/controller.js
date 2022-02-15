import { reactive } from 'vue'
import { arrayUtils } from '@js_utils'

const toastType = {
  INFO: 'info',
  WARN: 'warning',
  ERROR: 'error',
  SUCCESS: 'success'
}

export default class ToastController {
  constructor ( defaultToastLife = 3000 ) {
    this.toastCounter = 0
    this.toastList = reactive( [] )
    this.defaultToastLife = defaultToastLife
  }

  warn ( ...params ) {
    return this.add( ...params, toastType.WARN )
  }

  success ( ...params ) {
    return this.add( ...params, toastType.SUCCESS )
  }

  error ( ...params ) {
    return this.add( ...params, toastType.ERROR )
  }

  info ( ...params ) {
    return this.add( ...params, toastType.INFO )
  }

  getToastList () {
    return this.toastList
  }

  remove ( id ) {
    setTimeout( () => {
      arrayUtils.remove( this.toastList, ( el ) => el.id === id )
    }, 0 )
  }

  add ( toastParams, toastType ) {
    setTimeout( () => {
      this.modifyParams( toastParams, toastType )

      this.toastList.push( toastParams )
    }, 0 )

    return toastParams.id
  }

  modifyParams ( toastParams, toastType ) {
    toastParams.life = toastParams.life || this.defaultToastLife
    toastParams.toastType = toastType
    toastParams.id = this.getUniqueID()
  }

  getUniqueID () {
    return this.toastCounter++
  }
}
