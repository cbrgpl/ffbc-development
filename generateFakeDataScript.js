function getProductTemplate () {
  return {
    title: '',
    description: '',
    type: 'type1',
    price: '',
    count: 0,
    media: [
      'https://picsum.photos/1920/1080?random=',
      'https://picsum.photos/1920/1080?random=',
      'https://picsum.photos/1920/1080?random=',
      'https://picsum.photos/1920/1080?random=',
      'https://picsum.photos/1920/1080?random=',
    ],
  }
}

const longLongText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quae doloribus dolores tempora voluptatum animi sequi sint cupiditate ab tempore, cum quas temporibus sapiente provident, distinctio obcaecati quaerat. Ab accusamus nihil iste ratione laborum nesciunt facere saepe impedit amet dolores rem earum ipsum, ad tempore, reiciendis dolorum incidunt eligendi officia odio nostrum? Ea quis modi magni totam impedit recusandae adipisci, mollitia nulla numquam odio harum fugit soluta incidunt id sequi rerum consequatur quae delectus dolorum ullam nihil! Architecto officiis qui eos provident reprehenderit odit tenetur! Nisi voluptate voluptates, architecto sunt id aperiam sed optio esse. Reprehenderit repudiandae error est dolores ut quis iusto tenetur sequi, animi laborum ratione quibusdam optio dolor eos excepturi debitis sunt iure sapiente corrupti magni eius laboriosam. Quod enim quisquam voluptate cumque perspiciatis omnis impedit consequatur dolor. Dicta voluptas debitis tempore maiores? Dolorum a impedit laboriosam temporibus maiores perferendis blanditiis! Minus harum odio impedit illum cumque commodi ea totam praesentium hic facere, vel delectus ducimus nobis assumenda officiis, velit corrupti adipisci asperiores nulla. Veritatis voluptatem maiores eaque, laboriosam ab quam neque. Architecto facilis ab delectus odit a unde, at eius nemo rem laboriosam recusandae debitis? Excepturi minima natus labore qui. Tempore maiores cum nulla et modi.'

function sliceTextPart ( minSymbolCount, randomRangeDelta ) {
  return longLongText.slice( 0, minSymbolCount + randomRangeDelta * Math.random() )
}

const products = []

for ( let i = 0; i < 25; ++i ) {
  const productTemplate = getProductTemplate()

  productTemplate.title = sliceTextPart( 20, 150 )
  productTemplate.description = sliceTextPart( 200, 200 )
  productTemplate.price = 5 + parseFloat( ( Math.random() * 20 ).toFixed( 2 ) )
  productTemplate.count = Math.floor( Math.random() * 2 )

  for ( let j = 0; j < 5; ++j ) {
    productTemplate.media[ j ] = productTemplate.media[ j ] + Math.round( Math.random() * 500 )
  }
  products.push( productTemplate )
}

console.log( products )
