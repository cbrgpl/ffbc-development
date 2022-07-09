<template >
  <div
    :class="['absolute z-50 flex justify-between w-56 right-2/4 bottom-full transform translate-x-2/4 transition-all duration-300 pointer-events-none', getContainerClasses ]" >
    <router-link
      class="central-button-icons__button transform translate-y-4"
      :to="{name: 'Root'}" >
      <zIconBase
        width="32"
        height="32"
        icon="ticket" ></zIconBase>
    </router-link>

    <router-link
      class="central-button-icons__button"
      :to="{name: 'Main'}" >
      <zIconBase
        width="32"
        height="32"
        icon="visibility" ></zIconBase>
    </router-link>

    <router-link
      class="central-button-icons__button transform translate-y-4"
      :to="{name: 'Main'}" >
      <zIconBase
        width="32"
        height="32"
        icon="event" ></zIconBase>
    </router-link>
  </div>
</template>

<script >
export default {
  name: 'CentralButtonIcons',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    getContainerClasses () {
      return [
        this.isVisible ? '-translate-y-1/4' : 'translate-y-full opacity-0 scale-0'
      ]
    }
  }
}
</script>

<style >
.central-button-icons__button {
  @apply bg-primary text-white rounded-full border-2
    border-solid border-white border-opacity-60 p-3 pointer-events-auto;
}
</style>
