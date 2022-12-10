<template>
  <v-container v-if="pageLoading">
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="4">
        <v-sheet min-height="500" class="mb-2"></v-sheet>
        <!-- <v-sheet min-height="150" class="mb-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet> -->
      </v-col>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2"></v-col>
      <!-- <v-col cols="12" sm="4" v-if="dataLoading">
        <div class="d-flex justify-center mb-6">
          <v-progress-circular
            :size="70"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col> -->
      <v-col cols="12" sm="4">
        <v-card class="px-2 py-2">
          <!-- <v-form disabled>
            <v-text-field
              v-model="email"
              :counter="100"
              label="Email"
              required
              clearable
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :counter="100"
              label="Password"
              required
              clearable
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :counter="100"
              label="Repeat password"
              required
              clearable
              type="password"
            ></v-text-field>
            <v-btn
              color="success"
              class="mr-4"
              disabled
            >
              Log In
            </v-btn>
            <v-btn
              color="default"
              variant="outlined"
              class="mr-4"
              disabled
            >
              Sign Up
            </v-btn>
          </v-form> -->
          <v-btn
            class="mr-4 my-4"
            prepend-icon="mdi-linkedin"
            variant="outlined"
            block
            :href="linkedin"
          >
            LinkedIn
          </v-btn>
          <v-btn
            variant="outlined"
            class="mr-4"
            size="large"
            prepend-icon="mdi-github"
            block
            :href="github"
          >
            GitHub
          </v-btn>
          <v-btn
            variant="outlined"
            class="mr-4"
            size="large"
            prepend-icon="mdi-google"
            block
            :href="google"
          >
            Google
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken, useProviderLink } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'
import gql from 'graphql-tag'

const { linkedin, github, google } = useProviderLink()
const { nhost } = useNhostClient()
const pageLoading = ref(true)
const dataLoading = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const {
  signInEmailPassword,
  needsEmailVerification,
  isLoading,
  isSuccess,
  isError,
  error
} = useSignInEmailPassword()
const JOBS_QUERY: any = gql`
  query Jobs {
    allJobs {
      id
      title
      company {
        name
        email
      }
    }
  }
`
const token = useAccessToken()

async function logIn() {
  await signInEmailPassword(email, password)
}

useHead({
  title: 'Log In | HeyJobs',
})

definePageMeta({
  key: route => route.fullPath,
  layout: 'auth',
})

watchEffect(async () => {
})

onMounted(async () => {
  pageLoading.value = false
})
</script>
  