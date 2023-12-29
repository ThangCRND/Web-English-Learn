// import axios from 'axios'
// import {useAuthStore} from '../store/auth.js'
// const authStore = useAuthStore();
// export default () => {
//   return axios.create({
//     baseURL: `http://localhost:8080/api/exam`,
//     headers: {
//       Authorization: `Bearer ${authStore.token}`
//     }
//   })
// }


import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8080/api/exam`
  })
}