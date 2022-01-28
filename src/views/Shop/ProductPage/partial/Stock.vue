<template >
  <div class="flex flex-col lg:max-h-screen lg:overflow-hidden" >
    <h4 class="text-left text-2xl underline mb-3" >
      Ready copies in stock:
    </h4>
    <div class="w-full flex-grow-1 overflow-auto" >
      <zTable class="w-full" >

        <zTr class="bg-black-primary" >
          <zTh >
            id
          </zTh>

          <zTh
            v-for="feature of featuresFake"
            :key="feature.name" >
            <div class="w-full h-full py-1 px-1.5" >
              <zFeatureIcon :feature-icon-data="feature" />
            </div>
          </zTh>

          <zTh >
          </zTh>
        </zTr>

        <tbody >
          <zTr
            v-for="copy of copiesFake"
            :key="copy.id" >
            <zTd >
              <span class="p-1.5" >
                {{ copy.id }}
              </span>
            </zTd>

            <zTd
              v-for="feature of copy.features"
              :key="copy.id + feature.name" >
              <div class="p-1.5 text-sm font-mono" >
                {{ feature.value }}
              </div>
            </zTd>

            <zTd >
              <div class="p-1.5" >
                <zButton
                  @click="buyStockCopy"
                  variant="ghost"
                  class="px-3 py-2" >
                  Buy
                </zButton>
              </div>
            </zTd>
          </zTr>
        </tbody>
      </zTable>
    </div>
  </div>
</template>

<script>
import { zTable, zTh, zTd, zTr } from '@components/composite/zTable'
import zFeatureIcon from '@components/atomic/zFeatureIcon.vue'

import featuresFake from '@enums/fake/features'
import copiesFake from '@enums/fake/copies'

export default {
  name: 'Stock',
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      featuresFake,
      copiesFake,
    }
  },
  methods: {
    buyStockCopy () {
      console.log( 'going to but stock copy' )
    }
  },
  components: {
    zTable,
    zTh,
    zTd,
    zTr,
    zFeatureIcon
  }
}
</script>

<style lang="scss" scoped>

</style>
