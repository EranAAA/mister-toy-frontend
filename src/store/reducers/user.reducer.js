
import { userService } from "../../services/user.service.js"

const initialState = {
   user: userService.getLoggedinUser(),
   users: []
}

export function userReducer(state = initialState, action) {

   switch (action.type) {

      case 'SET_USER':
         return { ...state, user: action.user }
      case 'SET_USER_BALANCE':
         if (!state.user) return state
         return { ...state, user: { ...state.user, score: action.score } }
      case 'UPDATE_SCORE':
         return { ...state, user: { ...state.user, score: state.user.score += action.score } }
      case 'UPDATE_USER':
         return { ...state, user: action.updatedUser }
      case 'SET_USERS':
         return { ...state, users: action.users }
         break;
      default:
         return state
   }
}