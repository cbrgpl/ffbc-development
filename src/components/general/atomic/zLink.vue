<template >
  <a
    class="z-link"
    :data-disabled="disabled"
    :href="url"
    @click="handleClick" >
    <slot />
  </a>
</template>

<script >
export default {
  name: 'ZLink',
  props: {
    url: {
      type: [ String, Object ],
      default: null,
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClick ( event ) {
      if ( !this.url || !this.externalLink ) {event.preventDefault()}
      if ( this.disabled ) {event.stopPropagation()}
    }
  }
}
</script>

<style lang="scss" >
.z-link {
  @apply text-primary-lightest cursor-pointer;

  &::selection {
    @apply bg-primary-darkest;
  }

  &:hover {
    @apply text-primary;
  }

  &:active {
    @apply text-primary-darkest;
  }
}

.z-link[data-disabled='true'] {
  @apply text-placeholder cursor-default;
}
</style>
