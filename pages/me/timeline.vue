<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
      </v-col>
      <v-col cols="12" sm="2">
        <v-card width="250" class="float-right my-2" rounded>
          <v-list :items="items"></v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="d-flex justify-center mb-6">
          <v-card
            class="py-2 my-2 justify-center"
            width="100%"
          >
            <template v-slot:title>
              <div class="text-h3">Career Timeline</div>
            </template>
            <v-card-subtitle class="text-subtitle-1">
              <em>No history</em>
            </v-card-subtitle>
            <v-container>
              <v-timeline align="start">
                <v-timeline-item
                  v-for="(year, i) in years"
                  :key="i"
                  :dot-color="year.color"
                  size="small"
                >
                  <template v-slot:opposite>
                    <div
                      :class="`pt-1 headline font-weight-bold text-${year.color}`"
                      v-text="year.year"
                    ></div>
                  </template>
                  <div>
                    <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
                      Lorem ipsum
                    </h2>
                    <div>
                      Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
            <v-card-actions>
              <v-btn
                size="x-large"
                color="primary"
                variant="elevated"
                class="m-2"
              >
                Add entry
              </v-btn>
              <!-- <v-btn
                size="x-large"
                color="default"
                variant="outlined"
                class="m-2"
              >
                Apply Now
              </v-btn> -->
              <v-spacer />
            </v-card-actions>
            <!-- <template v-slot:append>
              <v-btn size="x-large" icon="mdi-bookmark-outline" variant="text"></v-btn>
            </template> -->
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" sm="2">
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken, useUserData } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'
import gql from 'graphql-tag'

const name = ref('A')
const title = ref('')
// const router = useRouter()
const user = useUserStore()
const { getToken, onLogin } = useApollo()
const { nhost } = useNhostClient()
const years = [
  {
    color: 'cyan',
    year: '1960',
  },
  {
    color: 'green',
    year: '1970',
  },
  {
    color: 'pink',
    year: '1980',
  },
  {
    color: 'amber',
    year: '1990',
  },
  {
    color: 'orange',
    year: '2000',
  },
]
const items = [
  { type: 'subheader', title: 'Profile Actions' },
  {
    title: 'View Applications',
    value: 1,
  },
  {
    title: 'Timeline',
    value: 2,
  },
  {
    title: 'Edit Profile',
    value: 3,
  },
  {
    title: 'Upload Resume',
    value: 4,
  },
  {
    title: 'Sign Out',
    value: 5,
  },
]
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
      title
    }
  }
`
// const { loading, result, error: gqErr } = useQuerySync(JOBS_QUERY)
const jobs = ref<{[key: string]: any}>([])
const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const userData = useUserData()

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
    await onLogin(token.value as string)
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
  await signInEmailPassword('seeker@example.com', 'password')
  
  console.log('[isAuthenticated]: ', isAuthenticated.value)
  
})
</script>
