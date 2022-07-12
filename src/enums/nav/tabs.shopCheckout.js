const checkoutNavigation = {
  tabs: [
    {
      keyword: 'basicInformation',
      icon: 'user',
      title: 'basic Information',
    },
    {
      keyword: 'measures',
      icon: 'straighten',
      title: 'Measures',
    },
    // {
    //   keyword: 'contactServices',
    //   icon: 'connectWithoutContact',
    //   title: 'Contact Services',
    // },
    // {
    //   keyword: 'additionalPhotos',
    //   icon: 'fileUpload',
    //   title: 'Additional Photos',
    // },
    // {
    //   keyword: 'measures',
    //   icon: 'straighten',
    //   title: 'Measures',
    // },
    // {
    //   keyword: 'payment',
    //   icon: 'payment',
    //   title: 'Payment',
    // },
  ],
  blocks: [
    [ 0, 1 ],
    // [ 4, 4 ]
  ]
}

const checkoutSections = checkoutNavigation.tabs.reduce( ( acc, tab ) => {
  const sectionKeyword = tab.keyword
  acc[ sectionKeyword ] = tab
  return acc
}, {} )

export {
  checkoutSections,
  checkoutNavigation
}