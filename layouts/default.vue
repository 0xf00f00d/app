<template>
  <v-app id="inspire" :theme="theme">
    <v-app-bar class="px-3" flat density="compact">
      <v-spacer></v-spacer>

      <v-tabs centered>
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

const theme = ref('dark')
const links = [
  'Jobs',
  'Applications',
  'Profile',
  'Updates',
]
</script>
