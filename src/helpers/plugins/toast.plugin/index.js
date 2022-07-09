import ToastController from './controller'

const toaster = new ToastController()

export default {
  install: ( app ) => {
    app.config.globalProperties.toast$ = toaster
  }
}
