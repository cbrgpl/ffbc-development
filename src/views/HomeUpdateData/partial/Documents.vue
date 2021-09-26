<template >
  <div class="w-full bg-black-lighten rounded-lg px-4 py-3" >
    <!-- upload card -->
    <h3 class="mb-4" >
      Upload documents
    </h3>

    <zInputFile
      @filesInputed="uploadDocuments"
      :max-files="3"
      :max-file-size="3145728"
      :file-formats="fileFormats"
      :loader="inputLoader" />

    <zSpacer :space="12" />
    <zDivider />
    <zSpacer :space="8" />

    <!-- documents photos -->

    <h3 class="mb-4" >
      Uploaded documents
    </h3>

    <zImagesCollection
      @loaded="disableCollectionLoader"
      :loader="collectionLoader"
      :images="documents"
      class="documents_images-grid" >
      <zDocumentImage
        v-for="src of documents"
        :key="src"
        class="documents__image"
        :src="src" />

    </zImagesCollection>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userService } from '@services'

import zImage from '@components/atomic/zImage.vue'
import zDocumentImage from '@components/composite/zDocumentImage.vue'
import zImagesCollection from '@components/atomic/zImagesCollection.vue'

export default {
  name: 'Documents',
  data () {
    return {
      fileFormats: [ 'image/jpg', 'image/jpeg', 'image/png' ],
      inputLoader: false,
      collectionLoader: true,
    }
  },
  computed: {
    ...mapGetters( {
      userData: 'user/userData',
      access: 'token/access',
      documents: [ 'user/documents' ]
    } ),
    images () {
      const srcs = []

      const randmizeSize = ( i ) => parseInt( Math.random() * 1000 )
      for ( let i = 0; i < 15; ++i ) {
        srcs.push( `https://picsum.photos/id/${ i }/${ randmizeSize() }/${ randmizeSize() }` )
      }

      return srcs
    },
  },
  methods: {
    disableCollectionLoader () {
      this.collectionLoader = false
    },
    checkFreeDocumentPlaces () {
      let i = 0

      if ( this.userData.documentPhotoOne === null ) {
        i++
      }
      if ( this.userData.documentPhotoTwo === null ) {
        i++
      }
      if ( this.userData.documentPhotoThree === null ) {
        i++
      }

      return i
    },
    getAvailDocumentKey () {
      const documentsKeys = Object.keys( this.userData ).filter( key => key.includes( 'documentPhoto' ) )

      for ( let i = 0; i < 3; ++i ) {
        /*
          1 - Аватар
          2 - Фото для документа(первое)
          3 - Фото для документа(второе)
          4 - Фото для документа(третье)
         */
        if ( this.userData[ documentsKeys[ i ] ] === null ) return i + 2
      }
    },
    uploadDocuments ( files ) {
      const availUploadDocuments = this.checkFreeDocumentPlaces()

      if ( ( files.length > availUploadDocuments ) || ( availUploadDocuments === 0 ) ) {
        this.toast$.error( { detail: 'Maximum number of documents 3. Remove one of the documents to load new documents' } )
        return
      }

      this.inputLoader = true
      for ( let i = 0; i < files.length; ++i ) {
        const type = this.getAvailDocumentKey() // 2 || 3 || 4

        const formData = new FormData()

        formData.append( 'image', files[ i ] )
        formData.append( 'image_type', type )

        this.uploadRequest( formData, type )
      }
    },
    async uploadRequest ( formData ) {
      const response = await userService.uploadDocument( formData, this.access )

      // TODO Доделать после того как аким пофиксит
      console.log( response )
    }
  },
  components: {
    zImage,
    zDocumentImage,
    zImagesCollection,
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.documents_images-grid) {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.documents__image {
  max-width: rem(320px);
  height: rem(300px);
}
</style>
