let counter = 0

export default function ( prefix = 'z_id_' ) {
  return `${ prefix }${ counter++ }`
}
