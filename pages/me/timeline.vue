<template>
  <v-container>
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
              <div class="text-h3">Career Timeline</div>
            </template>
            <v-container v-if="years">
              <v-timeline align="start">
                <v-timeline-item
                  v-for="(year, i) in years"
                  :key="i"
                  :dot-color="year.color"
                  size="small"
                >
                  <template v-slot:opposite>
                    <div
                      :class="`pt-1 headline font-weight-bold text-${year.color}`"
                      v-text="year.year"
                    ></div>
                  </template>
                  <div>
                    <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
                      Lorem ipsum
                    </h2>
                    <div>
                      Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
            <v-card-subtitle class="text-subtitle-1" v-else>
              <em>No history</em>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                size="x-large"
                color="primary"
                variant="elevated"
                class="m-2"
              >
                Add entry
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
useHead({
  title: 'Career Timeline | HeyJobs',
})

const years = [
  {
    color: 'cyan',
    year: '1960',
  },
  {
    color: 'green',
    year: '1970',
  },
  {
    color: 'pink',
    year: '1980',
  },
  {
    color: 'amber',
    year: '1990',
  },
  {
    color: 'orange',
    year: '2000',
  },
]
const items = [
  { type: 'subheader', title: 'Profile Actions' },
  {
    title: 'View Applications',
    value: 1,
  },
  {
    title: 'Timeline',
    value: 2,
  },
  {
    title: 'Edit Profile',
    value: 3,
  },
  {
    title: 'Upload Resume',
    value: 4,
  },
  {
    title: 'Sign Out',
    value: 5,
  },
]

watchEffect(async () => {
})

onMounted(async () => {
})
</script>
