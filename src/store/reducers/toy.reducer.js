
const initialState = {
    toys: [],
    filterBy: '',
    toy: ''
}

export function toyReducer(state = initialState, action) {
    var toys

    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            return { ...state, toys }
        case 'UPDATE_TOY':
            toys = state.toys.map(currToy =>(currToy._id === action.toy._id) ? action.toy : currToy)
            return { ...state, toys }
        case 'FILTER_TOY':
            return { ...state, filterBy: action.filterBy }
        case 'TOY':
            return { ...state, toy: action.toy }
        default:
            return state
    }
}