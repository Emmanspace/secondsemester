<script setup>
// imports
import {ref, onMounted} from 'vue'
import axios from 'axios'

const documents = ref([])
const licensePlate = ref('')

const { data: hist } = await useFetch('http://127.0.0.1:8000/history')

onMounted(async () => {
    let userEmail = localStorage.getItem('email');
    try {
        const response = await axios.get('http://127.0.0.1:8000/documents', {
            params: {
                email: userEmail
            }
        });
        documents.value = response.data;

        if (response.data.length > 0) {
            licensePlate.value = response.data[0].plate;
        }
    } catch (error) {
        console.error('Error fetching plate logs', error);
    }
});


useSeoMeta({
  title: 'Parking history',
  ogTitle: 'Parking history',
  description: 'Smart parking management system'
})
</script>
<template>
    <div>
    <NuxtLayout>
        <div class="absolute mx-28 mt-20">
            <div class="font-semibold inline-flex text-lg tracking-wide text-gray-900 text-opacity-100 space-x-2 items-center">
                <h1>
                    User's Parking History
                </h1> 
                <p> | </p>
                <h2 >
                    License Plate: {{ licensePlate }}
                </h2>
            </div>
            <!-- <div class="absolute">
                <p class=" flex justify-center font-light">
                    There are no history
                </p>
            </div> -->
    <!-- start of table -->
    <div class="relative overflow-x-auto mt-6 rounded-md">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-neutral-100 uppercase bg-[#802F2F]">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Confidence
                    </th>
                    
                    <th scope="col" class="px-6 py-3">
                        Plate
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Time
                    </th>
                </tr>
            </thead>
            <tbody>
                
                <tr class="bg-gray-100 border-b" v-for="document in documents" key="document.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r-2 border-gray-300">
                        {{document.confidence}}
                    </th>
                    <td class="px-6 py-4 text-gray-900 border-r-2 border-gray-300">
                        {{document.plate}}
                    </td>
                    <td class="px-6 py-4 text-gray-900 border-r-2 border-gray-300">
                        {{document.date}}
                    </td>
                    <td class="px-6 py-4 text-gray-900 border-r-2 border-gray-300">
                        {{document.time}}
                    </td>
                    <!-- <td class="px-6 py-4 text-gray-900">
                        {{job.date_formatted}}
                    </td>  -->
                </tr>
            </tbody>
        </table>
        
    </div>
    <!-- end of table -->
</div>
    </NuxtLayout>
</div>
</template>

