<template>
  <v-app id="inspire" :theme="theme">
    <v-app-bar class="px-3" flat density="compact">
      <v-app-bar-title>Title</v-app-bar-title>

      <!-- <v-tabs centered>
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs> -->
      <v-spacer></v-spacer>
      <v-btn @click="browse" rounded="lg" class="mx-2" color="primary" variant="elevated">Browse Jobs</v-btn>
      <v-btn @click="myJobs" class="mx-2" variant="outlined" to="my-jobs">My Jobs</v-btn>
      <v-menu location="bottom left">
        <template v-slot:activator="{ props }">
          <v-btn size="x-small" v-bind="props" icon stacked>
            <v-badge content="2" color="error">
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
              <div v-html="item.subtitle"></div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-avatar class="mx-2" color="surface-variant"></v-avatar>
    </v-app-bar>

    <v-main>
      <!-- <v-banner
        lines="one"
        icon="mdi-wifi-strength-alert-outline"
        color="warning"
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
      </v-banner> -->
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const router = useRouter()

const theme = ref('dark')
const links = [
  'Browse Jobs',
  'My Jobs',
  'Updates',
  'Profile',
]

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

async function browse() {
  await router.push('/')
}

async function myJobs() {
  await router.push('/my-jobs')
}
</script>
