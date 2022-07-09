<template >
  <div class="flex text-placeholder" >
    <h5 :class="titleStyles" >
      {{ title }}
    </h5>
    <span class="text-lg select-none" >
      {{ prettyTime }}
    </span>
  </div>
</template>

<script >
export default {
  name: 'ZTimer',
  props: {
    sec: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    titleStyles: {
      type: String,
      default: ''
    }
  },
  emits: [ 'timeUp' ],
  data () {
    return {
      timePassed: 1,
      interval: null,
    }
  },
  computed: {
    prettyTime () {
      return ( '0' + ( this.sec - this.timePassed ) ).slice( 1 )
    }
  },
  methods: {
    startTimer () {
      this.timePassed = 0
      this.interval = setInterval( () => this.updateTime(), 1000 )
    },
    updateTime () {
      this.timePassed += 1

      if ( this.timePassed >= this.sec ) {
        clearInterval( this.interval )
        this.$emit( 'timeUp' )
      }
    }
  },
}
</script>

<style lang="scss" scoped >

</style>
