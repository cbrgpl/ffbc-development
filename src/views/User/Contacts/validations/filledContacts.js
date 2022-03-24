export default function () {
  return {
    filledContacts: {
      atLeastOne: ( val ) => Object.keys( val ).length >= 1
    }
  }
}
