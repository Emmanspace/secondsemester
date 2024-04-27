<script setup>
import {ref, onMounted, computed} from 'vue'
import axios from 'axios'
import {useUserStore} from '@/stores/user'
const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const errors = ref([])

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    plate: ''
})

async function getProfileData() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
        const userData = await response.data
        user.value = userData
    } catch (error) {
        errors.value.push(`Error fetching profile data: ${error.message}`)
    }
}

async function UpdateProfile(){
    const url = 'http://127.0.0.1:8000/api/v1/users/me/'

    try
    {
        const data = {
            first_name: user.value.first_name,
            last_name: user.value.last_name,
            email: user.value.email,
            plate: user.value.plate
        };

        const response = await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`, // Include authorization token if applicable
            },
            body: JSON.stringify(data),
        });

        if (!response.ok)
        {
            throw new Error (`Error updating profile: ${response.statusText}`);
        }

        const userData = await response.json();
        user.value = userData; // Update the user data after successful update
        router.push('/usersettings')
    }
    catch(error){
        errors.value.push(`Error updating profile: ${error.message}`);
    }
}

onMounted(getProfileData)
</script>
<template>
    <div>
        <NuxtLayout>
            <div class="absolute mx-28 mt-20">
                <div class="font-semibold text-lg tracking-wide text-gray-900">
                    <p>
                        User settings 
                        <!-- Hello{{ useRuntimeConfig().public.HELLO }} -->
                    </p>
                    <p class="font-light">
                        Change your profile and account settings.
                    </p>
                </div>

                <div class="mt-8 py-3 bg-gray-100 border-1 rounded-lg flex">
                    <div class="flex flex-1  ">
                        <!-- start of  general information-->
                        <div class="mx-10 py-5">
                            <h1 class="font-semibold text-lg"> General Information</h1>
                            <!-- start of settings -->
                            <div class="mt-4 ml-6 mr-0 mb-0">
                                <form @submit.prevent="UpdateProfile">
                                    <!-- start of license list -->
                                    <!-- <ul class="space-y-4">
                                        <li>
                                            <p class="font-semibold">License plate number</p>
                                            <input v-model="licensePlate" type="text" placeholder="ABC 1234" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                        <li>
                                            <p class="font-semibold">Status</p>
                                            <input v-model="status" type="text" placeholder="Pending" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                    </ul> -->
                                    <!-- end of license list -->
                
                                    <!-- start of personal information list -->
                                    <h2 class="pt-10 text-lg font-semibold">Personal Information</h2>
                                    <ul class="space-y-8 mt-3 columns-1 space-x-1 pr-3">
                                        <li class="pr-8">
                                            <p class="font-semibold">First Name</p>
                                            <input v-model="user.first_name" type="text" placeholder="First Name" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                        <li>
                                            <p class="font-semibold">Last Name</p>
                                            <input v-model="user.last_name" type="text" placeholder="Last Name" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                        <li>
                                            <p class="font-semibold">Email Address</p>
                                            <input v-model="user.email" type="email" placeholder="Email Address" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                        <li>
                                            <p class="font-semibold">Plate Number</p>
                                            <input v-model="user.plate" type="text" placeholder="Plate Number" class="px-2 py-1 text-sm rounded-md">
                                        </li>
                                    </ul>
                                    <!-- end of personal information list -->
                
                                    <!-- CTA buttons -->
                                    <div class="flex justify-end mt-6">
                                        <ul class="inline-flex space-x-3">
                                            <li class="border rounded-md bg-neutral-200 px-1 py-1">
                                                <button type="button" @click="cancelChanges">Cancel</button>
                                            </li>
                                            <li class="border rounded-md bg-[#802F2F] px-1.5 py-1 text-white">
                                                <button type="submit">Save changes</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- end of CTA buttons -->
                                </form>
                            </div>
                            <!-- end of settings -->
                        </div>
                        <!-- end of general information -->
                    </div>
                </div>                
                </div>

                <div v-if="errors.length>0" class="text-red-500">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>

                </div>
        </NuxtLayout>
    </div>
</template>
