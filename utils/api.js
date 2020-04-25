import { AsyncStorage } from "react-native";

export function submitDeck({key,questions=[]}){
    try{
        const entry = {
            [key]: {
                title: key,
                questions: questions
            }
        }
        AsyncStorage.setItem(key,JSON.stringify(entry))
    }catch(error){
        console.error(error);
    }
}

export async function getDecks(){
    try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        return result.map(res => JSON.parse(res[1]))
    }catch(err){
        console.error(err)
    }
}

export async function getDeck(key){
    const result = await AsyncStorage.getItem(key)
    return result
}

export function clearItems(){
    AsyncStorage.clear()
}

export async function removeDeck(key){
    try{
        await AsyncStorage.removeItem(key)
        return true
    }catch(error){
        return false
    }
}