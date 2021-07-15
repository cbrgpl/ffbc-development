
import { defineAsyncComponent } from 'vue'
// TODO SFE
export default function ( path ) {
  return defineAsyncComponent( () => {
    return import( path )
  }
  )
}
