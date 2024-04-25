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
                    <input name="first_name" v-model="firstName" type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>

                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Last name</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input name="last_name" v-model="lastName" type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>


                  <div class="flex items-center justify-between space-x-40 ">
                    <label for="password" class="block text-md font-medium leading-3 text-[#D9D9D9] font-sans">Plate Number</label>
                    <div class="text-sm">
                      <p class="text-[#D9D9D9] font-extralight px-12"></p>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input name="plate" v-model="plate"  type="text"  required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>

                </div>
                <div v-if="errors.length" class="error-messages">
        <p v-for="error in errors" :key="error">
          {{ error }}
        </p>
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

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' 

const router = useRouter()
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const plate = ref('')
const errors = ref([])

const submitForm = async () => {
  console.log(
  email.value,
  password.value,
  firstName.value,
  lastName.value,
  plate.value)
    const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', {
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      plate: plate.value
    })
    console.log(response.data)

    // Assuming the backend returns JWT tokens upon successful login
    const tokens = response.data
    // Store the tokens in local storage or Vuex store for future requests
    localStorage.setItem('refreshToken', tokens.refresh)
    localStorage.setItem('accessToken', tokens.access)
    // Redirect to a protected route or dashboard
    router.push('/login')
    console.log('Logged in successfully')
}
</script>