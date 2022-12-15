<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
      </v-col>
      <v-col cols="12" sm="2">
        <v-card width="250" class="float-right my-2" rounded v-if="isEmployer">
          <v-list>
            <v-list-item>Job Actions</v-list-item>
            <div v-for="item in items">
              <v-list-item v-if="item.roles && item.roles.includes(defaultRole!)" :title="item.title" @click.prevent="item.click"></v-list-item>
              <v-list-item v-else :title="item.title" @click.prevent="item.click"></v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="d-flex justify-center mb-6">
          
          <v-card
            class="py-2 my-2 justify-center"
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          >
            <template v-slot:title>
              Software Engineer
            </template>
            <v-card-subtitle class="text-subtitle-1">YourCompany &middot; YourCompany@example.com</v-card-subtitle>
            <v-card-subtitle class="my-2">
              <v-chip class="mr-1">
                Python
              </v-chip>
              <v-chip class="mx-1">
                Backend
              </v-chip>
              <v-chip class="mx-1">
                Fulltime
              </v-chip>
              <v-chip class="mx-1">
                Remote
              </v-chip>
            </v-card-subtitle>
            <template v-slot:append>
              <v-btn size="x-large" icon="mdi-bookmark-outline" variant="text"></v-btn>
            </template>
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" sm="2">
      </v-col> -->
    </v-row>
  </v-container>
</template>
  
<script lang="ts" setup>
import { useUserDefaultRole } from '@nhost/vue'

useHead({
  title: 'Career Timeline | HeyJobs',
})

const home = async () => {
  await navigateTo('/')
}

const defaultRole = useUserDefaultRole()
const isEmployer = useIsEmployer()

const items = [
  {
    title: 'View Applicants',
    value: 1,
    click: home,
    roles: ['employer'],
  },
  {
    title: 'Edit Job',
    value: 2,
    click: home,
    roles: ['user'],
  },
  {
    title: 'Close Job',
    value: 3,
    click: home,
    roles: ['user'],
  },
]

watchEffect(async () => {
  if (!isEmployer) {
    await navigateTo('/')
  }
})

onMounted(async () => {
})
</script>
  