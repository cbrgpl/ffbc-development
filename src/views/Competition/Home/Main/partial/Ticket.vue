<template >
  <div class="flex flex-col w-80 h-40 bg-black-lighten rounded-md" >
    <!-- ID -->
    <div class="text-lg font-mono font-black tracking-widest mb-4 py-3 border-b border-solid border-placeholder border-opacity-10 px-3" >
      ID: {{ data.id }}
    </div>

    <div class="flex flex-col px-3 flex-grow pb-4" >
      <div class="relative flex flex-col mb-1.5" >
        <!-- place -->
        <div class="font-semibold text-lg" >
          {{ data.place }}
        </div>

        <!-- vip -->
        <div
          v-if="data.vip"
          class="absolute right-0 top-2/4 bg-secondary-lighten p-2 rounded-md transform -translate-y-2/4 select-none" >
          VIP
        </div>
      </div>

      <!-- date -->
      <div class="font-mono" >
        {{ data.date }}
      </div>

      <!-- competition-name -->
      <zTape
        class="text-xl mt-auto" >
        {{ data.competition }}
      </zTape>
    </div>
  </div>
</template>

<script >

export default {
  name: 'Ticket',
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style >

</style>
