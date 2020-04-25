export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = "ADD_DECK"
export const REMOVE_DECK = "REMOVE_DECK"

export function receiveEntries(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addEntry(deck){
    return {
        type: ADD_DECK,
        deck
    }
}

export function removeEntry(deck){
    return {
        type: REMOVE_DECK,
        deck
    }
}