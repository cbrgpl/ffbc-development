export const throwErrorInAbstractMethod = ( methodType = 'public', methodName ) => {
  throw new Error( `Abstract; ${ methodType } ${ methodName }: method must have implementation` )
} 