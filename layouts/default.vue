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
      <v-btn @click="myJobs" class="mx-2" variant="outlined">My Jobs</v-btn>
      <v-avatar v-if="loading" class="mx-2" color="surface-variant"></v-avatar>
      <div v-else>
        <div v-if="(isAuthenticated && !isAnon)">
          <v-menu location="bottom left">
            <template v-slot:activator="{ props }" color="green">
              <v-btn width="5" color="transparent" class="text-none" variant="flat" v-bind="props" icon stacked rounded="pill">
                <v-badge content="100" max="9" color="error">
                  <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                lines="three"
                :prepend-avatar="item.prependAvatar"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <div v-html="item.subtitle" class="text-truncate"></div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu v-if="userAvatarUrl" location="bottom left">
            <template v-slot:activator="{ props }">
              <v-btn color="transparent" variant="flat" v-bind="props" icon rounded="pill">
                <v-avatar :image="userAvatarUrl"></v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item value="profile" @click.prevent="me">
                <v-list-item-title>Profile</v-list-item-title>
                <v-list-item-subtitle>View or edit profile</v-list-item-subtitle>
              </v-list-item>
              <v-list-item value="sign-out" @click.prevent="handleSignOut">
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-avatar v-else onclick="" class="mx-2" color="surface-variant"></v-avatar>
        </div>
        <div v-else>
          <v-btn @click="login" rounded="lg" class="mx-2" variant="outlined">Log In</v-btn>
          <v-btn @click="signup" rounded="lg" class="mx-2" color="secondary" variant="elevated">Sign Up</v-btn>
        </div>
      </div>
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
import { useAuthenticated, useSignInEmailPassword, useAccessToken, useUserRoles, useSignInAnonymous, useUserAvatarUrl, useSignOut } from '@nhost/vue'

/* definePageMeta({
  middleware: ['protected'],
}) */

const router = useRouter()
const online = useOnline()
const theme = useTheme()
const loading = ref(true)

const userAvatarUrl = useUserAvatarUrl()

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
const isAuthenticated = useAuthenticated()
const {
  signInEmailPassword,
  needsEmailVerification,
} = useSignInEmailPassword()
const { signInAnonymous, isLoading, isSuccess, isError, error } = useSignInAnonymous()
const roles = useUserRoles()
const { signOut } = useSignOut()
const guest = useGuest()
const isAnon = ref(true)
const hasProfile = ref(false)

async function browse() {
  await router.push('/')
}

async function myJobs() {
  /* if (isAnon.value) {
    await router.push('/auth/login')
    return
  } */
  await router.push('/my-jobs')
}

const login = async () => {
  await router.push('/auth/login')
}

const signup = async () => {
  await router.push('/auth/signup')
}

const handleSignOut = async () => {
  await signOut()
  await refreshNuxtData()
  navigateTo('/')
}

const me = async () => {
  await router.push('/me')
}

watchEffect(() => {
  if (isSuccess) {
    isAnon.value = roles.value.includes('anonymous')
    hasProfile.value = roles.value.includes('seeker') || roles.value.includes('employer')
    console.log('[state:guest]: ', isAnon.value);
    
    useState('guest', () => isAnon.value)
    useState('hasProfile', () => hasProfile.value)
    console.log('[anon]: ', isAnon.value)
  }
})

onMounted(async () => {
  loading.value = false
  if (!isAuthenticated.value) {
    await signInAnonymous()
  }
})
</script>
