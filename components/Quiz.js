import React,{Component} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white,purple, gray, red, green } from "../utils/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,Entypo} from '@expo/vector-icons'


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

    state = {
        index: 0,
        showAnswer: false,
        score: 0,
        disabled: false
    }

    onShowAnswer = () => {
        this.setState((currState) => ({
            showAnswer: !currState.showAnswer
        }))
    }

    correctAnswer = () => {
        this.setState((currState) => ({
            score: currState.score+1,
            disabled: true
        }))
    }

    wrongAnswer = () =>{
        this.setState({
            disabled: true
        })
    }

    onNext = () => {
        this.setState((currState) => ({
            index: currState.index+1,
            disabled: false,
            showAnswer: false
        }))
    }


    render(){
        const {deck} = this.props
        const {index,showAnswer,disabled,score} = this.state
        if(deck.questions.length === 0){
            return (
                <View style = {styles.container} >
                    <Text style = {styles.text}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        }
        if(index === deck.questions.length){
            return (
                <View style = {styles.scoreContainer} >
                    {score >= 1 ? <Ionicons name = 'md-happy' size = {100} /> : <Entypo name = 'emoji-sad' size = {100} />}
                    <Text style = {styles.text}>
                        {`You have answered ${score} out of ${deck.questions.length} correctly.`}
                    </Text>
                </View>
            )
        }
        return(
            <View style = {styles.container}>
                <View>
                    <Text style = {{fontSize: 20}}>
                        {`${index+1} of ${deck.questions.length} questions`}
                    </Text>
                </View>
                <View>
                    <Text style = {{fontSize: 30}}>{deck.questions[index].question}</Text>
                    <View style = {styles.answerContainer}>
                        {showAnswer ? 
                          <View>
                                <Text style = {styles.answer}>{`${deck.questions[index].answer}`}</Text>  
                                <TouchableOpacity onPress = {this.onShowAnswer}>
                                        <Text style = {[styles.context, {color: red}]}>Hide Answer</Text>
                                </TouchableOpacity>
                          </View>
                        : 
                        <TouchableOpacity
                            style ={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                            onPress = {this.onShowAnswer}>
                                <Text style = {styles.submitBtnText}>Show Answer</Text>
                            </TouchableOpacity> }
                    </View>
                    <View style = {styles.answerButtons}>
                        <TouchableOpacity
                                disabled = {disabled ? true : false}
                                style ={[(Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn),(disabled && {backgroundColor: green})]}
                                onPress = {this.correctAnswer}>
                                    <Text style = {styles.submitBtnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                disabled = {disabled ? true : false}
                                style ={[(Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn),(disabled && {backgroundColor: red})]}
                                onPress = {this.wrongAnswer}>
                                    <Text style = {styles.submitBtnText}>Wrong</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress = {this.onNext}>
                            <Text style = {[styles.context, {color: red}]}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        marginRight: 20,
        marginLeft: 20,
    },
    scoreContainer:{
        marginRight: 20,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 20,
        textAlign: 'center'
    },
    iosSubmitBtn:{
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
     },
     androidSubmitBtn: {
         backgroundColor: purple,
         padding: 10,
         paddingLeft: 30,
         paddingRight: 30,
         height:45,
         margin: 50,
         borderRadius: 6
     },
     submitBtnText: {
         color: white,
         fontSize: 22,
         textAlign: 'center'
     },
     answerContainer: {
          borderWidth: 1,
          borderColor: gray,
          alignItems: 'stretch',
          width: 350
     },
     answer:{
         textAlign:'center',
         fontSize: 20,
         margin: 50,
     },
     answerButtons:{
        flexDirection: 'row',
        justifyContent: 'space-around'
     },
     deleteButton:{
        backgroundColor: white
    },context:{
        fontSize: 20,
        textAlign: 'center'
    },
})