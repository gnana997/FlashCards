import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from "../actions/index";

function entries(state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                ...action.deck
            }
        case REMOVE_DECK:
            return Object.keys(state).reduce((result, key) => {
                    if (key !== action.deck) {
                        console.log(key)
                        result[key] = state[key];
                    }
                    console.log(result)
                    return result;
                }, {})
        default:
            return state
    }
}

export default entries