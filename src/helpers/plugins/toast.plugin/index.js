import ToastController from './controller'

const toaster = new ToastController()

export default {
  install: ( app, options ) => {
    app.config.globalProperties.toast$ = toaster
  }
}
