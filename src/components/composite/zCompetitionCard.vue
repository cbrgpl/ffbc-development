<template >
  <div
    class="competition-card w-full lg:w-5/12 relative rounded-md shadow-md overflow-hidden" >
    <img
      @click="navigate"
      class="w-full h-full object-cover select-none cursor-pointer"
      :src="url"
      alt="" >

    <!-- content -->
    <div
      :style="cardStyles"
      class="competition-card__inner transition-transform duration-500 flex flex-col w-full absolute top-full left-0 bg-black-lighten pt-2.5 pb-3 px-1.5" >

      <div class="h-52" >
        <zTape
          class="pb-1.5"
          :scrollable="true" >
          <zChip
            class="competition-card__chip"
            v-for="category of categories"
            :key="category" >
            {{ category }}
          </zChip>
        </zTape>

        <!-- location -->
        <h5 class="flex items-center font-semibold mt-1 mb-1.5" >
          <zIconBase
            class="mr-1.5"
            icon="location" /> Lorem ipsum dolor sit.
        </h5>

        <!-- title -->
        <h3 class="leading-tight mb-3 text-placeholder" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
      </div>

      <!-- content -->
      <div
        :ref="setContentHeight"
        class="flex-grow leading-tight overflow-y-auto" >
        <p >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, sunt. Nulla qui, eveniet ad tempora deserunt eaque odio eos. Debitis exercitationem magnam libero consequatur illo vitae sequi sunt, quo quod veritatis at totam doloremque eveniet pariatur minima nesciunt maiores quis, iusto atque dolorum molestiae aspernatur fuga! Odio quaerat dolorem inventore illum voluptates aliquam eligendi quia culpa dolor eos iste saepe ut, commodi repudiandae nemo sed, minus assumenda! Obcaecati enim dolorum reiciendis ipsa dignissimos praesentium et voluptas officia, tempore molestias perferendis quo dicta natus eaque in eveniet quis quia odit dolor tenetur quasi harum vitae? Nisi alias rerum qui ex, consequuntur minima consectetur officiis itaque sit explicabo quisquam omnis repudiandae quibusdam nobis? Voluptas deserunt, non odit maiores illum veritatis fuga at, eos molestias minima dolor doloremque recusandae assumenda minus. Vero iusto accusantium delectus eius, tenetur aut molestiae pariatur voluptatem est modi nam explicabo quasi quod harum cum cumque perspiciatis deserunt nobis sequi labore hic? Itaque velit repellat veritatis ab? Sunt ullam omnis debitis harum expedita veritatis doloremque, culpa repudiandae, quae optio eaque illo sequi molestias velit ipsam. Excepturi ab repellendus voluptatibus aperiam qui repellat dicta! Quam aliquam beatae id quos adipisci asperiores laudantium voluptatem, eligendi quia optio fugiat laboriosam vel eaque!
        </p>
      </div>

    </div>

    <!-- date -->
    <div
      class="flex flex-col items-center justify-center font-mono absolute left-0 top-0 text-lg xl:text-xl bg-black-lighten shadow-lg p-2" >
      <span class="text-xl mb-1.5" >
        {{ formattedDate.day }}
      </span>
      <span class="mb-1.5" >
        {{ formattedDate.month }}
      </span>
      <span >{{ formattedDate.year }}</span>
    </div>

    <!-- actions -->
    <div
      @click.stop
      class="absolute right-0 top-0" >

      <slot name="actions" ></slot>

    </div>
  </div>
</template>

<script>
import { DomHandler } from '@classes'
import { getIntlPartFormatFunction } from '@filters'

// TODO Доделать навигацию сверху и сделать чтобы на телефонах при клике карточка становилась открыта или закрыта
export default {
  name: 'zCompetitionCard',
  data () {
    return {
      categories: [ 'cat1', 'categori2', 'category', 'cat5' ],
      contentHeight: 0,
      cardHeight: 384,
      url: 'https://deanbradshaw-django.s3.amazonaws.com/medialibrary/2013/11/muaythai_photography_deanbradshaw_3.jpg',
      date: new Date( '12/08/2021' )
    }
  },
  computed: {
    cardStyles () {
      return {
        'max-height': this.cardHeight + 'px',
        '--content-height': this.contentHeight + 'px'
      }
    },
    formattedDate () {
      const dateParts = this.dateTimeFormat( this.date )

      return {
        day: ( '0' + dateParts[ 2 ].value ).slice( -2 ),
        month: dateParts[ 0 ].value.slice( 0, 3 ).toUpperCase(),
        year: dateParts[ 4 ].value
      }
    },
  },
  methods: {
    dateTimeFormat: getIntlPartFormatFunction( { day: 'numeric', month: 'long', year: 'numeric' } ),
    setContentHeight ( $el ) {
      if ( $el ) {
        const innerPB = 12
        this.contentHeight = this.cardHeight - ( DomHandler.getOuterHeight( $el ) + innerPB )
      }
    },
    navigate () {
      // push to competition page via router with ID
      this.log$.message( 'Навигация к соревнованию' )
    }
  },
}
</script>

<style lang="scss" scoped>
.competition-card__inner {
  transform: translateY(calc(-1 * var(--content-height)));
}

.competition-card__chip {
  @apply mr-1.5;

  &:last-child {
    @apply mr-0;
  }
}

.competition-card {
  height: rem(560px);

  &:hover {
    .competition-card__inner {
      transform: translateY(-100%);
    }
  }
}
</style>
