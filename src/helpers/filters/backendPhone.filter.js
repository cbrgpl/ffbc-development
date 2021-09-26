import onlyDigits from './onlyDigits.filter'

export default function ( phone ) {
  return '+' + onlyDigits( phone )
}
