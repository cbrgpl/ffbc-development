<template >
  <label
    :class="{'pointer-events-none': loader}"  >
    <input
      class="absolute -top-96 -left-96 -translate-y-96 -translate-x-96"
      ref="input"
      @change="handleSelectedFiles"
      multiple
      type="file" >
    <span
      :disabled="loader"
      class="relative inline-flex items-stretch justify-start border border-solid border-black rounded-md cursor-pointer bg-primary-darken bg-opacity-30 hover:bg-opacity-80 transition-colors overflow-hidden mb-3" >
      <span class="p-4" >
        Upload files
      </span>
      <span class="flex items-center justify-center bg-primary-darken bg-opacity-80 px-2" >
        <zIconBase
          :width="28"
          :height="28"
          icon="fileUpload" />
      </span>
      <div
        v-if="loader"
        class="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50 flex" >
        <zLoader
          class="m-auto"
          :width="48"
          :height="48" />
      </div>
    </span>

    <zFilesList :file-names="fileNames" />
  </label>
</template>

<script>
import zFilesList from '@general_components/atomic/zFilesList.vue'
import zLoader from '@general_components/atomic/zLoader.vue'

export default {
  name: 'zInputFile',
  props: {
    fileFormats: {
      type: Array,
      default () {
        return []
      }
    },
    maxFiles: {
      type: Number,
      default: -1,
    },
    maxFileSize: {
      type: Number,
      default: -1,
    },
    names: {
      type: Boolean,
      default: true
    },
    loader: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      fileNames: []
    }
  },
  computed: {
    ableFormats () {
      return this.fileFormats.reduce( ( str, type ) => str + type + ' ', '' )
    }
  },
  methods: {
    async handleSelectedFiles ( ) {
      this.filesNames = []
      const selectedFiles = this.$refs.input.files
      this.$refs.input.value = ''

      selectedFiles.some = Array.prototype.some
      selectedFiles.every = Array.prototype.every
      selectedFiles.reduce = Array.prototype.reduce

      if ( this.maxFiles !== -1 && selectedFiles.length > this.maxFiles ) {
        this.toast$.error( { summary: `Upload limit ${ this.maxFiles }` } )

        return
      }

      if ( this.maxFileSize !== -1 && selectedFiles.some( ( file ) => file.size > this.maxFileSize ) ) {
        this.toast$.error( { summary: 'File size limit exceeded ', detail: `Maximum size of uploaded file ${ this.maxFileSize / 1024 / 1024 }MB` } )
      }

      if ( !selectedFiles.every( ( file ) => this.fileFormats.some( ( type ) => file.type === type ) ) ) {
        this.toast$.error( {
          summary: 'Error while trying to upload file',
          detail: `The data type of one of the files does not match what is expected. Available file types:
          <strong>${ this.ableFormats }</strong>`
        } )

        return
      }

      this.$emit( 'filesInputed', selectedFiles.reduce( ( accumulator, currentValue ) => {
        this.fileNames.push( currentValue.name )
        accumulator.push( currentValue )
        return accumulator
      }, [] ) )
    },
  },
  components: {
    zFilesList,
    zLoader,
  }
}
</script>

<style lang="scss" scoped>

</style>
