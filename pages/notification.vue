<script setup>
const route = useRoute()

const {data: notif} = await useFetch('http://127.0.0.1:8000/notification/')
// const { data: hist } = await useFetch('http://127.0.0.1:8000/api/v1/intent/newest/')
// const {data: parking} = await useFetch('http://127.0.0.1:8000/api/v1/intent/total/')

</script>

<template>
    <div>
    <NuxtLayout>
        <div class="absolute mx-28 mt-20 w-full">
            <div class="font-semibold text-lg tracking-wide text-gray-900 text-opacity-100">
                <h1 >
                    Notifications
                </h1>
            </div>
            <div class="flex"
             v-for="job in notif" 
            v-bind:key="job.notification">
                <p class="flex font-light">{{job.notification}}</p>
            </div>

            <!-- for sample -->
            <!-- <div class="flex" 
            v-for="park in parking"
            >
            <p>{{park.total_slots}}</p>
            </div> -->
            <!-- end -->
            <!-- this sample actually saved my life <3 -->
            </div>
            
    </NuxtLayout>
</div>
</template>