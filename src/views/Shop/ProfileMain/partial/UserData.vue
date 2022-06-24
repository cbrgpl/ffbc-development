<template >
  <div class="flex items-center bg-black-primary" >

    <span class="flex items-center justify-center flex-shrink-0 text-2xl font-semibold w-20 h-20 md:w-28 md:h-28 rounded-full bg-secondary-lighten bg-opacity-30 select-none" >
      {{ nameInitials }}
    </span>
    <div class="flex justify-between flex-grow overflow-hidden py-3 pl-3" >
      <div class="flex flex-col flex-grow overflow-hidden text-lg pr-2" >
        <div class="mb-1.5 overflow-hidden whitespace-nowrap overflow-ellipsis" >
          {{ fullName }}
        </div>
        <div >
          My Details
        </div>
      </div>

      <zIconBase
        class="w-6 flex-shrink-0"
        icon="forwardArrow" />

    </div>

  </div>
</template>

<script>
export default {
  name: 'UserData',
  props: {
    fullName: {
      type: String,
      required: true,
    }
  },
  computed: {
    names () {
      return this.fullName.split( ' ' )
    },
    nameInitials () {
      let nameInitials = ''

      for ( const name of this.names ) {
        nameInitials += name.charAt( 0 ).toUpperCase()
      }

      return nameInitials
    },

  },
}
</script>

<style>

</style>
