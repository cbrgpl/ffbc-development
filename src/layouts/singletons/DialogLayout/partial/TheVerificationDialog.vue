<template >
  <zDialog class="verification-dialog w-11/12 sm:w-8/12 md:w-2/4 max-w-md" >
    <template #header >
      <h4 >Confirmation link</h4>
    </template>

    <div class="text-lg leading-tight mb-4" > The confirmation link was sent to <strong >{{ email }}</strong>, please confirm the mail before continuing

    </div>
    <template #footer >
      <div class="flex flex-col w-min ml-auto" >
        <zTimer
          :style="{'opacity': buttonDisabled & true}"
          class="items-center mb-1 opacity-0"
          :ref="timerRef"
          title="Send again in"
          title-styles="mr-2"
          :sec="60"
          @timeUp="unableButton" />
        <zLoaderButton
          @click="sendConfirmation"
          :disabled="buttonDisabled"
          :loader="buttonLoader"
          class="default-button" >
          Resend verification link
        </zLoaderButton>
      </div>
    </template>
  </zDialog>
</template>

<script>
import zDialog from '@general_components/composite/zDialog/zDialog.vue'
import zTimer from '@general_components/atomic/zTimer.vue'
import { authService } from '@services'

export default {
  timer: null,
  data () {
    return {
      email: localStorage.getItem( 'var_regEmail' ) || 'email@example.com',
      buttonDisabled: false,
      buttonLoader: false,
    }
  },
  methods: {
    async sendConfirmation () {
      if ( this.email === 'email@example.com' ) {
        this.toast$.warn( { summary: 'No e-mail specified', detail: 'You can’t send a confirmation link without an e-mail' } )
        return
      }

      this.buttonLoader = true

      const response = await authService.resendVerificationLink( { email: this.email, redirectUrl: 'verificate' } )
      this.buttonLoader = false

      if ( response.response.status === 200 ) {
        this.buttonDisabled = true
        this.toast$.success( { detail: 'The confirmation letter was sent!<br>If you can’t find the email, check out the spam' } )
        this.timer.startTimer()
      } else if ( response.response.status === 400 ) {
        this.toast$.error( { detail: 'Your mail has already been confirmed' } )
        this.dialog$.hide( 'verification' )
      }
    },
    timerRef ( el ) {
      this.timer = el
    },
    unableButton () {
      this.buttonDisabled = false
    }
  },
  components: {
    zDialog,
    zTimer
  },
}
</script>

<style lang="scss" scoped>
</style>
