<template>
  <router-link :to="`/job/${job.id}`">
    <v-card
      class="py-2 my-2"
      :key="job?.id"
      prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
    >
      <template v-slot:title>
        {{ job.title }}
      </template>
      <v-card-subtitle>{{ job.company?.name }} &middot; {{ job.company?.email }}</v-card-subtitle>
      <v-card-subtitle class="text-truncate">{{ job?.description }}</v-card-subtitle>
      <v-card-subtitle>
        <v-chip color="green" text-color="white">
          Python
        </v-chip>
        <v-chip color="green" text-color="white">
          Backend
        </v-chip>
        <v-chip v-if="job.type" color="green" text-color="white">
          {{ job.type }}
        </v-chip>
        <v-chip v-if="job.location" color="green" text-color="white">
          {{ job.location }}
        </v-chip>
      </v-card-subtitle>
      <template v-slot:append>
        <v-btn size="x-large" icon="mdi-bookmark-outline" variant="text" @click.prevent="bookmark(job)"></v-btn>
      </template>
    </v-card>
  </router-link>
</template>
<script lang="ts" setup>
import { Job } from '~~/models/graphql'
const props = withDefaults(defineProps<{ job: Job }>(), {})

const bookmark = (j: Job) => {}
</script>