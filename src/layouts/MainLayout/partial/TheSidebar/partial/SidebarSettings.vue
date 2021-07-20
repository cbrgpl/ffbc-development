
<template >
  <div class="sidebar__settings-placement sidebar__child-part" >
    <!-- TODO Добавить директиву тултипов при наведении! -->
    <zToggle
      class="sidebar__setting-toggle"
      v-for="mode of Object.entries(mods)"
      :key="mode[0]"
      :value="mode[0]"
      @update:modelValue="handleNewMode"
      :model-value="mods[mode[0]]" />
    <zIconBase
      @click="changeMode"
      class="sidebar__open-toggler"
      title="Open menu"
      width="26"
      height="26"
      icon-name="doubleArrow" />
  </div>
</template>

<script>
import zToggle from '@components/atomic/zToggle.vue'
import zIconBase from '@components/composite/zIconBase.vue'

export default {
  name: 'SidebarSettings',
  emits: [ 'update:sidebarMode' ],
  props: {
    sidebarMode: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      mods: {
        alwaysOpen: false,
        alwaysCollapsed: false,
        collapsable: false
      }
    }
  },
  watch: {
    sidebarMode ( newMode ) {
      this.handleNewMode( true, newMode )
    }
  },
  methods: {
    handleNewMode ( condition, mode ) {
      if ( mode === 'disabled' ) {
        return
      }
      for ( const mode of Object.entries( this.mods ) ) {
        this.mods[ mode[ 0 ] ] = false
      }

      this.mods[ mode ] = condition
      this.$emit( 'update:sidebarMode', mode )
    },
    changeMode () {
      if ( this.sidebarMode === 'alwaysOpen' ) {
        this.$emit( 'update:sidebarMode', 'alwaysCollapsed' )
      } else if ( this.sidebarMode === 'alwaysCollapsed' ) {
        this.$emit( 'update:sidebarMode', 'alwaysOpen' )
      }
    }
  },
  mounted () {
    this.mods[ this.sidebarMode ] = true
  },
  components: {
    zToggle,
    zIconBase,
  },
}
</script>

<style lang="scss" scoped>
.sidebar__settings-placement {
  @apply relative bg-black bg-opacity-10 py-2 w-full;
}

.sidebar__setting-toggle {
  @apply transition-all;
}

.sidebar__open-toggler {
  @apply text-white absolute right-2/4 top-2/4 transform -translate-y-2/4 translate-x-2/4 cursor-pointer transition-all duration-300;
}
</style>
