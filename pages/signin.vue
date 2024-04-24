<script setup>
import {ref} from 'vue'
import axios from 'axios'


const router = useRouter()
let id = ref('')
let email = ref('')
let password = ref('')
let plate = ref('')
let first_name = ref('')
let last_name = ref('')
let errors = ref([])

// this is the orig
// async function submitForm(){ 
//   console.log('submitForm')
//   errors.value = []

//   const {data: responseData} = await $fetch('http://127.0.0.1:8000/api/v1/users/',  {
//     method: 'POST',
//     body: {
//       username: username.value,
//       password: password.value
      
//     }
//   })
//   .then(response =>{
//     console.log(responseData.value)
//     console.log('response', response)

//     router.push({path:'/login'})
//   })
//   .catch(error=>{
//     if (error.response){
//       for(const property in error.response._data){
//         errors.value.push(`${property}: ${error.response._data[property]}`)
//       }
//       console.log(JSON.stringify(error.response))
//     }
//     else if (error.message){
//       errors.value.push('Something went wrong. Please try again.')
//       console.log(JSON.stringify(error))
//     }
//   })
// }
// end of original


// // this is the latest
const submitForm = async () => {
  errors.value = []

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', {
      username: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name : last_name.value,
      plate : plate.value
    })

    // Assuming the backend returns JWT tokens upon successful login
    const tokens = response.data
    // Store the tokens in local storage or Vuex store for future requests
    localStorage.setItem('refreshToken', tokens.refresh)
    localStorage.setItem('accessToken', tokens.access)
    // Redirect to a protected route or dashboard
    router.push('/login')
    console.log('Logged in successfully')
  } catch (error) {
    if (error.response) {
      for (const property in error.response.data) {
        errors.value.push(`${property}: ${error.response.data[property]}`)
      }
    } else if (error.message) {
      errors.value.push('Something went wrong. Please try again.')
      console.error(error.message)
    }
  }
}
// end of the latest
</script>
<template>
    <div class="mx-auto h-fit w-fit pt-20">
        <div class="min-h-full flex-1 flex-col justify-center py-12 lg:px-8 bg-[#802F2F] rounded-lg">
            <div class="text-center">
                <img src="assets/pngue.png" alt="ue" class="w-40 h-40 flex justify-center items-center mx-auto">
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" v-on:submit.prevent="submitForm">
                <div>
                  <label for="email" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Email</label>
                  <div class="mt-2">
                    <input id="email" name="email" v-model="email" type="email" autocomplete="email" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Password</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>


                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">First name</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input id="first_name" name="plate" v-model="first_name" type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>

                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Last name</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input id="last_name" name="plate" v-model="last_name" type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>


                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Plate Number</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input id="plate" name="plate" v-model="plate" type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>

                  <div
                  v-if="errors.length"
                  class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                  >
                  <p v-for="error in errors" v-bind:key="error">
                    {{error}}
                  </p>
                  </div>
                </div>
                <!-- button -->
                <div class="flex justify-end space-x-2">
                  <NuxtLink to="/login" class="bg-white px-2 py-1 text-center rounded-sm text-gray-900 text-sm -mt-3 mb-2 font-sans font-normal">cancel</NuxtLink>
                  <button type="submit" class="bg-white px-2 py-1 text-center rounded-sm text-gray-900 text-sm -mt-3 mb-2 font-sans font-semibold">Sign Up</button>
                </div>
                <!-- end of button -->
              </form>
            </div>
          </div>
    </div>

    
</template>