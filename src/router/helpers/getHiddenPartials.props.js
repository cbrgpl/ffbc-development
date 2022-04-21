const hiddenPartialPropTemplate = '{routeName}HiddenPartials'

export default ( routeName ) => ( route ) => {
  const hiddenPartialProp = hiddenPartialPropTemplate.replace( '{routeName}', routeName )

  return {
    hiddenPartials: route.meta[ hiddenPartialProp ]
  }
}
