<template >
  <div class="mb-32" >

    <section class="home-main__bg-gradient flex flex-col items-center justify-center pt-20 pb-36" >
      <img
        class="w-44 h-44 mb-1.5 rounded-full select-none shadow-2xl"
        :src="avatarTest"
        width="100"
        height="100"
        alt="" >
      <h3 class="leading-none" >
        {{ fullName }}
      </h3>
      <h5 class="leading-tight font-medium" >
        {{ userData.email }}
      </h5>
    </section>

    <section >
      <h1 class="mb-8" >
        My competitions:
      </h1>
      <!-- <h3 class="home-main__empty-title" >
        <zIconBase
          class="mr-2"
          :width="36"
          :height="36"
          icon="interests" /> There is nothing yet...
      </h3> -->
      <div class="flex items-center justify-around flex-wrap w-full" >
        <zCompetetionCard
          class="mb-8 lg:mb-0" >

          <template #actions >
            <CompetitionCardActions />
          </template>
        </zCompetetionCard>

        <zCompetetionCard
          class="mb-8 lg:mb-0" >

          <template #actions >
            <CompetitionCardActions />
          </template>
        </zCompetetionCard>
      </div>
    </section>

    <section >
      <h1 class="mb-8" >
        My Tickets:
      </h1>

      <!-- <h3 class="home-main__empty-title" >
        <zIconBase
          class="mr-2"
          :width="36"
          :height="36"
          icon="ticket" /> There is nothing yet...
      </h3> -->

      <div class="home-main__tickets-grid" >
        <Ticket
          v-for="i of 10"
          :key="i"
          :data="ticketData" ></Ticket>
      </div>

    </section>

    <section >
      <h1 class="mb-8" >
        My beauty services:
      </h1>

      <h3 class="home-main__empty-title" >
        <zIconBase
          class="mr-2"
          :width="36"
          :height="36"
          icon="catchingPokemon" /> There is nothing yet...
      </h3>

      <div class="home-main__services-grid" >
        <ServiceSection
          :competition-id="1"
          title="Competition 1" />
        <ServiceSection
          :competition-id="1"
          title="Competition 2" />
      </div>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

import ServiceSection from './partial/ServiceSection.vue'
import CompetitionCardActions from './partial/CompetitionCardActions.vue'
import Ticket from './partial/Ticket.vue'

import IconBase from '@components/atomic/zIconBase.vue'

export default {
  name: 'HomeMain',
  data () {
    return {
      avatarTest: require( '@images/avatar.jpg' ),
      ticketData: {
        place: 'UAE, DUBAI,',
        date: '21/12/2021',
        id: 129949494,
        competition: 'The Best Fitness Bikini',
        vip: true
      }
    }
  },
  computed: {
    ...mapGetters( {
      userData: 'user/userData',
      fullName: 'user/fullName',
    } )
  },
  components: {
    zCompetetionCard: defineAsyncComponent( () => import( '@/components/composite/zCompetitionCard.vue' ) ),
    CompetitionCardActions,
    Ticket,
    ServiceSection,
    IconBase
  }
}
</script>

<style lang="scss" scoped>
section {
  @apply px-4;

  &:nth-child(n + 2) {
    @apply mb-32;
  }
}

.home-main__empty-title {
  @apply text-placeholder font-semibold tracking-wider pl-3 mb-9 flex items-center;
}

.home-main__bg-gradient {
  @apply relative z-10;

  &::after {
    @apply block w-full h-full top-0 left-0 absolute -z-10;
    content: "";

    background: linear-gradient(to bottom, rgba(140, 19, 19, 89%) 0%, rgba(26, 25, 22, 29%) 100%);
    filter: blur(50px) brightness(0.85);
  }
}

.home-main__tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(#{rem(320px)}, 1fr));
  grid-gap: rem(25px) rem(15px);
  justify-items: center;
}

.home-main__services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(#{rem(360px)}, 1fr));
  grid-gap: rem(25px) rem(15px);
  justify-content: space-around;
  justify-items: center;
}
</style>
