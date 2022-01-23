<template >
  <ul >
    <li
      :key="fileName"
      v-for="fileName of fileNames" >
      {{ fileName }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'zFileList',
  props: {
    fileNames: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
