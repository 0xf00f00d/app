<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthenticated, useSignInEmailPassword } from '@nhost/vue';
import { useUserStore } from '~~/stores/user';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';

const name = ref('A')
// const router = useRouter()
const user = useUserStore()

const {
  signInEmailPassword,
  needsEmailVerification,
  isLoading,
  isSuccess,
  isError,
  error
} = useSignInEmailPassword()
const { loading, result, error: gqErr } = useQuery(gql`
  query Jobs {
    allJobs {
      title
    }
  }
`)
const jobs = ref<{[key: string]: any}>([])
const isAuthenticated = useAuthenticated()

watchEffect(() => {
  user.setNewName(name.value)
  console.log(
    needsEmailVerification.value,
    isLoading.value,
    isSuccess.value,
    isError.value,
    error.value
  )
  if (!loading.value && !gqErr.value) {
    jobs.value = result.value.jobs
  }
  console.log(
    loading.value,
    result.value,
    gqErr.value,
  )
})

onMounted(async () => {
  await signInEmailPassword('seeker@example.com', 'password')
  console.log('[isAuthenticated]: ', isAuthenticated.value)
  
})
</script>
