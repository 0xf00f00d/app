<template>
  <v-sheet height="500" class="d-flex justify-center align-center">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-icon icon="mdi-magnify" size="x-large"></v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center text-h4 font-weight-bold">
          Nothing here ...
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="isEmployer" class="text-center text-subtitle font-italic">
          Click <strong>POST JOB</strong> add it here
        </v-col>
        <v-col v-if="isSeeker" class="text-center text-subtitle font-italic">
          Click <strong>APPLY</strong> on the job card to add it here
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn variant="elevated" color="primary" size="x-large" @click.prevent="browse">Browse Jobs</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script lang="ts" setup>
const isEmployer = useIsEmployer()
const isSeeker = useIsSeeker()

const browse = () => {
  navigateTo('/')
}
</script>