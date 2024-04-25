<script setup>
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()


let email = ref('')
let first_name = ref('')
let last_name = ref('')
let plate = ref('')


let password = ref('')
let errors = ref([])

// this is the original
async function submitForm(){
  console.log('Logged-in Successfully')
  errors.value = []

  // await axios.post('http://127.0.0.1:8000/api/v1/token/login',{
  //   username: email.value,
  //   password: password.value
  // })
  // dito nalang may mali
  await $fetch('http://127.0.0.1:8000/api/v1/token/login/', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
      first_name : first_name.value, // addition
      last_name : last_name.value,
      plate:plate.value //addtion
    }
  })
  // localStorage.setItem('token', response.data.token)
  .then(data => {
    console.log('response', data.auth_token)
    localStorage.setItem('token', data.auth_token)
    localStorage.setItem('email', email.value)

    userStore.setToken(data.auth_token, email.value)

    router.push({path: '/historytab'})
  })
  .catch(error=>{
    if (error.response){
      for(const property in error.response._data){
        errors.value.push(`${property}: ${error.response._data[property]}`)
      }
      console.log(JSON.stringify(error.response))
    }
    else if (error.message){
      errors.value.push('Something went wrong. Please try again.')
      console.log(JSON.stringify(error))
    }
  })
}
// end of original
// async function submitForm() {
//   errors.value = []

//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/v1/token/login/', {
//       username: email.value,
//       password: password.value
//     })

//     // Assuming the backend returns JWT tokens upon successful login
//     const tokens = response.data
//     // Store the tokens in local storage or Vuex store for future requests
//     localStorage.setItem('refreshToken', tokens.refresh)
//     localStorage.setItem('accessToken', tokens.access)
//     // Redirect to a protected route or dashboard
//     router.push('/historytab')
//     console.log('Logged in successfully')
//   } catch (error) {
//     if (error.response) {
//       for (const property in error.response.data) {
//         errors.value.push(`${property}: ${error.response.data[property]}`)
//       }
//     } else if (error.message) {
//       errors.value.push('Something went wrong. Please try again.')
//       console.error(error.message)
//     }
//   }
// }
// this is the latest

// end of latest
useSeoMeta({
  title: 'Login',
  ogTitle: 'Login',
  description: 'Smart parking management system'
})
</script>

<template>
    <div class="mx-auto h-fit w-fit pt-20">
        <div class="min-h-full flex-1 flex-col justify-center py-12 lg:px-8 bg-[#802F2F] rounded-lg" >
            <div class="text-center">
                <img src="assets/pngue.png" alt="ue" class="w-40 h-40 flex justify-center items-center mx-auto">
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" v-on:submit.prevent="submitForm">
                <div>
                  <label for="email" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Username</label>
                  <div class="mt-2">
                    <input v-model="email" type="email" autocomplete="email" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between space-x-40">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Password</label>
                    <div class="text-sm">
                      <NuxtLink to="/ForgotPassword" class=" text-[#D9D9D9] font-extralight">Forgot password?</NuxtLink>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input v-model="password" type="password" autocomplete="current-password" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <!-- button -->
                <div class="flex justify-end" >
                  <button class="bg-white px-2 py-1 text-center rounded-sm text-gray-900 text-sm -mt-3 mb-2 font-sans font-semibold">Sign in</button>
                </div>
                <!-- end of button -->
              </form>
            </div>
            <!-- inline group of help center -->
            <div class="inline-flex justify-between space-x-1 pt-45 text-[#D9D9D9] font-light mb-6">
                <NuxtLink to="/SignIn" class="text-xs order-last ml-16 text-[#D9D9D9] font-light"> Don't have an account yet?</NuxtLink>
              <a href="http://facebook.com" class="text-xs underline underline-offset-2"> Facebook</a>
              <a href="http://facebook.com" class="text-xs underline underline-offset-2"> Twitter</a>
              <a href="http://facebook.com" class="text-xs underline underline-offset-2"> Contacts</a>
              <a href="http://facebook.com" class="text-xs underline underline-offset-2"> About</a>
            </div>
            <!-- end of inline-group help center -->
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
</template>