<template >
  <div class="relative select-none" >
    <div
      @click="toggleListVisible"
      class="border-2 border-primary-darkest border-solid bg-black-lighten rounded-md p-1 cursor-pointer" >
      <slot
        name="visible"
        :value="visibleValue" >
        {{ visibleValue }}
      </slot>
    </div>
    <Transition name="list-appear" >
      <ul
        class="list w-full border border-primary-darkest border-solid bg-black-lighten rounded-md overflow-hidden"
        v-if="listVisible" >
        <li
          class="hover:bg-black-primary transition-colors"
          @click="setItemAsSelected(item)"
          v-for="(item, i) of list"
          :key="i" >
          <slot
            name="listItem"
            v-bind="getListItemSlotProps(item)" >
            <zSelectItem :item="itemAccesser(item)" />
          </slot>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
import zSelectItem from '@general_components/atomic/zSelectItem.vue'

export default {
  name: 'zSelect',
  emits: [ 'update:modelValue' ],
  props: {
    list: {
      type: Array,
      required: true,
    },
    itemAccesser: {
      type: Function,
      default: ( val ) => val
    },
    modelValue: {
      type: [ String, Object, Number ],
      default: null,
    }
  },
  data () {
    return {
      listVisible: false,
    }
  },
  computed: {
    listItemType () {
      return this.list[ 0 ] ? typeof this.list[ 0 ] : null
    },
    listItemComponent () {
      return this.$slots.listItem || zSelectItem
    },
    selectedItem () {
      return this.list.find( ( el ) => this.itemAccesser( el ) === this.modelValue ) || null
    },
    visibleValue () {
      return this.selectedItem === null ? 'Select Value' : this.selectedItem
    }
  },
  methods: {
    getListItemSlotProps ( item ) {
      if ( this.listItemType === null ) {
        return {}
      } else {
        return this.listItemType === 'string' ? { value: item } : item
      }
    },
    setItemAsSelected ( item ) {
      this.listVisible = false

      this.$emit( 'update:modelValue', this.itemAccesser( item ) )
    },
    toggleListVisible () {
      this.listVisible = !this.listVisible
    },
  },
  components: {
    zSelectItem
  }
}

</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  top: calc(100% + 5px);
  z-index: 20;
}

.list-appear {
  &-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }

  &-enter-to {
    opacity: 1;
    transform: translateX(0);
  }

  &-enter-active {
    transition: all 120ms ease;
  }

  &-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  &-leave-active {
    transition: 160ms ease-out;
  }
}

</style>
