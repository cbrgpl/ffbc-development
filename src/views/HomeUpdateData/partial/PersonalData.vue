<template >
  <div class="bg-black-lighten rounded-lg px-12 py-12 lg:py-10 flex flex-col max-w-xl m-auto" >
    <zForm
      :vuelidate-object="v$"
      @validate="updateData" >

      <div class="w-full flex flex-col lg:flex-row justify-between" >
        <zInput
          class="personal-data__input lg:mr-8"
          on-error="The name must be greater than 2 characters"
          :error-state="v$.userData.firstName.$error"
          v-model.trim="userData.firstName"
          label="Name" />
        <zInput
          class="personal-data__input"
          on-error="The surname must be greater than 2 characters"
          :error-state="v$.userData.lastName.$error"
          v-model.trim="userData.lastName"
          label="Surname" />
      </div>

      <zInput
        class="personal-data__input"
        mask="+# (###) ###-##-##"
        on-error="Wrong phone format"
        :error-state="v$.userData.phoneNumber.$error"
        v-model="userData.phoneNumber"
        label="Phone Number" />
      <zInput
        class="personal-data__input"
        :error-state="v$.userData.birthDate.$error"
        v-model="userData.birthDate"
        on-error="Wrong date format"
        mask="####.##.##"
        label="year.mm.dd" />
      <div class="flex flex-col lg:flex-row items-stretch justify-between" >
        <zInput
          class="input--mb-0 lg:mr-8"
          :error-state="v$.userData.age.$error"
          on-error="You must be over 18 years old"
          v-model.number="userData.age"
          label="age" />

        <zLoaderButton
          type="submit"
          :loader="formLoader"
          class="mt-14 lg:mt-0 py-4 flex-grow"
          text="Update" />
      </div>
    </zForm>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { minLength, phone, date, adultDate, minValue } from '@validators'
import { userService } from '@services'
import { STATUS_WORDS } from 'consts'

export default {
  name: 'PersonalData',
  data () {
    return {
      userData: this.$store.getters[ 'user/userDataClone' ],
      formLoader: false,
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      userData: {
        firstName: {
          minLength: minLength( 2 ),
        },
        lastName: {
          minLength: minLength( 2 ),
        },
        phoneNumber: {
          phone,
        },
        birthDate: {
          date,
          adultDate,
        },
        age: {
          minValue: minValue( 18 ),
        }
      }

    }
  },
  methods: {
    async updateData ( status ) {
      if ( status === STATUS_WORDS.ERROR ) {
        return
      }

      this.formLoader = true
      const requestData = Object.assign( {}, this.userData )
      const updateResponse = await userService.edit( requestData, this.$store.getters[ 'token/access' ] )

      if ( updateResponse.response.status === 200 ) {
        this.$store.commit( 'user/setUserData', updateResponse.data )
        this.toast$.success( { summary: 'Data successfully updated' } )
      } else {
        this.toast$.error( { summary: 'Something went wrong...', detail: 'When we updated the data, something went wrong' } )
      }
      this.formLoader = false
    }
  }

}
</script>

<style lang="scss" scoped>
.personal-data__input {
  @apply mb-14;
}

</style>
