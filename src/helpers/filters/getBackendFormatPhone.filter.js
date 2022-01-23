import getOnlyDigits from './getOnlyDigits.filter'

export default function ( phone ) {
  return '+' + getOnlyDigits( phone )
}
