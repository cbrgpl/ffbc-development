export default function ( v$, dataObjectName, fields ) {
  const dataValidation = v$[ dataObjectName ]
  const validationMessages = {}

  for ( const field of fields ) {
    const fieldValidation = dataValidation[ field ]
    validationMessages[ field ] = getFieldValidationErrors( fieldValidation )
  }

  return validationMessages
}

function getFieldValidationErrors ( fieldValidation ) {
  const validationMessages = []
  const isValidationProp = ( prop ) => fieldValidation[ prop ].$message

  for ( const prop in fieldValidation ) {
    if ( isValidationProp( prop ) ) {
      const validationProperty = fieldValidation[ prop ]
      const error = getFieldValidationError( validationProperty )

      validationMessages.push( error )
    }
  }

  return validationMessages
}

function getFieldValidationError ( validationProperty ) {
  if ( validationProperty.$invalid ) {
    return validationProperty.$message
  }
}
