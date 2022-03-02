<template >
  <div class="flex flex-col items-stretch" >
    <div class="flex flex-col sm:flex-row items-stretch" >
      <!-- Короткие харки -->
      <div class="flex flex-col order-1 flex-shrink-0 sm:w-48" >
        <h3 class="underline mb-2" >
          Characteristics:
        </h3>
        <ul class="ml-3" >
          <li class="mb-2.5 relative" >
            <i class="font-sans font-semibold text-placeholder tracking-wide mr-1.5" >
              type:
            </i>
            <strong >
              {{ type.name }}
            </strong>
          </li>
          <li class="mb-2.5 relative" >
            <i class="font-sans font-semibold text-placeholder tracking-wide mr-1.5" >
              price:
            </i>
            <strong >
              ${{ price }}
            </strong>
          </li>
          <li class="relative" >
            <i class="block font-sans font-semibold text-placeholder tracking-wide mb-3" >
              Availiable Features:
            </i>

            <ul class="ml-3" >
              <li
                v-for="feature of features"
                :key="feature.id"
                class="product-feature mb-2" >
                {{ feature.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <zDivider class="order-2 my-6 sm:hidden" />
      <zDivider
        vertical
        class="order-2 mx-3 hidden sm:block xl:mx-6" />
      <div class="order-3" >
        <h3 class="underline mb-2" >
          Description:
        </h3>
        <p class="font-mono leading-5 text-lg" >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true,
    },
    type: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-feature {
  @apply flex items-center;

  &::before {
    @apply inline-block w-2 h-2 rounded-sm bg-primary-lightest mr-2;
    content: "";
  }
}
</style>
