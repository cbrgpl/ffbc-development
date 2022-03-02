<template >
  <div class="flex flex-col lg:max-h-screen lg:overflow-hidden" >
    <template
      v-if="!productsInventoryEmpty" >
      <h4 class="text-left text-2xl underline mb-3" >
        Ready copies in stock:
      </h4>
      <div class="w-full flex-grow-1 overflow-auto" >
        <zTable
          class="w-full" >

          <zTr class="bg-black-primary" >
            <zTh >
              id
            </zTh>

            <zTh
              v-for="feature of features"
              :key="feature.id" >
              <div class="w-full h-full py-1 px-1.5" >
                <zFeatureIcon :feature-icon-data="feature" />
              </div>
            </zTh>

            <zTh >
              <div class="p-1.5 invisible pointer-events-none" >
                <zButton
                  @click="buyStockCopy"
                  variant="ghost"
                  class="px-3 py-2" >
                  Buy
                </zButton>
              </div>
            </zTh>
          </zTr>

          <tbody >
            <zTr
              v-for="productInventory of productsInventory"
              :key="productInventory.id" >
              <zTd >
                <span class="p-1.5" >
                  {{ productInventory.id }}
                </span>
              </zTd>

              <zTd
                v-for="feature of productInventory.features"
                :key="productInventory.id + feature.name" >
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
    </template>

    <template  v-else >
      <h3 class="text-left text-2xl underline mb-3" >
        There is no in stock products yet...
      </h3>
    </template>
  </div>
</template>

<script>
import { zTable, zTh, zTd, zTr } from '@components/composite/zTable'
import zFeatureIcon from '@components/atomic/zFeatureIcon.vue'

export default {
  name: 'Stock',
  props: {
    features: {
      type: Array,
      required: true,
    },
    productsInventory: {
      type: Array,
      required: true,
    }
  },
  computed: {
    productsInventoryEmpty () {
      return this.productsInventory.length === 0
    }
  },
  methods: {
    buyStockCopy () {
      console.log( 'going to but stock productInventory' )
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
