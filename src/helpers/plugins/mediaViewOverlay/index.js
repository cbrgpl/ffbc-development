import MediaViewOverlayInterface from './mediaViewOverlayInterface'

export default {
  install: ( app, options ) => {
    app.config.globalProperties.mediaViewOverlay$ = MediaViewOverlayInterface
  }
}
