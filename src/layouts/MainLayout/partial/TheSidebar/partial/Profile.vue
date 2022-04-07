<template >
  <div class="flex flex-col text-white px-6" >
    <img
      class="bg-black h-16 w-16 rounded-full border-2 border-white border-solid mb-3"
      height="65"
      width="65"
      :src="getUserData.avatar"
      alt="" >
    <div class="flex items-center justify-between" >
      <span >
        <h4 >{{ getUserData.callsign }}</h4>
        <h6 class="inline-block border-b border-current b-solid" >
          {{ getUserData.email }}
        </h6>
      </span>

      <div
        class="border border-white border-solid border-opacity-40 cursor-pointer rounded-md p-1.5 transition-colors duration-300 hover:text-secondary"
        @click="logout"
        v-if="isAuth"
        v-tooltip.top="'Log out'" >
        <zIconBase
          title="Sign Out"
          icon="logout"
          width="32"
          height="32" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { authService } from '@services'

import { STORAGE_NAMES } from 'consts'

export default {
  computed: {
    ...mapGetters( {
      isAuth: 'auth/isAuth',
      userData: 'user/userData',
      tokens: 'token/tokens',
      fullName: 'user/fullName',
    } ),
    getUserData () {
      return {
        avatar: this.isAuth ? require( '@images/avatar.jpg' ) : require( '@images/anonymous.svg' ),
        callsign: this.isAuth ? this.fullName : 'Anonymous user',
        email: this.isAuth ? this.userData.email : 'noemail@gmail.com'
      }
    }
  },
  methods: {
    async logout () {
      const logoutResponse = await authService.logout( this.tokens )

      if ( logoutResponse.response.status === 204 ) {
        this.$store.commit( 'auth/setIsAuth', false )
        this.$store.commit( 'user/clearUserData' )
        localStorage.removeItem( STORAGE_NAMES.REFRESH_TOKEN )
        this.toast$.info( { summary: 'You left your account' } )
      } else {
        this.toast$.error( { summary: 'Something went wrong', detail: 'When trying to log out of the account, something went wrong. Please reload the page or try again later' } )
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
