import AuthService from './types/authService.js'
import ServerService from './types/serverService.js'
const authService = new AuthService()
const serverService = new ServerService()
export {
  authService,
  serverService
}
