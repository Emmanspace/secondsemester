<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const { data: dash } = await useFetch('http://127.0.0.1:8000/api/v1/intent/newest/' + route.params.id + '/')

</script>
<template >
<div>
    <NuxtLayout>
        <div class="absolute mx-28 mt-20">
            <div class="font-semibold text-lg tracking-wide text-gray-900 text-opacity-100">
                <p >
                  Dashboard 
                </p>
            </div>
            <!-- announcements -->
            <div class="mt-3 ">
                <h1 class="text-xl mb-1">Announcements</h1>
                <p>
                    {{ announce.title }} 
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

            <!-- elapsed time drop-down -->
            <div class="inline-flex space-x-6">
            <div class="mt-3">
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
                        <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Pick-Up </p>
                      </MenuItem>
                      <!-- <MenuItem v-slot="{ active }">
                        <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Time-Out: </p>
                      </MenuItem> -->
                    </div>
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Drop-Off </p>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <!-- end of drop-down -->
            <!-- purpose drop-down -->
            <div class="mt-3">
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
                        <!-- <MenuItem v-slot="{ active }"> -->
                          <MenuItem>
                          <p class="bg-gray-100 text-gray-900 block px-4 py-2 text-sm">Pick-Up </p>
                        </MenuItem>
                        <!-- <MenuItem v-slot="{ active }">
                          <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Time-Out: </p>
                        </MenuItem> -->
                      </div>
                      <div class="py-1">
                        <!-- <MenuItem v-slot="{ active }"> -->
                          <MenuItem>
                          <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Drop-Off </p>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
          </div>
        </div>
            <!-- end of purpose drop-down -->
            <!--. start of cards -->
          <div class="mt-7 relative">
            <ul class="inline-flex space-x-8 drop-shadow-md">
            <li class="relative h-60 w-60 border-2 border-gray-400 rounded-md flex items-end justify-center pb-6 tracking-widest">
                <span class="absolute top-0 right-auto mr-0 mt-12 text-9xl text-gray-500" >
                 {{dash.Total_parking_Slots}}
                </span>
                Total Parking Slots
              </li>
              <li class="relative h-60 w-60 border-2 border-gray-400 rounded-md flex items-end justify-center pb-6 tracking-widest" >
                <span class="absolute top-0 right-auto mr-0 mt-12 text-9xl text-gray-500">
                  {{dash.Vehicles_Parked}}
                </span>
                Vehicles Parked
              </li>
              <li class="relative h-60 w-60 border-2 border-gray-400 rounded-md flex items-end justify-center pb-6 tracking-widest">
                <span class="absolute top-0 right-auto mr-0 mt-12 text-9xl text-gray-500">
                  {{dash.Available_slots}}
                </span>
                Available Parking slots
              </li>
              <!-- <li class="h-64 w-64 border-2 border-gray-400 rounded-md flex items-end justify-center pb-3">Available parking slots</li> -->
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


