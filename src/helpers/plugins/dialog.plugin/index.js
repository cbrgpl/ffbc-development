import Controller from './controller.js'

export default {
  install: ( app, options ) => {
    app.config.globalProperties.dialog$ = new Controller()
  }
}
