import {combineReducers} from 'redux'

import {toyReducer} from './reducers/toy.reducer'
import {userReducer} from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'

export const rootReducer = combineReducers({
    toyModule : toyReducer,
    userModule : userReducer,
    reviewModule: reviewReducer,
})



