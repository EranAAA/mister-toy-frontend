import { httpService } from './http.service'
import { utilService } from './util.service.js'

const axios = require('axios').default;

export const toyService = {
   query,
   getById,
   save,
   remove,
   getEmptyToy
}

// const Axios = axios.create({ withCredentials: true })

// // Reuse const
// const BASE_URL = (process.env.NODE_ENV === 'production')
//    ? '/api/toy/'
//    : 'http://localhost:3030/api/toy/';

//Request (Rest:GET) all Data from Backend

async function query(filterBy = {}) {
   try {
      // return await httpService.get('toy/', { params:  filterBy  })
      return await httpService.get('toy/', { filterBy })
   } catch (err) {
      console.log('cant get toys!');
      throw err
   }
}

// Request (Rest:GET) get a Bug from Backend
async function getById(toyId) {
   try {
      return await httpService.get(`toy/${toyId}`)
   } catch (err) {
      console.log('cant get toy by id!');
      throw err
   }
}

// Request (Rest:DELETE) delete a Bug from Backend
async function remove(toyId) {
   try {
      return await httpService.delete(`toy/${toyId}`)
   } catch (err) {
      console.log('cant delete toy');
      throw err
   }
}

// Request (Rest:PUT & POST) update or add new Bug from Backend
async function save(toy) {
   try {
      if (toy._id) {
         return await httpService.put(`toy/${toy._id}`, toy)
      } else {
         return await httpService.post(`toy/`, toy)
      }
   } catch (err) {
      console.log('cant save toy');
      throw err
   }
}

function getEmptyToy() {
   return {
      name: 'Toy No:' + (Date.now() % 1000),
      img: utilService.getRandomIntInclusive(0, 13),
      price: utilService.getRandomIntInclusive(50, 150),
      labels: ["Doll", "Battery Powered", "Baby"],
      createdAt: Date.now() - utilService.getRandomIntInclusive(10000000, 1000000000),
      inStock: utilService.getRandomIntInclusive(1, 10) <= 5 ? true : false
   }
}