<template>
  <v-container v-if="pageLoading">
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet min-height="200" width="250" class="float-right"></v-sheet>
      </v-col>
      <v-col cols="12" sm="6">
        <v-sheet min-height="500" class="mb-2"></v-sheet>
      </v-col>
      <v-col cols="12" sm="3"></v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card width="250" class="float-right my-2" rounded>
          <v-list :items="items"></v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="d-flex justify-center mb-6">
          <v-card
            class="py-2 my-2 justify-center"
            width="100%"
          >
            <template v-slot:title>
              <div class="text-h4">My Profile</div>
            </template>
            <v-container>
              <v-card
                class="mx-auto"
                rounded="0"
                v-if="isEmployer"
              >
                <v-img
                  height="100%"
                  cover
                  src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                >
                  <v-avatar
                    color="grey"
                    size="150"
                    rounded="0"
                  >
                    <v-img cover :src="company?.logo_url ?? avatarUrl ?? userData?.avatarUrl"></v-img>
                  </v-avatar>
                  <v-list-item
                    class="text-white"
                  >
                    <v-list-item-title>
                      {{ company?.name ?? name ?? userData?.displayName }}
                      <v-tooltip text="verified user" class="p-0">
                        <template v-slot:activator="{ props }">
                          <v-icon v-bind="props" icon="mdi-check" color="blue" size="x-small"></v-icon>
                        </template>
                      </v-tooltip>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ company?.email ?? userEmail ?? userData?.email }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon icon="mdi-cake"></v-icon> {{ userData?.createdAt }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    
                  </v-list-item>
                </v-img>
              </v-card>
              <v-card
                class="mx-auto"
                rounded="0"
                v-if="isSeeker"
              >
                <v-img
                  height="100%"
                  cover
                  src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                >
                  <v-avatar
                    color="grey"
                    size="150"
                    rounded="0"
                  >
                    <v-img cover :src="userData?.avatarUrl"></v-img>
                  </v-avatar>
                  <v-list-item
                    class="text-white"
                  >
                    <v-list-item-title>
                      {{ userData?.displayName }}
                      <v-tooltip text="verified user" class="p-0">
                        <template v-slot:activator="{ props }">
                          <v-icon v-bind="props" icon="mdi-check" color="blue" size="x-small"></v-icon>
                        </template>
                      </v-tooltip>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ userData?.email }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon icon="mdi-cake"></v-icon> {{ userData?.createdAt }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    
                  </v-list-item>
                </v-img>
              </v-card>
              <v-form class="my-2">
                <v-text-field
                  v-model="displayName"
                  :counter="100"
                  label="Display name"
                  required
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="userEmail"
                  :counter="100"
                  label="Email address"
                  type="email"
                  readonly
                  clearable
                ></v-text-field>
                <client-only>
                  <editor theme="snow" toolbar="full" :content="aboutMeContent" :placeholder="isEmployer ? 'About the company' : 'About me'" />
                </client-only>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-btn
                size="x-large"
                color="secondary"
                variant="elevated"
                class="m-2"
              >
                Update Profile
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" sm="3">
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken, useUserData, useUserDefaultRole, useUserDisplayName, useUserEmail, useUserAvatarUrl } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'

useHead({
  title: 'Edit Profile | HeyJobs',
})

const { nhost } = useNhostClient()

const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const userData = useUserData()
const defaultRole = useUserDefaultRole()
const isSeeker = useIsSeeker()
const isEmployer = useIsEmployer()
const displayName = useUserDisplayName()
const userEmail = useUserEmail()
const { getCompany, company, error } = useCompany()
const avatarUrl = useUserAvatarUrl()

const editProfileClick = async () => {
  await navigateTo('/me/edit')
}

const timelineClick = async () => {
  await navigateTo('/me/timeline')
}

const viewApplicationsClick = async () => {
  await navigateTo('/me/applications')
}

const uploadResumeClick = async () => {
  await navigateTo('/me/upload')
}

const items = [
  { type: 'subheader', title: 'Profile Actions' },
  {
    title: 'Edit Profile',
    click: editProfileClick,
    value: 1,
  },
  {
    title: 'View Applications',
    click: viewApplicationsClick,
    value: 2,
  },
  {
    title: 'Timeline',
    link: true,
    click: timelineClick,
    value: 3,
  },
  {
    title: 'Upload Resume',
    click: uploadResumeClick,
    value: 4,
  },
]

const editor = shallowRef()
const aboutMeContent = ref('This is about me')
const pageLoading = ref(true)
const verified = ref(false)
const name = ref<string>()
const email = ref<string>()

const updateProfile = async () => {
  if (isEmployer) {
    return
  }
  
  if (isSeeker) {
    return
  }
}

watchEffect(async () => {
  console.log('[watchEffect#isAuthenticated]: ', isAuthenticated.value)
  if (!isAuthenticated.value) {
    // await navigateTo('/')
  }
  if (token.value) {
    /* nhost.graphql.setAccessToken(token.value as string)
    const { data, error: gqError } = await nhost.graphql.request(JOBS_QUERY)
    console.log('[data]: ', data)
    console.log('[error]: ', gqError) */
  }
  if (userData.value) {
    verified.value = userData.value.emailVerified
  }
  if (userData.value && isEmployer) {
    userData.value!.displayName = company.value?.name ?? ''
    userData.value!.email = company.value?.email ?? ''
  }
  name.value = company.value?.name || displayName.value || userData.value?.displayName
  userEmail.value = company.value?.email || userEmail.value || userData.value?.email
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
  const { QuillEditor } = await import('@vueup/vue-quill')
  editor.value = QuillEditor
  pageLoading.value = false
  
  console.log('[onMounted#isAuthenticated]: ', isAuthenticated.value)
  
  if (!isAuthenticated.value) {
    await navigateTo('/')
  }
  await getCompany()
})
</script>
