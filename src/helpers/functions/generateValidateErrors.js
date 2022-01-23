export default function ( v$, dataObjectName, fields ) {
  const dataValidation = v$[ dataObjectName ]
  const validationMessages = {}

  for ( const field of fields ) {
    const fieldValidation = dataValidation[ field ]
    validationMessages[ field ] = []
    for ( const prop in fieldValidation ) {
      const isValidationProp = ( prop ) => fieldValidation[ prop ].$message
      if ( isValidationProp( prop ) ) {
        const validation = fieldValidation[ prop ]

        if ( validation.$invalid ) {
          validationMessages[ field ].push( validation.$message )
        }
      }
    }
  }

  return validationMessages
}
