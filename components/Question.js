import React,{Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet } from "react-native";
import { white,purple } from "../utils/colors";
import SubmitBtn from './SubmitBtn'
import { mergeQuestion } from "../utils/api";
import { addQuestion } from "../actions/index";

class Question extends Component{

    static navigationOptions = ({navigation}) => {
        return{
            title: 'Add Card',
            headerTintColor: white,
            headerStyle:{
                backgroundColor: purple 
            }
        }
    }

    state = {
        question: '',
        answer: ''
    }

    onSubmit = () => {
        const {deck,navigation,dispatch} = this.props
        const card = this.state
        const cards = [...deck.questions]
        cards.push(this.state)
        const entry = {
            [deck.title]:{
                questions: cards
            }
        }
        dispatch(addQuestion(deck.title,card))

        mergeQuestion(deck.title,entry)
        navigation.navigate('Deck',{deckId: deck.title})
    }

    render(){
        const {question,answer} = this.state
        return(
            <View style = {styles.container}>
                 <TextInput style = {styles.input} placeholder = 'Enter a question...' value = {question} onChangeText = {(text) => this.setState({question: text})} />
                 <TextInput style = {styles.input} placeholder = 'Enter answer...' value = {answer} onChangeText = {(text) => this.setState({answer: text})} />
                 <SubmitBtn onPress = {this.onSubmit} />
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

export default connect(mapStateToProps)(Question)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'stretch',
    },
    input : {
        height: 45, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:20,
        marginBottom: 30
    }
})