<template >
  <svg
    v-if="iconLoaded"
    class="inline-block align-middle"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-labelledby="icon"
    role="presentation" >
    <title
      v-if="isTitle"
      :id="icon"
      lang="en" >{{ title }}</title>
    <g
      fill="currentColor"
      v-html="path" >
    </g>
  </svg>
</template>

<script >
export default {
  name: 'ZIconBase',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      path: '',
      viewBox: '0 0 0 0'
    }
  },
  computed: {
    isTitle () {
      return this.title !== null
    },
    iconFileName () {
      return this.icon
    },
    iconLoaded () {
      return !!this.path
    }
  },
  created () {
    this.setIconProperties()
  },
  methods: {
    async setIconProperties () {
      const icon = await import( '@/enums/icons/' + this.iconFileName + '.js' )

      this.path = icon.default.path
      this.viewBox = icon.default.viewBox
    }
  }
}
</script>

<style >

</style>
