<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(() => {
  userStore.initStore()
})
</script>

<template>
  <div>
    <NuxtPage>
    </NuxtPage>
    <!-- <NuxtLayout> -->
      <!-- <NuxtPage/> -->
    <!-- </NuxtLayout> -->
  </div>
</template>
