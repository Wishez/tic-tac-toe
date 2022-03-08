import random from 'lodash/random'

export const getRandomMessage = (messages: string[]) => messages[random(messages.length - 1)]
