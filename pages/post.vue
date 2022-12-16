<template>
  <v-container v-if="pageLoading">
    <div v-if="dark">
      <v-row>
        <v-col cols="12" sm="2">
          <v-sheet min-height="300"></v-sheet>
          <v-sheet height="50" width="100" class="rounded-pill mt-2"></v-sheet>
        </v-col>
        <v-col cols="12" sm="8">
          <v-sheet min-height="500" class="mb-2"></v-sheet>
        </v-col>
        <v-col cols="12" sm="2">
          <v-sheet min-height="300" class="outlined"></v-sheet>
          <v-sheet height="50" width="100" class="rounded-pill mt-2"></v-sheet>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="2">
          <v-sheet min-height="300" color="grey-lighten-3"></v-sheet>
          <v-sheet height="50" width="100" class="rounded-pill mt-2" color="grey-lighten-3"></v-sheet>
        </v-col>
        <v-col cols="12" sm="8">
          <v-sheet min-height="500" class="mb-2" color="grey-lighten-3"></v-sheet>
        </v-col>
        <v-col cols="12" sm="2">
          <v-sheet min-height="300" class="outlined" color="grey-lighten-3"></v-sheet>
          <v-sheet height="50" width="100" class="rounded-pill mt-2" color="grey-lighten-3"></v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="2"></v-col>

      <v-col cols="12" sm="8" v-if="dataLoading">
        <div class="d-flex justify-center mb-6">
          <v-progress-circular
            :size="70"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
      <v-col cols="12" sm="8" v-else>
        <v-form class="my-2">
          <v-text-field
            v-model="title"
            :counter="100"
            label="Title"
            required
            clearable
          ></v-text-field>
          <client-only>
            <editor theme="snow" toolbar="full" v-model:content="content" placeholder="job description" />
          </client-only>
          <!-- <v-textarea rows="15" label="Description"></v-textarea> -->
          <v-select
            label="Type"
            :items="[{ display: 'Full-time', value: 'full_time' }, { display: 'Part-time', value: 'part_time' }]"
            item-title="display"
            item-value="value"
            v-model="jobType"
          ></v-select>
          <v-select
            label="Location"
            :items="['On-site', 'Remote', 'Hybrid']"
            v-model="jobLocation"
          ></v-select>
          <v-select
            label="Experience"
            :items="['Junior', 'Intermediate', 'Senior']"
          ></v-select>
          <v-btn
            color="success"
            class="mr-4"
            variant="outlined"
          >
            Save
          </v-btn>
          <v-btn
            color="info"
            class="mr-4"
            @click.prevent="postJob"
          >
            Post Job
          </v-btn>
        </v-form>
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
import { useAuthenticated, useNhostClient, useAccessToken, useUserIsAnonymous, useUserRoles, useUserId, useUserDefaultRole, useUserData } from '@nhost/vue'
import { useTheme } from 'vuetify'

definePageMeta({
  middleware: ['protected'],
  key: route => route.fullPath,
})
useHead({
  title: 'Post Job | HeyJobs',
})

const theme = useTheme()
const { nhost } = useNhostClient()
const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const anonymous = useUserIsAnonymous()
const roles = useUserRoles()
const userId = useUserId()
const defaultRole = useUserDefaultRole()
const { getCompany, company, error } = useCompany()
const user = useUserData()

const editor = shallowRef()
const title = ref('')
const description = ref('')
const pageLoading = ref(true)
const dataLoading = ref(true)
const dark = ref(theme.current.value.dark)
const content = ref<any>()
const jobType = ref('')
const jobLocation = ref('')
const jobExperience = ref('')
const isEmployer = ref(false)

watchEffect(async () => {
  console.log('[anonymous]: ', anonymous.value)
  if (anonymous.value) {
    await navigateTo('/auth/login?redirectTo=my-jobs')
  }
  
  isEmployer.value = defaultRole.value === 'employer'
  if (defaultRole.value && isEmployer.value === false) {
    await navigateTo('/')
  }
  console.log('[isEmp]: ', defaultRole.value, isEmployer.value, user.value)
  if (token.value) {
    nhost.graphql.setAccessToken(token.value as string)
    dataLoading.value = false
  }
  console.log('[company]: ', company.value, error.value);
  
  if (content.value) {
    console.log('[content]: ', content.value);
    description.value = content.value.ops?.shift()?.insert
  }
})

onMounted(async () => {
  const { QuillEditor } = await import('@vueup/vue-quill')
  editor.value = QuillEditor
  pageLoading.value = false
  // dark.value = theme.current.value.dark
  console.log('[isAuthenticated]: ', isAuthenticated.value)
  await getCompany()
})

const saveDraft = async () => {
  const saveDraftMutation: any = gql`
  `
}

const postJob = async () => {
  const postJobMutation: any = gql`
    mutation postJobMutation($job: JobInput!, $user_id: uuid!) {
      postJob(arg: {job: $job, user_id: $user_id}) {
        title
        description
      }
    }
  `
  console.log('[desc]: ', description.value);
  
  const { data, error } = await nhost.graphql.request(postJobMutation, {
    user_id: userId.value,
    job: {
      title: title.value,
      description: description.value,
      company_id: company.value?.id,
      is_active: true,
      type: jobType.value,
      location: jobLocation.value,
    },
  })
  console.log('[data]: ', data);
  /* const postJobSub: any = gql`
    subscription postJobSubscription($id: uuid!) {
      postJob (id: $id) {
        output
        error
      }
    }
  `
  await nhost.graphql.request(postJobSub, { id: data.postJob }) */
  
  await navigateTo('/my-jobs')
}

</script>
