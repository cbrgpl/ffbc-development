<template >
  <ul >
    <li
      v-for="fileName of fileNames"
      :key="fileName" >
      {{ fileName }}
    </li>
  </ul>
</template>

<script >
export default {
  name: 'ZFileList',
  props: {
    fileNames: {
      type: Array,
      required: true
    }
  }
}
</script>

<style >

</style>
