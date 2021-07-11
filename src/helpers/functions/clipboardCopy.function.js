export default function ( text ) {
  const textArea = document.createElement( 'textarea' )
  let msg

  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0

  textArea.style.opacity = 0

  textArea.value = text

  document.body.appendChild( textArea )

  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand( 'copy' )
    msg = successful ? 'successful' : 'unsuccessful'
  } catch ( error ) {
    msg = 'unsuccessful'
  }

  document.body.removeChild( textArea )
  return msg
}
