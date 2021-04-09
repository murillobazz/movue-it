export const splitValue = (value: number | string, padsize: number = 2) => `${value}`.padStart(padsize, '0').split('')

export const scrollToElement = (selector: string) => {
    const element: HTMLElement | null = document.querySelector(selector);
    const mq = window.matchMedia('(max-width: 639px)'); //media query em js

    if (element && mq.matches) {
        element.scrollIntoView({ block:'start', behavior: 'smooth'}) //Método nativo para scrollar pra visão do usuário.
    }
}

export const playAudio = (path: string) => new Audio(path).play();

export const sendNotification = (title: string, options: object) => new Notification(title, options);

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}
