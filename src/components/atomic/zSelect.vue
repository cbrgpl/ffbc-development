<template >
  <div class="select relative select-none" >
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
        class="list w-full border border-primary-darkest border-solid rounded-md overflow-hidden"
        v-if="listVisible" >
        <li
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
import zSelectItem from '@components/atomic/zSelectItem.vue'

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
      default: null
    },
    modelValue: {
      type: [ String, Object ],
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
    accesserProvided () {
      return this.itemAccesser !== null
    },
    visibleValue () {
      return this.modelValue === null ? 'Select Value' : this.modelValue
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

      if ( this.accesserProvided ) {
        this.$emit( 'update:modelValue', this.itemAccesser( item ) )
      } else {
        this.$emit( 'update:modelValue', item )
      }
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
.select {
}

.list {
  position: absolute;
  top: calc(100% + 5px)
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
