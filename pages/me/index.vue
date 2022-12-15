<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
      </v-col>
      <v-col cols="12" sm="2">
        <v-card width="250" class="float-right my-2" rounded>
          <v-list>
            <v-list-item class="text-h5">Profile Actions</v-list-item>
            <div v-for="item in items">
              <v-list-item v-if="item.visible" :title="item.title" @click.prevent="item.click"></v-list-item>
            </div>
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
              {{ displayName }}
            </template>
            <v-card-subtitle class="text-subtitle-1">
              {{ email }}
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
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword, useNhostClient, useAccessToken, useUserData, useUserDisplayName, useUserEmail, useSignOut, useUserDefaultRole } from '@nhost/vue'
import { useUserStore } from '~~/stores/user'
import gql from 'graphql-tag'

useHead({
  title: 'My Profile | HeyJobs',
})

const { nhost } = useNhostClient()
const { signOut, isSuccess: signOutSuccess } = useSignOut()
const token = useAccessToken()
const isAuthenticated = useAuthenticated()
const userData = useUserData()
const displayName = useUserDisplayName()
const email = useUserEmail()
const isSeeker = useIsSeeker()
const isEmployer = useIsEmployer()
const defaultRole = useUserDefaultRole()

const home = async () => {
  await navigateTo('/')
}

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

const signOutClick = async () => {
  await signOut()
}

const items = [
  { type: 'subheader', title: 'Profile Actions' },
  {
    title: 'Edit Profile',
    click: editProfileClick,
    value: 1,
    visible: defaultRole.value !== 'user',
  },
  {
    title: 'View Applications',
    click: viewApplicationsClick,
    value: 2,
    visible: defaultRole.value === 'seeker',
  },
  {
    title: 'Timeline',
    link: true,
    click: timelineClick,
    value: 3,
    visible: defaultRole.value === 'seeker',
  },
  {
    title: 'Upload Resume',
    click: uploadResumeClick,
    value: 4,
    visible: defaultRole.value === 'seeker',
  },
  {
    title: 'Sign Out',
    click: signOutClick,
    value: 5,
  },
]

watchEffect(async () => {
})

onMounted(async () => {
  
})
</script>
