<template >
  <div class="mb-12" >
    Main
    <div class="block overflow-x-auto pb-6 w-full bg-black-lighten rounded-lg py-8 px-4 mb-6" >
      <h2 class="text-white font-medium mb-4" >
        Buttons:
      </h2>

      <zButton
        @click="title = !title"
        class="main__button mr-4"
        text="Authentificate thorugh ur location to perk g fmgk kkgkk fkfkdkf" />

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
    <div class="flex flex-col bg-black-lighten rounded-lg py-8 px-4 mb-6" >
      <h2 class="text-white font-medium mb-4" >
        Loader:
      </h2>
      <div class="mb-10" >
        <zLoader
          class="p-4"
          :height="128"
          :width="128"
          :title="true"
          background />
      </div>

      <div class="flex overflow-x-auto pb-6 w-full" >
        <zButtonLoader
          @click="setButtonLoaderTimer"
          :loader="true"
          class="main__button mr-4"
          text="MyButton "
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

    <div class="bg-black-lighten rounded-lg py-8 px-4 mb-8" >
      <h2 class="text-white font-medium mb-4" >
        Icons:
      </h2>
      <div class="inline-flex overflow-x-auto pb-6 w-full" >
        <zBrandIcon
          class="mr-4"
          height="45"
          width="45" />

        <zIconBase
          icon-name="manageAccount"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="logout"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="menu"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="settings"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="ticket"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="visibility"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="warning"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="error"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="event"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="gallery"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

        <zIconBase
          icon-name="login"
          width="45"
          height="45"
          class="text-secondary hover:text-secondary-darken contrast-50 transition-colors duration-400 ease-linear cursor-pointer mr-4" />

      </div>
    </div>

    <div class=" bg-black-lighten rounded-lg py-8 px-4" >
      <h2 class="text-white font-medium mb-4" >
        Buttons with icon:
      </h2>
      <div class="inline-flex w-full pb-6 overflow-x-auto pb-6 w-full" >
        <zButtonIcon class="main__button mr-4" >
          Press me press
        </zButtonIcon>
        <zButtonIcon
          shrink
          shrink-breakpoint="sm"
          variant="ghost"
          class="main__button mr-4" >
          Press me press
        </zButtonIcon>
        <zButtonIcon
          variant="sky"
          class="main__button mr-4" >
          Press me press
        </zButtonIcon>
        <zButtonIcon
          variant="danger"
          class="main__button mr-4" >
          Press me press
        </zButtonIcon>
        <zButtonIcon
          variant="safety"
          class="main__button mr-4" >
          Press me press
        </zButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
import zButton from '@components/atomic/zButton.vue'

import zLoader from '@components/atomic/zLoader.vue'
import zButtonLoader from '@components/composite/zButtonLoader.vue'

import zIconBase from '@components/composite/zIconBase.vue'
import zBrandIcon from '@components/composite/zBrandIcon.vue'

import zButtonIcon from '@components/composite/zButtonIcon.vue'

export default {
  name: 'Main',
  components: {
    zButton,

    zLoader,
    zButtonLoader,

    zIconBase,
    zBrandIcon,

    zButtonIcon,
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
