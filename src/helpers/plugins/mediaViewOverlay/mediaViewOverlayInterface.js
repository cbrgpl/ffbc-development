import { ref } from 'vue'

const activeMediaInfo = ref( null )

export default class {
  static show ( mediaSrc, mediaType ) {
    activeMediaInfo.value = {
      src: mediaSrc,
      type: mediaType
    }
  }

  static getActiveMediaInfo () {
    return activeMediaInfo
  }

  static resetActiveMediaInfo () {
    activeMediaInfo.value = null
  }
}
