import MediaViewOverlayInterface from './mediaViewOverlayInterface'

export default {
  install: ( app ) => {
    app.config.globalProperties.mediaViewOverlay$ = MediaViewOverlayInterface
  }
}
