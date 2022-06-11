<template >
  <div class="flex-col relative" >
    <zLoader
      class="z-10"
      v-if="loading"
      title
      background
      size="120px" />

    <div class="shop-main_padding flex-grow overflow-y-auto" >
      <CartActions
        @toggleAllSelectStates="toggleAllSelectStates"
        @deleteProducts="deleteSelectedItems"
        :no-selected-items="noSelectedItems"
        :disabled="actionsDisabled" />

      <CartContent
        @disableLoader="loading = false"
        @toggleSelectState="toggleSelectState"
        :binded-cart-items="bindedCartItems" />
    </div>

    <CartFooter
      class="flex-shrink-0 px-2.5 md:px-5 xl:px-7"
      @buy="pushToOrderCheckout"
      :selected-items="selectedItems" />
  </div>
</template>

<script>
import CartActions from './partial/CartActions.vue'
import CartContent from './partial/CartContent.vue'
import CartFooter from './partial/CartFooter.vue'

import { mapGetters } from 'vuex'
import { computed } from 'vue'
import { arrayUtils } from '@js_utils'

export default {
  name: 'ProfileCart',
  data () {
    return {
      selectedItemIds: [],
      loading: true,
      actionsDisabled: false,
    }
  },
  provide () {
    return {
      actionsDisabled: computed( () => this.actionsDisabled || this.noSelectedItems ),
      selectedItemIds: computed( () => this.selectedItemIds )
    }
  },
  computed: {
    ...mapGetters( {
      bindedCartItems: 'cart/bindedCartItems',
    } ),
    noSelectedItems () {
      return this.selectedItemIds.length === 0
    },
    selectedItems () {
      return this.bindedCartItems.filter( ( bindedCartItem ) => this.selectedItemIds.includes( bindedCartItem.cartItem.id ) )
    }
  },
  methods: {
    toggleSelectState ( id ) {
      if ( !this.selectedItemIds.includes( id ) ) {
        this.selectedItemIds.push( id )
      } else {
        arrayUtils.remove( this.selectedItemIds, id )
      }
    },
    toggleAllSelectStates () {
      if ( this.noSelectedItems ) {
        this.selectedItemIds = this.bindedCartItems.map( ( bindedCartItem ) => bindedCartItem.cartItem.id )
      } else {
        this.selectedItemIds = []
      }
    },
    async deleteSelectedItems () {
      this.actionsDisabled = true

      await this.$store.dispatch( 'cart/removeCartItems', this.selectedItemIds )
      this.selectedItemIds = []

      this.actionsDisabled = false
    },
    pushToOrderCheckout () {
      this.$router.push( {
        name: 'ShopCheckout',
        params: {
          bindedCartItemIds: JSON.stringify( this.selectedItemIds )
        }
      } )
    }
  },

  components: {
    CartActions,
    CartContent,
    CartFooter,
  }
}
</script>

<style lang="scss" scoped>

</style>
