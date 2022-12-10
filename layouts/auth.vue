<template>
  <v-app v-if="loading">
    <v-sheet width="100%" height="50" class="mb-2">
      <div class="my-2 ml-7 float-left text-h6">Loading</div>
      <v-avatar class="mr-5 ml-2 my-2 float-right" color="surface-variant"></v-avatar>
      <v-btn size="small" icon class="ml-2 my-2 float-right" color="surface-variant"></v-btn>
      <v-btn variant="flat" class="ml-2 my-2 float-right" color="surface-variant"></v-btn>
      <v-btn rounded="lg" class="my-2 float-right" color="surface-variant"></v-btn>
    </v-sheet>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <v-app v-else id="inspire" :theme="theme.name.value">
    <v-app-bar class="px-3" flat density="compact">
      <v-app-bar-title>HeyJobs</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn @click="browse" rounded="lg" class="mx-2" color="primary" variant="elevated">Browse Jobs</v-btn>
      <v-btn @click="myJobs" class="mx-2" color="secondary" variant="elevated">Sign Up</v-btn>
    </v-app-bar>

    <v-main>
      <v-banner
        lines="one"
        icon="mdi-wifi-strength-alert-outline"
        color="warning"
        v-if="!online"
      >
        <template v-slot:text>
          No Internet connection
        </template>

        <template v-slot:actions>
          <v-btn>
            Dismiss
          </v-btn>

          <v-btn>
            Retry
          </v-btn>
        </template>
      </v-banner>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { useAuthenticated, useSignInEmailPassword, useAccessToken, useUserRoles } from '@nhost/vue'

const isAuthenticated = useAuthenticated()
const router = useRouter()
const online = useOnline()
const theme = useTheme()
const loading = ref(true)

const items: any[] = [
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
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
const roles = useUserRoles()
const guest = useGuest()
const isAnon = ref(true)

const browse = async () => {
  await router.push('/')
}

const myJobs = async () => {
  await router.push('/my-jobs')
}

const signup = async () => {
  await router.push('/auth/signup')
}

watchEffect(() => {
  if (isSuccess) {
    isAnon.value = roles.value.includes('anonymous')
    console.log('[anon]: ', isAnon.value);
    
  }
})

onMounted(async () => {
  loading.value = false
  /* if (isAuthenticated.value && !isAnon.value) {
    await router.push('/')
  } */
})
</script>
  