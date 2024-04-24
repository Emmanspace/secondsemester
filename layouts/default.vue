<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const route = useRoute()
// const { data: jobs } = await useFetch('http://127.0.0.1:8000/api/v1/intent/newest/')
// const { data: dash } = await useFetch('http://127.0.0.1:8000/api/v1/intent/' + route.params.id + '/')

const props = defineProps({
    my: {
        type:[Boolean]
    },
    job:{
        type: [Object]
    }
})

function logout() {
    userStore.removeToken()
}

useSeoMeta({
  title: 'University of the East',
  ogTitle: 'University of the East',
  description: 'Smart parking management system'
})
</script>
<template>
    <slot/>
    <!-- navbar -->
    <div class="flex justify-between border-b-2 border-black bg-neutral-200">
        
        <!-- <div class="inline-flex space-x-2 items-center"> -->
            <!-- logo and dashboard title -->
            <div class="inline-flex items-center space-x-2 order-first ml-0">
            <img src="assets/pngue.png" alt="warriors" class="h-12 w-12 ml-4 my-2">
            <p class="font-medium text-3xl font-serif">University of the East</p>
            </div>
            <!-- end of logo and dashboard title -->
        </div> 
        
        <!-- end of navbar -->
<!-- start of sidebar -->
<div class="h-screen flex flex-col w-fit px-2 py-3 items-center bg-[#802F2F]">

    <NuxtLink to="/login" class="flex flex-col items-center">
        <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd"/>
        </svg>
        <span class="text-white font-light text-md">Account</span>
    </NuxtLink>

    <NuxtLink to="/browse/1" class="flex flex-col items-center">
        <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 2a7 7 0 0 0-.5 0 1 1 0 0 0-1 1v8c0 .6.4 1 1 1h8c.5 0 1-.4 1-1v-.5A8.5 8.5 0 0 0 13.5 2Z"/>
            <path d="M11 6a1 1 0 0 0-1-1 8.5 8.5 0 1 0 9 9 1 1 0 0 0-1-1h-7V6Z"/>
        </svg>
        <span class="text-white font-light text-md">Dashboard</span>
    </NuxtLink>

    <NuxtLink to="/HistoryTab" class="flex flex-col items-center">
        <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z" clip-rule="evenodd"/>
        </svg>
        <span class="text-white font-light text-md">History</span>
    </NuxtLink>

    <NuxtLink to="/notification" class="flex flex-col items-center">
        <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.1 12.6v-1.8A5.4 5.4 0 0 0 13 5.6V3a1 1 0 0 0-2 0v2.4a5.4 5.4 0 0 0-4 5.5v1.8c0 2.4-1.9 3-1.9 4.2 0 .6 0 1.2.5 1.2h13c.5 0 .5-.6.5-1.2 0-1.2-1.9-1.8-1.9-4.2ZM8.8 19a3.5 3.5 0 0 0 6.4 0H8.8Z"/>
        </svg>
        <span class="text-white font-light text-md">Notifications</span>
    </NuxtLink>
    
    <NuxtLink to="/UserSettings" class="flex flex-col items-center">
        <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clip-rule="evenodd"/>
        </svg>
        <span class="text-white font-light text-md">User settings</span>
    </NuxtLink>

    <!-- Toggle button -->
    <!-- <button type="button" class="flex flex-col items-center">
        <div class="absolute bottom-0">
            <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
            </svg>
        </div>
    </button>   -->

    <!-- logout button -->
    <div>
        <template v-if="userStore.user.isAuthenticated">
            <NuxtLink to="/login" class="flex flex-col items-center">
                <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clip-rule="evenodd"/>
                </svg>
                <span class="text-white font-light text-md">Log-out</span>
            </NuxtLink>
            </template>
        
            <template v-else>
                <NuxtLink to="/login" class="flex flex-col items-center">
                    <svg class="my-2 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-white font-light text-md">Log-in</span>
                </NuxtLink>
            </template>
    </div>
</div>
<!-- end of sidebar -->
 <!-- floating help center -->
 <div class="flex float-right mr-6 -mt-12 drop-shadow-lg sticky bottom-4">
    <a href="#">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 drop-shadow-lg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      </span>
    </a>
  </div>
  <!-- end of floating help center -->
<!-- footer -->
<footer>
    <p class="flex font-light justify-center mb-2 -mt-7">Copyright (c) 2024 - University of the East</p>
</footer>
<!-- end of footer -->

<!-- </div> -->
</template>
