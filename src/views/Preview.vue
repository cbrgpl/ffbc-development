<template >
  <div  >
    <zButton @click="reset" >
      reset
    </zButton>
    <zPaginationPage
      ref="paginationPage"
      :total-pages="totalPages"
      @setPage="generateContent"
      scroll-to-top >

      <div class="flex flex-wrap" >
        <div
          :key="i"
          v-for="i of products"
          class="flex items-center justify-center w-2/4 h-64 bg-black-lighten border border-solid border-black-lightest mb-3" >
          <span class="text-3xl" >
            {{ i }}
          </span>
        </div>
      </div>

    </zPaginationPage>
  </div>
</template>

<script>
import zPaginationPage from '@components/composite/zPaginationPage.vue'
import { ReactiveObserver } from '@/helpers/modules/reactiveObserver'

export default {
  name: 'Preview',
  reactiveObserver: new ReactiveObserver(),
  data () {
    return {
      products: [],
      totalPages: null
    }
  },
  methods: {
    generateContent ( page, perPage ) {
      this.$refs.paginationPage.setLoadingState( true )

      setTimeout( () => {
        const response = this.getProducts( page, perPage )
        this.$refs.paginationPage.setLoadingState( false )

        if ( response.errors ) {
          this.$refs.paginationPage.setFirstPage()
        } else {
          this.$refs.paginationPage.scrollToTop()

          this.products = response.products
          this.totalPages = response.totalPages
        }
      }, 800 + Math.random() * 2000 )
    },
    getProducts ( page, perPage ) {
      const totalPages = 20

      const arr = new Array( perPage ).fill( false )
      let i = 1 + page * perPage - perPage

      const products = arr.map( () => i++ )
      if ( page > totalPages ) {
        this.toast$.warn( { summary: 'Was not found', detail: `The page with number ${ page } is not exists` } )

        return {
          errors: [
            {
              message: 'Invalid page.',
              code: 'not_found'
            }
          ]
        }
      } else {
        return { products, totalPages }
      }
    },
    reset () {
      const reactiveObserver = this.$options.reactiveObserver

      reactiveObserver.reset()
    }
  },
  components: {
    zPaginationPage
  }

}
</script>

<style lang="scss" scoped>
</style>
