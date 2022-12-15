<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
      </v-col>
      <v-col cols="12" sm="2">
        <v-card width="250" class="float-right my-2" rounded>
          <v-list v-if="isEmployer">
            <v-list-item>Job Actions</v-list-item>
            <div v-for="item in employerItems" v-if="isEmployer">
              <v-list-item v-if="item.roles && item.roles.includes(defaultRole!)" :title="item.title" @click.prevent="item.click"></v-list-item>
              <v-list-item v-else :title="item.title" @click.prevent="item.click"></v-list-item>
            </div>
          </v-list>
          <v-list v-else>
            <v-list-item class="text-body-1 font-weight-bold">Application Status</v-list-item>
            <v-list-item>No applications for this job</v-list-item>
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
            <v-card-subtitle class="text-wrap text-body-1">
              <p class="my-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula ligula vitae bibendum blandit. Nullam auctor iaculis efficitur. Vivamus dapibus aliquet orci et laoreet. Nullam arcu neque, tincidunt et ante vitae, volutpat imperdiet ligula. Nulla tellus purus, pulvinar id blandit fringilla, placerat eget leo. Nulla elementum mauris leo, sit amet vulputate leo dictum et. Donec egestas sagittis nisl nec elementum. Donec dignissim efficitur massa, in ultrices elit suscipit a. Vestibulum vestibulum ullamcorper eros, a rutrum urna congue vitae. Aenean faucibus nibh nibh.
              </p>
              <p class="my-1">
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla pharetra nec quam non pharetra. In hac habitasse platea dictumst. Maecenas et sagittis nisi. Ut gravida massa leo, vitae semper urna pulvinar in. Proin semper finibus dictum. Phasellus est ex, molestie eget risus sed, pharetra dictum eros. Integer vel sapien risus. Curabitur massa eros, cursus eget hendrerit vel, vulputate sed justo. Ut tristique sodales erat, vitae mollis magna rhoncus id. Suspendisse pulvinar vulputate iaculis. Proin nibh lectus, ultricies vitae convallis ac, porttitor id eros. Duis convallis dignissim neque, at faucibus lacus suscipit at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sodales maximus eros, vitae tempor erat ornare a.
              </p>
              
              <p class="my-1">
                Nulla facilisi. Nulla vel massa lectus. Maecenas fringilla eros et leo aliquet, convallis efficitur risus cursus. Suspendisse et tellus non odio rhoncus euismod. Quisque in dolor neque. Ut elit dolor, pellentesque porta odio ut, sollicitudin interdum ante. Suspendisse dignissim interdum accumsan.
              </p>

              <p class="my-1">
                Aenean dictum laoreet nisl vitae euismod. Vivamus sem lorem, lacinia sed lacinia at, viverra a felis. Maecenas id ullamcorper purus. Pellentesque lobortis, ipsum id dictum bibendum, arcu metus sodales eros, bibendum egestas sem est venenatis elit. Phasellus semper dolor justo, porta posuere risus feugiat ac. Suspendisse sodales felis vel sagittis aliquet. Maecenas congue, quam at gravida interdum, nibh ligula feugiat felis, quis molestie mauris nisl vel enim. Nulla pulvinar felis in magna varius eleifend. Suspendisse at tellus vitae est placerat viverra nec et nisi. Pellentesque metus libero, efficitur a tortor et, volutpat rutrum enim. Cras bibendum in tortor non fringilla. Pellentesque tellus orci, pulvinar ut tristique in, mollis in sapien.
              </p>

              <p class="my-1">
                Integer ac massa eu lacus mollis dapibus. Pellentesque tortor leo, egestas eget leo eu, feugiat mattis turpis. Proin sollicitudin pretium dolor, eget rutrum ex mattis et. Integer ex lacus, venenatis sed lacus pharetra, rhoncus vulputate ipsum. Aliquam iaculis est a mauris ornare, sed ultricies neque euismod. Donec ut consequat magna. Curabitur condimentum malesuada pellentesque. Mauris sit amet auctor tortor, sed semper ex. Aliquam sit amet vehicula dui. Quisque elementum metus nibh, ac dapibus odio vehicula eget. Integer ac lacinia metus. Aenean varius purus massa.
              </p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                v-if="!hasApplication"
                size="x-large"
                color="primary"
                variant="elevated"
                class="m-2"
                @click.prevent="quickApply()"
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
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken, useUserDefaultRole, useUserId } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'
import gql from 'graphql-tag'
import { Job } from '~~/models/graphql';

const router = useRouter()

const home = async () => {
  await navigateTo('/')
}

const name = ref('A')
const title = ref('')
// const router = useRouter()
const user = useUserStore()
const { getToken, onLogin } = useApollo()
const { nhost } = useNhostClient()
const defaultRole = useUserDefaultRole()

const employerItems = [
  {
    title: 'View Applicants',
    value: 1,
    click: async () => {
      await router.push('applicants')
    },
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
const seekerItems = [
  {
    title: 'Pending',
    roles: ['seeker'],
  },
  {
    title: 'Approved',
    roles: ['seeker'],
  },
  {
    title: 'Rejected',
    roles: ['seeker'],
  },
]
const jobs = ref<{[key: string]: any}>([])
const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const route = useRoute()
const userId = useUserId()
const jobId = ref<string>()
const hasApplication = ref(false)
const isEmployer = useIsEmployer()
const isSeeker = useIsSeeker()
const job = ref<any>()

const JOB_QUERY: any = gql`
  query JobQuery($id: uuid!, $arg: JobUserInput!) {
    jobs(where: { id: { _eq: $id }}) {
      id
      title
      description
      location
      type
      is_active
      company {
        name
        email
      }
    }
    hasApplication(arg: $arg) {
      found
    }
  }
`

const quickApply = async () => {
  console.log('[route]: ', route);
  const QUICK_APPLY: any = gql`
    mutation QuickApply($args: JobUserInput!) {
      applyJob(args: $args) {
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
  const { data, error } = await nhost.graphql.request(QUICK_APPLY, {
    args: {
      job_id: jobId.value,
      user_id: userId.value,
    },
  })
}

watchEffect(async () => {
  console.log('[route]: ', route);
  if (job.value) {
    hasApplication.value = job.value.data.hasApplication.found
  }
})

onMounted(async () => {
  jobId.value = route.params.id as string
  job.value = await nhost.graphql.request(JOB_QUERY, {
    id: jobId.value,
    arg: {
      job_id: jobId.value,
      user_id: userId.value,
    }
  })
  console.log('[jobData]: ', job.value);
})
</script>
  