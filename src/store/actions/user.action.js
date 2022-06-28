
import { userService } from '../../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export function userLogin(credentials) {
   return async dispatch => {
      try {
         const user = await userService.login(credentials)
         dispatch({ type: 'SET_USER', user })
      } catch (err) {
         console.error('Error:', err)
         showErrorMsg('Cannot login')
      }
   }
}

export function userLogout() {
   return async dispatch => {
      try {
         await userService.logout()
         dispatch({ type: 'SET_USER', user: null })
      } catch (err) {
         console.error('Error:', err)
         showErrorMsg('Cannot logout')
      }

   }
}

export function userSignup(credentials) {
   return async dispatch => {
      try {
         const user = await userService.signup(credentials)
         dispatch({ type: 'SET_USER', user })
      } catch (err) {
         console.error('Error:', err)
         showErrorMsg('Cannot sineup')
      }

   }
}

export function updateUser(user) {
   return async dispatch => {
      try {
         const updatedUser = await userService.update(user)
         dispatch({ type: 'UPDATE_USER', updatedUser })
         console.log('dispatch', updatedUser);
         showSuccessMsg('Toy added to cart.')
      } catch (err) {
         console.error('Error:', err)
         showErrorMsg('Cannot added to cart')
      }
   }
}

export function loadUsers() {
   return async dispatch => {
      try {
         const users = await userService.getUsers()
         dispatch({ type: 'SET_USERS', users })
      } catch (err) {
         console.log('UserActions: err in loadUsers', err)
      } finally {
      }
   }
}

