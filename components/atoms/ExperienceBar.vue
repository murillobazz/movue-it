<template>
    <header class="pb-10 flex items-center">
        <p class="text-sm">
            {{ `${xp.start} xp` }}
        </p>

        <div class="mx-4 lg:mx-6 flex-1 bg-gray-line h1 rounded-md">
            <div class="relative bg-green h-1" :style="{ width: `${ currentXpPercentage }%`}">

            
        <p class="text-sm absolute -right-4 w-max top-2">
                {{ `${xp.current} xp (${currentXpPercentage}%)` }}
        </p>
            </div>
        </div>
        <p class="text-sm">
            {{ `${xp.end} xp` }}
        </p>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex'; //Funções do vuex que permite acessar de maneira simplificada os valores do estado global.
//Para utilizar essas funções no objeto do componente, é preciso passá-las dentro do computed por serem
//propriedades reativas do estado.

export default Vue.extend({
    computed: {
    ...mapState('Challenges', ['xp']), //Acessamos essa função/método usando desestruturação, 
    //assim "mapeamos" o estado 'xp' para dentro do componente. (lembrando que challenges é um módulo da nossa store que abriga
    //diferentes states da nossa aplicação)
    
    ...mapGetters('Challenges', ['currentXpPercentage']) //Aqui fazemos o mesmo, mas para mapear o getter que está entre []
    //da nossa store modular 'Challenges' para podermos utilizar este getter em nosso componente.
    }
})
</script>
