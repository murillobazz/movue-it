<template>
<div class="flex items-center">
    <img src="tgnprofile.PNG" alt="Thaiguinho Dev" class="mr-6 w-20 h-20 rounded-full">
    <div class="flex flex-col w-full">
        <strong class="text-title text-2xl">Thiaguinho</strong>
        <p class="flex items-center">
            <img src="icons/level.svg" alt="level" class="mr-2">
            <span class="text-base"> Level {{ level }}</span> <!-- Todas as propriedades/métodos 
            definidos no script podem ser acessados no template sem usar o 'this' -->
        </p> 
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex';

export default Vue.extend({
    //Comunicamos ao componente que ele deve ser REATIVO à propriedade 'level' que está no estado do nosso módulo 'Challenges'
    computed: mapState('Challenges', ['level'])
})
</script>

<style>

</style>