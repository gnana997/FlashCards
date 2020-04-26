import React from 'react'
import { connect } from "react-redux";
import { View,Text, TouchableOpacity ,StyleSheet, Platform } from "react-native";
import {purple,white, red} from '../utils/colors'
import {removeEntry} from '../actions/index'
import {removeDeck} from '../utils/api'

class Deck extends React.Component{

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params

        return{
            title: navigation.state.params ? deckId : 'Deck',
            headerTintColor: white,
            headerStyle:{
                backgroundColor: purple 
            }
        }
    }

    remove = () => {
        const {deck,dispatch,navigation} = this.props
        const res = removeDeck(deck.title).then((res) => console.log(res))
        if(res){
            dispatch(removeEntry(deck.title))
            navigation.navigate('Home')
        }
    }

    render(){
        const {deck,navigation} = this.props
        if(!deck){
            return (
                <View>
                    <Text>
                        Sorry No deck exists
                    </Text>
                </View>
            )
        }
        return(
            <View style = {styles.container}>
                <View style = {styles.subContainer}>
                    <Text style ={styles.title}>{deck.title}</Text>
                    <Text style ={styles.context}>{`${deck.questions.length} cards`}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                    onPress = {() => navigation.navigate('Question',{deckId: deck.title})}
                    style = {Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                        <Text style = {[styles.context, {color: white}]}>ADD Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {() => navigation.navigate('Quiz',{deckId: deck.title})}
                    style = {Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                        <Text style = {[styles.context, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {this.remove}
                    style = {styles.deleteButton}>
                        <Text style = {[styles.context, {color: red}]}>Delete Deck</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    subContainer:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 5
    },
    context:{
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer:{
        flex: 0.5,
        justifyContent : 'space-evenly',
        alignItems: 'stretch',
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
         borderRadius: 6,
         marginRight: 30,
         marginLeft: 30
     },
     deleteButton:{
         backgroundColor: white
     }
})