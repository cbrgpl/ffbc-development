import AuthService from './types/authService.js'
import ServerService from './types/serverService.js'
import UserService from './types/userService.js'

const authService = new AuthService()
const serverService = new ServerService()
const userService = new UserService()

export {
  authService,
  serverService,
  userService
}
