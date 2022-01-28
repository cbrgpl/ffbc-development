export default {
  namespaced: true,
  state () {
    return {
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // * out means returning value from action and does not commit it into store
    // * no prefix means commiting value into store
    outFetchProductById ( { commit, getters }, id ) {
      // need to make API request
      const fetchedProduct = {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quae doloribus dolores tempo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quae doloribus dolores tempora voluptatum animi sequi sint cupiditate ab tempore, cum quas temporibus sapiente provident, distinctio obcaecati quaerat. Ab accusamus nihil iste ratione laborum nesciunt facere saepe impedit amet dolores rem earum ipsum, ad tempo',
        type: 'Bikini',
        price: 16.35,
        count: 0,
        media: [
          'https://picsum.photos/1920/1080?random=29',
          'https://picsum.photos/1920/1080?random=289',
          'https://picsum.photos/1920/1080?random=358',
          'https://picsum.photos/1920/1080?random=177',
          'https://picsum.photos/1920/1080?random=252'
        ]
      }

      return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
          resolve( fetchedProduct )
        }, 1500 * Math.random() )
      } )
    }
  }
}
