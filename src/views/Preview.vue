<template >
  <div class="relative p-3" >
    <div class="w-96 " >
      <zSelect
        class="w-36"
        v-model="selectedItem"
        :list="list"
        :item-accesser="(item) => item.num" >

        <template #visible="{ value }" >

          <div class="px-5" >
            {{ value }}
          </div>
        </template>

      </zSelect>
    </div>
  </div>
</template>

<script>
import zSelect from '@components/atomic/zSelect.vue'

export default {
  data () {
    return {
      visible: false,
      loading: false,
      list: [
        {
          num: 'one',
        },
        {
          num: 'two',
        },
        {
          num: 'three',
        },
        {
          num: 'four',
        },
        {
          num: 'five',
        },
        {
          num: 'six',
        },
      ],
      selectedItem: null,
    }
  },
  methods: {
  },
  components: {
    zSelect
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
