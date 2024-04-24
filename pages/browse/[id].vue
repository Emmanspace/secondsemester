<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'


import {ref, onMounted} from 'vue'
import axios from 'axios'

const events = {value: []}

const route = useRoute()
// const { data: dash } = await useFetch('http://127.0.0.1:8000/api/v1/intent/' + route.params.id + '/')
const {data: totalslot} = await useFetch('http://127.0.0.1:8000/api/v1/intent/total/')
const {data: available} = await useFetch('http://127.0.0.1:8000/api/v1/intent/available/')
const {data: parking} = await useFetch('http://127.0.0.1:8000/api/v1/intent/parking/')

const total_slots = ""
const available_slots = ""
const parking_slots = ""

useSeoMeta({
  title: 'University of the East',
  ogTitle: 'University of the East',
  description: 'Smart parking management system'
})


// added
const totalCount = ref()
const totalDecrementCount = ref()

const fetchTotalCount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/count_documents')
    totalCount.value = response.data.total_count
  } catch (error) {
    console.error('Error fetching total count', error)
  }
}

// for decrement
const fetchDecrementCount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/decrement_documents')
    totalDecrementCount.value = response.data.total_count-1
  } catch (error) {
    console.error('Error fetching total count', error) 
  }
}

// Function to reload the page
const refreshInterval = 10000
const reloadPage = () => {
  location.reload(); // Reload the page
}
// end of added

// for sse
const setupEventSource = async () => {
  try {
    // fetchTotalCount();
      // Create a new EventSource object to establish the SSE connection
      const eventSource = new EventSource('http://127.0.0.1:8000/sse')

    // Event listener for the 'initial_count' event
      eventSource.addEventListener('initial_count', (event) => {
        const initialCount = parseInt(event.data)
        totalCount.value = initialCount
        console.log("Received event:", initialCount)
    })

    // Event listener for the 'message' event (updates to total count)
    eventSource.addEventListener('message', (event) => {
      const newCount = parseInt(event.data)
      totalCount.value = newCount
      console.log("received update", newCount)
    })

    eventSource.addEventListener('error', (error) => {
      console.error('Error with SSE:', error)
    })

  } catch (error) {
    console.error('Error setting up SSE', error)
    throw error
  }
};



onMounted(() => {
  fetchTotalCount()
  fetchDecrementCount()
  // setupEventSource()
  // setTimeout(reloadPage, refreshInterval)
})


</script>
<template >
<div>
    <NuxtLayout>
        <div class="absolute mx-28 mt-20">
            <div class="font-semibold text-lg tracking-wide text-gray-900 text-opacity-100">
                <p>
                  Dashboard 
                </p>
            </div>
            <!-- announcements -->
            <div class="mt-3 ">
                <h1 class="text-xl mb-1">Announcement</h1>
                <p> 
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, odio. Laudantium laborum reiciendis ad quos temporibus dignissimos ut, culpa laboriosam obcaecati necessitatibus fuga optio consequatur tenetur ullam eius dicta id voluptatum mollitia nisi vel! Blanditiis adipisci itaque tempora animi enim eum totam, alias suscipit voluptate, maiores consequuntur minima beatae et.
                </p>
                <!-- border divider -->
                <div class="flex-grow border-b border-gray-900 pt-6"></div>
                <!-- end of border divider -->
            </div>
            <!-- end of announcements -->

            <!-- parking info -->
            <div>
                <h2 class="mt-3 text-xl mb-1">Parking information</h2>
            </div>



            <!-- commented -->
            <!-- elapsed time drop-down -->
            <!-- <div class="inline-flex space-x-6">
            <div class="mt-3">
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton class="inline-flex w-full justify-center rounded-sm bg-white px-2 py-1 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-gray-400 hover:bg-gray-100">
                        Elapsed Time
                        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </MenuButton>
                    </div>
                
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-900 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem>
                            <p class="bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Time-In: </p>
                          </MenuItem>
                          <MenuItem>
                            <p class="bg-gray-100 text-gray-900  block px-4 py-2 text-sm">Time-Out: </p>
                          </MenuItem>
                        </div>
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                        <MenuItem>
                            <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Elapsed Time: </p>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
            </div> -->
            <!-- end of drop-down -->
            <!-- purpose drop-down -->
            <!-- <div class="mt-3">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex w-full justify-center rounded-sm bg-white px-2 py-1 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-gray-400 hover:bg-gray-100">
                    Purpose
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </MenuButton>
                </div>
            
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-900 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <MenuItem>
                        <p class="bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Pick-Up </p>
                      </MenuItem>
                       <MenuItem v-slot="{ active }"> 
                        <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Time-Out: </p>
                      </MenuItem>
                    </div>
                    <div class="py-1">
                     <MenuItem v-slot="{ active }">
                        <MenuItem>
                        <p class="bg-gray-100 text-gray-900block px-4 py-2 text-sm">Drop-Off </p>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
          </div>
        </div> -->
            <!-- end of purpose drop-down -->
            <!--. start of cards -->
          <div class="mt-7 relative">
            <ul class="inline-flex space-x-8 drop-shadow-md">
            <li class="relative h-60 w-60 border-2 border-gray-400 rounded-md flex items-end justify-center pb-6 tracking-widest">
                <span class="absolute top-0 right-auto mr-0 mt-12 text-9xl text-gray-500">
                   <p>{{ totalCount }}</p>
                </span>
                Vehicles Parked
            </li>
            <li class="relative h-60 w-60 border-2 border-gray-400 rounded-md flex items-end justify-center pb-6 tracking-widest">
                <span class="absolute top-0 right-auto mr-0 mt-12 text-9xl text-gray-500">
                 <p>{{totalDecrementCount}}</p> 
                </span>
                Available Parking slots
            </li>
            </ul>
            <div class="flex-grow border-b border-gray-900 pt-6"></div>
          </div>
          <!-- end of cards -->
          <!-- end of parking info -->

            <!-- start of shortcuts -->
            <div>
              <h3 class="mt-3 text-xl">Shortcuts</h3>
              <!-- start of shortcut cards -->
              <div>
                <ul class="inline-flex space-x-4 pt-3 drop-shadow-md">
                  <NuxtLink to="/UserSettings"><li class="h-28 w-28 border-2 border-gray-400 flex items-end justify-center pb-2 text-xs">User Mangement</li></NuxtLink>
                  <NuxtLink to="/historytab"><li class="h-28 w-28 border-2 border-gray-400 flex items-end justify-center pb-2 text-xs">Parking History</li></NuxtLink>
                </ul>
              </div>
              <!-- end of shortcut cards -->
            </div>
            <!-- end of shortcuts -->
        </div>
    </NuxtLayout>
</div>
</template>


