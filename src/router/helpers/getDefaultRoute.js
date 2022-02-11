export default ( authToken ) => {
  return authToken === null ? 'Main' : 'Home'
}
