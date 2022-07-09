import Controller from './controller.js'

export default {
  install: ( app ) => {
    app.config.globalProperties.dialog$ = new Controller()
  }
}
