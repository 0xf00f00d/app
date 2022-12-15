<template>
  <v-container v-if="pageLoading">
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="4">
        <v-sheet min-height="500" class="mb-2"></v-sheet>
      </v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="4">
        <v-card class="px-2 py-2">
          <div class="text-h5 text-center">I am</div>
          <v-btn
            class="mr-4 my-4"
            color="primary"
            variant="elevated"
            block
            @click.prevent="continueAsSeeker"
          >
            Looking for a Job
          </v-btn>
          <v-btn
            variant="outlined"
            class="mr-4"
            size="large"
            block
            @click.prevent="continueAsEmployer"
          >
            Hiring Job Seekers
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useNhostClient, useAccessToken, useUserId, useUserDisplayName, useUserEmail } from '@nhost/vue'
import gql from 'graphql-tag'

useHead({
  title: 'Post sign up',
})

definePageMeta({
  key: route => route.fullPath,
  layout: 'auth',
})

const pageLoading = ref(true)

const token = useAccessToken()
const { nhost } = useNhostClient()
const userId = useUserId()
const name = useUserDisplayName()
const email = useUserEmail()

watchEffect(async () => {
})

onMounted(async () => {
  pageLoading.value = false
})

const continueAsSeeker = async () => {
  const SEEKER_SIGNUP_QUERY: any = gql`
    mutation Seeker($arg: SeekerProfileInput!) {
      registerAsSeeker(arg: $arg) {
        name
        email
      }
    }
  `
  const { data, error: gqError } = await nhost.graphql.request(SEEKER_SIGNUP_QUERY, {
    arg: {
      user_id: userId.value,
      name: name.value,
      email: email.value,
    },
  })
  console.log('[seeker#data]: ', data)
}
const continueAsEmployer = async () => {
  const EMPLOYER_SIGNUP_QUERY: any = gql`
    mutation Employer($arg: EmployerProfileInput!) {
      registerAsEmployer(arg: $arg) {
        name
        email
      }
    }
  `
  const { data, error: gqError } = await nhost.graphql.request(EMPLOYER_SIGNUP_QUERY, {
    arg: {
      employer_id: userId.value,
      name: name.value,
      email: email.value,
    },
  })
  console.log('[employer#data]: ', data)
  
}
</script>
  