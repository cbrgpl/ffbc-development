<template >
  <div class="relative p-3" >
    <zMeasureForm
      @measureSubmit="updateData"
      title="Fill in the form"
      :measure-fields="measure.measureFields"
      :measure-field-component="$options.components.MeasureFieldInput" >
      <template #formActions >
        <zLoaderButton
          class="py-2 px-4 mt-5"
          :loader="loading" >
          Submit
        </zLoaderButton>
      </template></zMeasureForm>
  </div>
</template>

<script>
import zMeasureForm from '@/components/composite/zMeasureForm.vue'
import measure from '@enums/fake/measureExample'
import MeasureFieldInput from '@/components/composite/zMeasureFieldInput.vue'

export default {
  data () {
    return {
      visible: false,
      measure,
      loading: false,
    }
  },
  methods: {
    updateData ( measure ) {
      this.loading = true

      setTimeout( () => {
        this.loading = false
      }, 3000 )
    }
  },
  components: {
    zMeasureForm,
    MeasureFieldInput
  },
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  @apply h-64 w-full relative;
  clip-path: inset(0);

  &::after {
    @apply absolute z-20 w-full h-full;
    content: "";
  }
}

.preview__image {
  @apply z-10;
}
</style>
