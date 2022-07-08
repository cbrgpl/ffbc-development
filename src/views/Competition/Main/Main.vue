<template >
  <div class="mb-12" >
    <div class="icons-grid" >
      <span
        v-for="icon of icons"
        :key="icon"
        class="flex flex-col justify-center items-center" >
        <zIconBase
          width="24"
          height="24"
          :icon="icon" />
        {{ icon }}
      </span>
    </div>
  </div>
</template>

<script >
import icons from '@/enums/info/icons.js'

export default {
  name: 'Main',
  data () {
    return {
      icons,
    }
  }
}
</script>

<style lang="scss" >
.icons-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 35px;
  justify-items: center;
}
</style>
