<template >
  <div class="flex flex-col text-white px-6" >
    <img
      class="bg-black rounded-full border-2 border-white border-solid mb-3"
      height="65"
      width="65"
      :src="getUserData.avatar"
      alt="" >
    <div class="flex justify-between" >
      <span >
        <h4 >{{ getUserData.callsign }}</h4>
        <h6 class="inline-block border-b border-current b-solid" >
          {{ getUserData.email }}
        </h6>
      </span>

      <!-- TODO Добавить ripple эффект -->
      <zIconBase
        v-if="isAuth"
        title="Sign Out"
        icon-name="logout"
        width="40"
        height="40" />
    </div>
  </div>
</template>

<script>
import zIconBase from '@components/composite/zIconBase.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( {
      isAuth: 'auth/isAuth',
    } ),
    getUserData () {
      return {
        avatar: this.isAuth ? require( '@images/avatar.jpg' ) : require( '@images/anonymous.svg' ),
        callsign: this.isAuth ? 'Dmitry Ponomaryov' : 'Anonymous user',
        email: this.isAuth ? 'cybirgpl@gmail.com' : 'noemail@gmail.com'
      }
    }
  },
  components: {
    zIconBase,
  },
}
</script>

<style lang="scss" scoped>

</style>
