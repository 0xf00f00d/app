<template>
  <v-container v-if="pageLoading">
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2">
        <v-sheet min-height="300"></v-sheet>
        <v-sheet height="50" width="100" class="rounded-pill mt-2"></v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet min-height="1000" class="mb-2"></v-sheet>
        <!-- <v-sheet min-height="150" class="mb-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet>
        <v-sheet min-height="150" class="my-2"></v-sheet> -->
      </v-col>
      <v-col cols="12" sm="2">
        <v-sheet min-height="300"></v-sheet>
        <v-sheet height="50" width="100" class="rounded-pill mt-2"></v-sheet>
      </v-col>
      <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }} was added to bookmarks

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2">
        <v-form class="my-2">
          <v-text-field
            v-model="title"
            :counter="100"
            label="Title"
            required
            clearable
          ></v-text-field>
          <v-combobox
            label="Type"
            :items="['Full-time', 'Part-time']"
          ></v-combobox>
          <v-combobox
            label="Location"
            :items="['Onsite', 'Remote', 'Hybrid']"
          ></v-combobox>
          <v-combobox
            label="Experience"
            :items="['Junior', 'Intermediate', 'Senior']"
          ></v-combobox>
          <v-btn
            color="success"
            class="mr-4"
          >
            Search
          </v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" sm="4" v-if="dataLoading">
        loading..
      </v-col>
      <v-col cols="12" sm="4" v-else>
        <template v-for="(job, i) in jobs">
          <router-link :to="`/job/${job.id}`">
            <v-card
              class="py-2 my-2"
              :key="job.id"
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            >
              <template v-slot:title>
                {{ job.title }}
              </template>
              <v-card-subtitle>YourCompany &middot; YourCompany@example.com &middot; redactedemail@domain.com</v-card-subtitle>
              <v-card-subtitle>For those who code</v-card-subtitle>
              <v-card-subtitle>
                <v-chip color="green" text-color="white">
                  Python
                </v-chip>
                <v-chip color="green" text-color="white">
                  Backend
                </v-chip>
                <v-chip color="green" text-color="white">
                  Fulltime
                </v-chip>
                <v-chip color="green" text-color="white">
                  Remote
                </v-chip>
              </v-card-subtitle>
              <template v-slot:append>
                <v-btn size="x-large" icon="mdi-bookmark" variant="text"></v-btn>
              </template>
            </v-card>
          </router-link>
        </template>
      </v-col>

      <v-col cols="12" sm="2">
        <!-- <v-form class="my-2">
          <v-select
            label="Sort By"
            :items="['Date Posted', 'Title']"
          ></v-select>
          <v-select
            label="Sort Order"
            :items="['Ascending', 'Descending']"
          ></v-select>
          <v-btn
            color="success"
            class="mr-4"
          >
            Sort
          </v-btn>
        </v-form> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'
import gql from 'graphql-tag'

const name = ref('A')
const title = ref('')
const snackbar = ref(false)
const text = ref('Software Engineer')
const timeout = 2000
const user = useUserStore()
const { nhost } = useNhostClient()
const pageLoading = ref(true)
const dataLoading = ref(true)

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
// const { loading, result, error: gqErr } = useQuerySync(JOBS_QUERY)
const jobs = ref<{[key: string]: any}>([])
const token = useAccessToken()
const isAuthenticated = useAuthenticated()

definePageMeta({
  key: route => route.fullPath,
})

watchEffect(async () => {
  user.setNewName(name.value)
  console.log(
    needsEmailVerification.value,
    isLoading.value,
    isSuccess.value,
    isError.value,
    error.value
  )
  if (token.value) {
    nhost.graphql.setAccessToken(token.value as string)
    const { data, error: gqError } = await nhost.graphql.request(JOBS_QUERY)
    console.log('[data]: ', data)
    console.log('[error]: ', gqError)
    jobs.value = data.allJobs
    dataLoading.value = false
    // await onLogin(token.value as string)
  }
  /* if (!loading.value && !gqErr.value) {
    jobs.value = result.value.jobs
  }
  console.log(
    loading.value,
    result.value,
    gqErr.value,
  ) */
})

onMounted(async () => {
  pageLoading.value = false
  await signInEmailPassword('seeker@example.com', 'password')
  
  console.log('[isAuthenticated]: ', isAuthenticated.value)
})

function bookmark(e: any, j: any) {
  snackbar.value = true
  text.value = j.title
  e.preventDefault()
  e.stopPropagation()
}
</script>
