<template >
  <div class="absolute top-full transform translate-y-2.5 border border-white border-solid bg-black rounded-md select-none cursor-pointer" >
    <ul class="p-2 -mb-2.5" >
      <li
        class="mb-2.5 flex items-center"
        v-for="requirement of passwordRequirements"
        :key="requirement" >
        <div class="w-2 h-2 mr-1 bg-primary rounded-sm" ></div>
        {{ requirement }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PasswordRequirementsTooltip',
  props: {
    passwordRequirements: {
      type: Array
    },
  },

}
</script>

<style>

</style>
