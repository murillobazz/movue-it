//Responsável por armazenar a tipagem do state, mutations, getters, etc, para trabalhar com o
//typescript.

import { MutationTree } from 'vuex'; //Importando o método MutationTree do vuex

export interface State {
    time: number;
    isActive: boolean;
    hasCompleted: boolean;
}

export interface Getters {
    minutes: (state: State) => number;
    seconds: (state: State) => number;
}

//Aqui nós "enumeramos" as mutações, acho que tem a ver com os nomes com os quais podemos invocar estas
//sem precisar usar a string.

export enum Mutations {
    SET_TIME = 'SET_TIME',
    RESET_TIME = 'RESET_TIME',
    SET_IS_ACTIVE = 'SET_IS_ACTIVE',
    SET_HAS_COMPLETED = 'SET_HAS_COMPLETED', 
}

export type RootState = ReturnType<() => State> //Aqui exportamos o tipo de retorno a ser passado na MutationTree


//Abaixo criamos a interface das nossas Mutations, método que se extende do método MutationTree
//e essa interface irá passar a tipagem de nossas Mutações.

export interface MutationsInterface extends MutationTree<RootState> {
    [Mutations.SET_TIME](s: State, p: number): void;
    [Mutations.RESET_TIME](s: State): void;
    [Mutations.SET_IS_ACTIVE](s: State, p: boolean): void;
    [Mutations.SET_HAS_COMPLETED](s: State, p: boolean): void;
} 

//São métodos que retornam void pois não precisam retornar nada, apenas modificar o estado.
//Recebem em 's' o State que é o estado desse módulo e em 'p' algum parâmetro condicional e opcional.

//Ao usar os colchetes para definir o método, este é definido de forma dinâmica, como parte do objeto
//MutationsInterface.