<template>
  <div class="min-h-screen max-w-5xl mx-auto flex-col px-5 py-8 md:py-10">
    <ExperienceBar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ExperienceBar from '~/components/atoms/ExperienceBar.vue'

export default Vue.extend({
  name: 'Default',
  components: {
    ExperienceBar,
  }
})
</script>

<style>

</style>
