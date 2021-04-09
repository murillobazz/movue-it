<template>
  <section
    class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20"
  >
    <div class="flex flex-col w-full lg:w-1/2">
      <Profile />
      <CompletedChallenges />
      <Countdown @completed="getNewChallenge" />

      <button v-if="hasCountdownCompleted" disabled class="button completed">
        Cycle completed
      </button>

      <button
        v-else-if="isCountdownActive"
        class="button abandon"
        @click="setCountdownState(false)"
      >
        Abandon cycle
      </button>

      <button v-else class="button start" @click="setCountdownState(true)">
        Start a cycle
      </button>
    </div>
    <Card id="challenge" class="w-full lg:w-1/2" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState, mapMutations, mapGetters } from "vuex"; //Importamos as helper functions de mapeamento.
import { Mutations as ChallengesMT } from "~/store/Challenges/types";
import { Mutations as CountdownMT } from "~/store/Countdown/types"; //Aqui importamos os tipos de Mutations e as chamaremos como CountdownMT (como se fosse uma variável pro objeto)

import CompletedChallenges from "~/components/atoms/CompletedChallenges.vue";
import Profile from "~/components/molecules/Profile.vue";
import Countdown from "~/components/molecules/Countdown.vue";
import Card from '~/components/organisms/Card.vue';

import { playAudio, sendNotification, getRandomNumber, scrollToElement } from "~/utils"; //Em /utils criamos essa funções para tocar áudio e mandar notificação pela api do browser.

interface Head {
  title: string;
}

export default Vue.extend({
  head(): Head {
    return {
      title: "Home | movue.it",
    };
  },
  components: {
    CompletedChallenges,
    Profile,
    Countdown,
    Card,
  },
  mounted() {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, //Em 'mounted' que é um lifecycle hook, nós executamos a ação assim que nossa aplicação for renderizada.

  //O estados devem estar sempre dentro de computed para serem reativos
  computed: {
    ...mapState("Countdown", {
      hasCountdownCompleted: "hasCompleted",
      isCountdownActive: "isActive",
    }), //Aqui mapeamos a propriedade 'hasCompleted' como o valor de uma key dentro do objeto só para
    //darmos um nome mais semântico no contexto dessa página aqui, assim como com o isActive.
    ...mapGetters("Challenges", ["challengesLength"]),
  },

  //É dentro de methods que mapeamos nossas Mutations.
  methods: {
    //Aqui, novamente definimos as mutações que queremos gerar para nosso componente, como key do objeto passamos o nome da mutação que queremos usar dentro do componente,
    //a primeira seta um valor para a propriedade hasCompleted do Countdown, dentro dela passamos (usando template string) primeiramente o módulo (Countdown) e interpolamos com uma variável
    //que é a enumeração da mutação SET_HAS_COMPLETED. (A mesma ideia se aplica pro mapeamento seguinte.)
    ...mapMutations({
      setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
      setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
      setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`,
    }),

    //Abaixo definimos um método que engloba as mutações importadas, que recebe como parametro um booleano, e servirá para
    //ser chamada para começar o ciclo ou abandonar o ciclo, por isso que a primeira função de definir se o countdown foi completado
    //sempre recebe false enquanto a segundo função para saber se o Countdown está rolando depende do booleano passado (true para quando começa e false pra quando abandona.)
    setCountdownState(flag: boolean) {
      this.setCountdownHasCompleted(false), this.setCountdownIsActive(flag);
    },

    //Esse método, primeiramente define a variavel 'hasCompleted' como true, ou seja, o Countdown foi completado, e em seguida definimos que este emitirá uma notificação,
    //à partir da api do browser de notificação (que verificamos se existe em mounted e definimos em nossos utils.) se este tiver sido permitido.
    getNewChallenge() {
      const index = getRandomNumber(0, this.challengesLength);

      this.setCountdownHasCompleted(true);
      this.setCurrentChallengeIndex(index);

      // Notification? é a mesma coisa que Notification === true && mais a condição que a segue.
      if (Notification?.permission === "granted") {
        playAudio("/notification.mp3");
        sendNotification("New Challenge!", {
          body: "A new challenge has started! Go complete it!",
          icon: "/favicon.png",
        });
      }
      this.$nextTick(() => {
        scrollToElement("#challenge");
      });
    },
  },
});
</script>

<style>
</style>
 