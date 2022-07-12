<template >
  <div class="flex flex-col" >
    <h4 class="mb-3" >
      Test page
    </h4>
  </div>
</template>

<script >
export default {
  name: 'Preview',
  data () {
    return {
      loading: true,
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.submitForm()
    },
  }

}
</script>

<style lang="scss" scoped >
</style>
