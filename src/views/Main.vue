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
        text="Authentificate thorugh ur location to perk g fmgk kkgkk fkfkdkf"
        v-tooltip.top.8="'Focus it and dont blur'" />

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

    <div class=" bg-black-lighten rounded-lg py-8 px-4 mb-6" >
      <h2 class="text-white font-medium mb-4" >
        Buttons with icon:
      </h2>
      <div class="inline-flex  overflow-x-auto py-6 px-2 w-full" >
        <zButtonIcon
          @click="isError1 = !isError1"
          class="main__button mr-4" >
          Press me press
        </zButtonIcon>
        <zButtonIcon
          @click="isError2 = !isError2"
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

    <div class=" bg-black-lighten rounded-lg py-8 px-4 mb-6" >
      <h2 class="text-white font-medium mb-4" >
        Form elements:
      </h2>
      <div class="inline-flex flex-col overflow-x-auto pb-6 w-full py-6 px-4" >
        <h2 class="text-white font-medium mb-4" >
          Inputs:
        </h2>
        <div class="flex" >
          <zInput
            v-model="dynamicVar"
            class="mr-4"
            label="Tooltip test"
            :error-state="isError1"
            on-error="Wrong email format"
            id="tooltiptest"
            v-tooltip.top.focus.8="'Focus it and dont blur'" />
          <zInput
            label="Input email"
            :error-state="isError2"
            icon
            on-error="Wrong email format"
            v-tooltip.top.8="'Focus it and dont blur'" />
          />
        </div>
      </div>

      <div class="inline-flex flex-col overflow-x-auto pb-6 w-full py-6 px-4" >
        <h2 class="text-white font-medium mb-4" >
          Checkboxes:
        </h2>
        <div class="flex justify-around" >
          <zCheckbox
            :checked="true"
            label="Make me checked" />
          <div class="flex space-x-6" >
            <zCheckboxMulti
              :checked="true"
              v-model="checkboxesArray"
              value="1"
              name="uou" />
            <zCheckboxMulti
              :checked="true"
              v-model="checkboxesArray"
              value="2"
              name="uou" />
            <zCheckboxMulti
              :checked="true"
              v-model="checkboxesArray"
              :value="3"
              name="uou" />
          </div>
        </div>

        <div
          @submit="testSubmit"
          class="inline-flex flex-col overflow-x-auto pb-6 w-full py-6 px-4" >
          <h2 class="text-white font-medium mb-4" >
            Form:
          </h2>
          <zForm
            :enterable="false"
            :vuelidate-object="v$.form"
            @submit="testForm" >

            <zToggle
              :model-value="true"
              value="qwewe" ></zToggle>

            <h1 class="mb-6 text-white" >
              Hey, can you identify urself?
            </h1>
            <zInput
              v-model.trim="form.name"
              class="mr-4 mb-10"
              label="Input Name"
              :error-state="v$.form.name.$error"
              on-error="Name is required" />
            <zInput
              v-model.trim="form.email"
              class="mr-4 mb-10"
              label="Email"
              icon
              :error-state="v$.form.email.$error"
              on-error="Wrong email format" />
            <zCheckboxSingle
              v-model="form.checkbox"
              class="mb-2"
              :error-state="v$.form.checkbox.$error"
              label="Make me checked" />
            <zButton
              type="submit"
              class="main__button" >
              Authentificate
            </zButton>
          </zForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { minLength, email, required } from '@vuelidate/validators'
// Components
import zButton from '@components/atomic/zButton.vue'

import zLoader from '@components/atomic/zLoader.vue'
import zButtonLoader from '@components/composite/zButtonLoader.vue'

import zIconBase from '@components/composite/zIconBase.vue'
import zBrandIcon from '@components/composite/zBrandIcon.vue'

import zButtonIcon from '@components/composite/zButtonIcon.vue'

import zInput from '@components/composite/zInput.vue'
import zCheckbox from '@components/atomic/zCheckbox.vue'
import zCheckboxMulti from '@components/composite/zCheckboxMulti.vue'
import zCheckboxSingle from '@components/composite/zCheckboxSingle.vue'

import zToggle from '@components/atomic/zToggle.vue'
import zForm from '@components/atomic/zForm.vue'

export default {
  name: 'Main',
  components: {
    zButton,

    zLoader,
    zButtonLoader,

    zIconBase,
    zBrandIcon,

    zButtonIcon,

    zInput,
    zCheckbox,
    zCheckboxMulti,
    zCheckboxSingle,
    zForm,
    zToggle,
  },
  data () {
    return {
      title: true,
      buttonLoader: false,
      isError1: false,
      isError2: false,
      dynamicVar: '',
      checkboxesArray: [ ],
      form: {
        email: '',
        name: '',
        checkbox: false,
      }
    }
  },
  setup () {
    return {
      v$: useValidate()
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength( 4 )
      },
      email: {
        required,
        email
      },
      checkbox: {
        truth: ( val ) => val
      }
    }
  },
  methods: {
    setButtonLoaderTimer () {
      this.buttonLoader = true

      setTimeout( () => {
        this.buttonLoader = false
      }, 3000 )
    },
    testForm () {
      // @keydown.enter.prevent="() => false"
      console.log( this.v$ )
      if ( this.v$.$error ) {
        return
      }

      console.log( 'Form is ok' )
    },
  },
}
</script>

<style lang="scss">
.main__button {
  @apply font-medium py-4 px-8;
}

</style>
