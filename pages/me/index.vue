<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
      </v-col>
      <v-col cols="12" sm="2">
        <v-card width="250" class="float-right my-2" rounded>
          <v-list>
            <v-list-item v-for="item in items" :title="item.title" @click.prevent="item.click"></v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <div class="d-flex justify-center mb-6">
          
          <v-card
            class="py-2 my-2 justify-center"
          >
            <template v-slot:title>
              <v-avatar :image="userData?.avatarUrl"></v-avatar>
              {{ userData?.displayName }}
            </template>
            <v-card-subtitle class="text-subtitle-1">
              {{ userData?.email }}
              <v-chip v-if="userData?.emailVerified" color="green">verified</v-chip>
            </v-card-subtitle>
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
            <v-card-subtitle class="text-wrap text-body-1">
              <p class="my-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula ligula vitae bibendum blandit. Nullam auctor iaculis efficitur. Vivamus dapibus aliquet orci et laoreet. Nullam arcu neque, tincidunt et ante vitae, volutpat imperdiet ligula. Nulla tellus purus, pulvinar id blandit fringilla, placerat eget leo. Nulla elementum mauris leo, sit amet vulputate leo dictum et. Donec egestas sagittis nisl nec elementum. Donec dignissim efficitur massa, in ultrices elit suscipit a. Vestibulum vestibulum ullamcorper eros, a rutrum urna congue vitae. Aenean faucibus nibh nibh.
              </p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                size="x-large"
                color="primary"
                variant="elevated"
                class="m-2"
              >
                Quick Apply
              </v-btn>
              <v-btn
                size="x-large"
                color="default"
                variant="outlined"
                class="m-2"
              >
                Apply Now
              </v-btn>
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

const home = async () => {
  await router.push('/')
}

const items = [
  { type: 'subheader', title: 'Profile Actions' },
  {
    title: 'Edit Profile',
    click: home,
    value: 1,
  },
  {
    title: 'View Applications',
    click: home,
    value: 2,
  },
  {
    title: 'Timeline',
    link: true,
    click: async () => {
      await router.push('/me/timeline')
    },
    value: 3,
  },
  {
    title: 'Upload Resume',
    click: home,
    value: 4,
  },
  {
    title: 'Sign Out',
    click: home,
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
const router = useRouter()

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
