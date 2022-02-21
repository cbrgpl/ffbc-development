<template >
  <div class="flex flex-col sm:flex-row" >
    <div class="mr-0 sm:mr-16  mb-5" >
      <h4 class="mb-1 underline" >
        Email:
      </h4>
      <zButton
        disabled
        class="locale-text-white px-3 py-1.5" >
        {{ email }}
      </zButton>
    </div>

    <ChangePasswordSection />

  </div>
</template>

<script>
import ChangePasswordSection from './partial/ChangePasswordSection.vue'

export default {
  name: 'UserAccount',
  computed: {
    email () {
      return this.$store.getters[ 'user/userData' ].email
    },
  },
  components: {
    ChangePasswordSection,
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.locale-text-white) {
  @apply text-white;
}
</style>
