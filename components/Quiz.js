import React,{Component} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white,purple } from "../utils/colors";

class Quiz extends Component{

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params

        return{
            title: navigation.state.params ? `${deckId} Quiz` : 'Quiz',
            headerTintColor: white,
            headerStyle:{
                backgroundColor: purple 
            }
        }
    }


    render(){
        const {deck} = this.props
        console.log(deck)
        if(deck.questions.length === 0){
            return (
                <View style = {styles.container} >
                    <Text style = {styles.text}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        }
        return(
            <View>
                <Text>
                    {`${deck.questions.length} cards`}
                </Text>
            </View>
        )
    }
}

function mapStateToProps(state,{navigation}){
    const {deckId} = navigation.state.params
    const deck = state[deckId]
    return{
        deck,
        navigation
    }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        marginRight: 20,
        marginLeft: 20
    },
    text:{
        fontSize: 20,
        textAlign: 'center'
    }
})