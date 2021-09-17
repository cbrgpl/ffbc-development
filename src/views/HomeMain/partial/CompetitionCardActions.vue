<template >
  <div class="w-36 flex justify-around p-3" >
    <span class="bg-black-primary rounded-full cursor-pointer bg-opacity-50 hover:bg-opacity-100 transition-colors duration-200 p-2" >
      <zIconBase
        :width="26"
        :height="26"
        :is-title="true"
        title="Share with link"
        icon-name="share" />
    </span>

    <span class="bg-black-primary rounded-full cursor-pointer bg-opacity-50 hover:bg-opacity-100 transition-colors duration-200 p-2" >
      <zIconBase
        :width="26"
        :height="26"
        :is-title="true"
        title="Buy tickets"
        icon-name="ticket" />
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
