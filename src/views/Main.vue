<template >
  <div >
    Main
    <div class="block bg-black-lighten rounded-lg py-8 px-4 mb-6" >
      <h2 class="text-white font-medium mb-4" >
        Buttons:
      </h2>

      <zButton
        @click="title = !title"
        class="main__button mr-4"
        text="Authentificate" />

      <zButton
        variant="ghost"
        class="main__button mr-4"
        text="Knocke" />

      <zButton
        variant="sky"
        class="main__button mr-4"
        text="Leave me" />

      <zButton
        variant="danger"
        class="main__button mr-4"
        text="Beware!" />

      <zButton
        variant="safety"
        class="main__button mr-4"
        text="Beware!" />
    </div>
    <div class="bg-black-lighten rounded-lg py-8 px-4" >
      <h2 class="text-white font-medium mb-4" >
        Loader:
      </h2>
      <div class="inline-flex  justify-between flex-col" >
        <div class="mr-4 mb-10" >
          <zLoader
            class="p-4"
            :height="128"
            :width="128"
            :title="true"
            background />
        </div>

        <div class="flex" >
          <zButtonLoader
            @click="setButtonLoaderTimer"
            :loader="true"
            class="main__button mr-4"
            text="MyButton"
            variant="brick" ></zButtonLoader>

          <zButtonLoader
            @click="setButtonLoaderTimer"
            :loader="true"
            class="main__button mr-4"
            text="MyButton"
            variant="ghost" ></zButtonLoader>

          <zButtonLoader
            @click="setButtonLoaderTimer"
            :loader="true"
            class="main__button mr-4"
            text="MyButton"
            variant="sky" ></zButtonLoader>

          <zButtonLoader
            @click="setButtonLoaderTimer"
            :loader="true"
            class="main__button mr-4"
            text="MyButton"
            variant="danger" ></zButtonLoader>

          <zButtonLoader
            @click="setButtonLoaderTimer"
            :loader="true"
            class="main__button mr-4"
            text="MyButton"
            variant="safety" ></zButtonLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zButton from '@components/atomic/zButton.vue'
import zLoader from '@components/atomic/zLoader.vue'
import zButtonLoader from '@components/composite/zButtonLoader.vue'

export default {
  name: 'Main',
  components: {
    zButton,
    zLoader,
    zButtonLoader,
  },
  data () {
    return {
      title: true,
      buttonLoader: false,
    }
  },
  methods: {
    setButtonLoaderTimer () {
      console.log( 'click' )
      this.buttonLoader = true

      setTimeout( () => {
        this.buttonLoader = false
      }, 3000 )
    }
  },
}
</script>

<style lang="scss">
.main__button {
  @apply font-medium py-4 px-8;
}
</style>
