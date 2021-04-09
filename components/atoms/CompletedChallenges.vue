<template>
  <div class="flex justify-between items-center pb-5 border-b-2 border-gray-line mt-8 lg:mt-14 font-medium">
      <p class="text-lg">
          Completed Challenges
      </p>
      <p class="text-2xl">
          {{ completedChallenges }}
      </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex';

export default Vue.extend({
    //Comunicamos ao componente que ele deve ser REATIVO à propriedade 'completedChallenges' que está no estado do nosso módulo 'Challenges'
    computed: mapState('Challenges', ['completedChallenges'])
})
</script>
