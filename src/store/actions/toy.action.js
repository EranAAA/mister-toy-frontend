import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../../services/socket.service.js";
import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export function setToy(toy) {
   return (dispatch) => {
      dispatch({ type: 'TOY', toy })
   }
}

export function loadToys() {
   try {
      return async (dispatch) => {
         const toys = await toyService.query()
         console.log('Got Toys', toys);
         dispatch({ type: 'SET_TOYS', toys })
      }
   } catch (err) {
      console.log('cannot load toys', err);
   }
}

export function addToy(toy) {
   try {
      return async (dispatch) => {
         const savedToy = await toyService.save(toy)
         console.log('Added Toy', savedToy);
         dispatch({ type: 'ADD_TOY', toy: savedToy })
         showSuccessMsg('Toy added')
      }
   } catch (err) {
      console.log('cannot add toy', err);
      showErrorMsg('Cannot add toy')
   }
}

export function editToy(toyToSave) {
   try {
      return async (dispatch) => {
         const savedToy = await toyService.save(toyToSave)
         console.log('Updated Toy:', savedToy);
         dispatch({ type: 'UPDATE_TOY', toy: savedToy })
         showSuccessMsg('Toy updated')

         // socketService.off('toy-edited')
         // socketService.on('toy-edited', toy => {
         //    showSuccessMsg(`UPDATED`)
         // })

      }
   } catch (err) {
      console.log('cannot edit toy', err);
      showErrorMsg('Cannot edit toy')
   }
}

export function filtering(filterBy) {
   return async (dispatch) => {
      try {
         const toys = await toyService.query(filterBy)
         // console.log('Toys from DB:', toys);
         dispatch({ type: 'SET_TOYS', toys })
         dispatch({ type: 'FILTER_TOY', filterBy })
      } catch (err) {
         console.log('cannot filter toys', err);
      }
   }
}

export function removeToy(toyId) {
   return async (dispatch) => {
      try {
         await toyService.remove(toyId)
         dispatch({ type: 'REMOVE_TOY', toyId })
         console.log('Deleted Succesfully!')
         showSuccessMsg('Toy removed')
      } catch (err) {
         console.error('Error:', err)
         showErrorMsg('Cannot remove toy')
      }
   }
}







