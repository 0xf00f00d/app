<template>
  <v-container v-if="pageLoading">
    <v-row>
      <v-col cols="12" sm="2"></v-col>
      <v-col cols="12" sm="2">
        <v-sheet min-height="300"></v-sheet>
        <v-sheet height="50" width="100" class="rounded-pill mt-2"></v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet min-height="700" class="mb-2"></v-sheet>
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
  <div v-else>
    <v-container v-if="isDefaultUser">
      <v-row>
        <v-col cols="12" sm="2"></v-col>
        <v-col cols="12" sm="2"></v-col>
        <v-col cols="12" sm="4">
          <v-sheet height="100" class="d-flex justify-center align-center">
            <div class="d-flex-col">
              Profile not set
              <v-btn>Update my profile</v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="2"></v-col>
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
            <v-btn
              v-if="isEmployer"
              color="info"
              class="mr-4"
              @Click.prevent="postJob"
            >
              Post Job
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="12" sm="4" v-if="dataLoading">
          <div class="d-flex justify-center mb-6">
            <v-progress-circular
              :size="70"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-col>
        <v-col cols="12" sm="4" v-else>
          <template v-for="(job, i) in jobs" v-if="jobs.length > 0">
            <router-link :to="`/job/${job.id}`">
              <v-card
                class="py-2 my-2"
                :key="job.id"
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              >
                <template v-slot:title>
                  {{ job.title }}
                </template>
                <v-card-subtitle>{{ job.company.name }} &middot; {{ job.company.email }}</v-card-subtitle>
                <v-card-subtitle>{{ job.description }}</v-card-subtitle>
                <v-card-subtitle>
                  <v-chip color="green" text-color="white">
                    Python
                  </v-chip>
                  <v-chip color="green" text-color="white">
                    Backend
                  </v-chip>
                  <v-chip v-if="job.company.type" color="green" text-color="white">
                    {{ job.company.type }}
                  </v-chip>
                  <v-chip v-if="job.company.location" color="green" text-color="white">
                    {{ job.company.location }}
                  </v-chip>
                </v-card-subtitle>
                <template v-slot:append>
                  <v-btn size="x-large" icon="mdi-bookmark" variant="text"></v-btn>
                </template>
              </v-card>
            </router-link>
          </template>
          <template v-else>
            <empty-state></empty-state>
          </template>
        </v-col>
        <v-col cols="12" sm="2"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { GraphqlRequestResponse } from '@nhost/nhost-js';
import { useAuthenticated, useNhostClient, useAccessToken, useUserIsAnonymous, useSignInAnonymous, useUserRoles, useUserDefaultRole, useUserId } from '@nhost/vue'
import { Companies } from '~~/models/graphql';

definePageMeta({
  middleware: ['protected'],
  key: route => route.fullPath,
})
useHead({
  title: 'My Jobs | HeyJobs',
})
const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const anonymous = useUserIsAnonymous()
const { signInAnonymous } = useSignInAnonymous()
const router = useRouter()
const { nhost } = useNhostClient()
const role = useUserDefaultRole()
const { getCompany, company, error } = useCompany()
const userId = useUserId()
const isEmployer = useIsEmployer()
const isSeeker = useIsSeeker()
const isDefaultUser = useIsDefaultUser()

const name = ref('A')
const title = ref('')
const snackbar = ref(false)
const text = ref('Software Engineer')
const timeout = 2000
const pageLoading = ref(true)
const dataLoading = ref(true)
const companyData = ref<Companies>()

const JOBS_QUERY: any = gql`
  query MyJobs($company_id: uuid!) {
    jobs(order_by: { created_at: desc }, where: { company_id: { _eq: $company_id }}) {
      id
      title
      description
      type
      location
      company {
        name
        email
      }
    }
  }
`
const APPS_QUERY: any = gql`
  query MyApplications($filter: MyJobsQueryInput) {
    myApplications(filter: $filter) {
      id
      title
      description
      type
      location
      company {
        name
        email
      }
    }
  }
`
const jobs = ref<{[key: string]: any}>([])
const response = ref<GraphqlRequestResponse<any>>()
const isAnon = ref<boolean>()

watchEffect(async () => {
  isAnon.value = anonymous.value
  console.log('[anonymous]: ', anonymous.value, isAuthenticated.value)
  if (anonymous.value) {
    navigateTo('/')
  }
  console.log('[company]: ', company.value);
  
  if (token.value) {
    nhost.graphql.setAccessToken(token.value as string)
    dataLoading.value = false
    if (isDefaultUser) {
      navigateTo('/auth/post-signup')
    }
    console.log('[role]: ', isEmployer, isSeeker);
    
    if (isEmployer && company.value) {
      response.value = await nhost.graphql.request(JOBS_QUERY, {
        company_id: company.value?.id,
      })
      const { data, error: gqError } = response.value
      console.log('[data]: ', data)
      console.log('[error]: ', gqError)
      jobs.value = data.jobs
    }

  }
  if (isSeeker) {
    response.value = await nhost.graphql.request(APPS_QUERY, {
      filter: {
        user_id: userId.value,
      },
    })
    const { data: gqAppsData, error: gqAppsError } = response.value
    console.log('[apps]: ', gqAppsData);
    console.log('[apps_err]: ', gqAppsError);
    jobs.value = gqAppsData.myApplications
    
  }
})

onMounted(async () => {
  if (anonymous.value) {
    navigateTo('/auth/login?redirectTo=my-jobs')
  }
  pageLoading.value = false
  await getCompany()
})

const postJob = async () => {
  await navigateTo('/post')
}
const browse = async () => {
  await navigateTo('/')
}
</script>
