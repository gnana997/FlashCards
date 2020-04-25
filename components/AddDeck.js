import React,{Component} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native";
import {submitDeck, getDecks, getDeck} from '../utils/api'
import { connect } from "react-redux";
import { white, purple, blue } from "../utils/colors";
import { addEntry } from "../actions/index";

function SubmitBtn({onPress}){
    return (
        <TouchableOpacity
         style ={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
         onPress = {onPress}>
            <Text style = {styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component{
    state = {
        key: ''
    }
    
    submit = () => {
        const {dispatch} = this.props
        const {key} = this.state
        submitDeck({key})
        getDeck(key).then((res) => dispatch(addEntry(JSON.parse(res))))
        this.setState({
            key: ''
        })
    }

    render(){
        const {key} = this.state
        return (
            <View style = {styles.container}>
                <View style = {styles.subContainer}>
                    <Text style = {styles.label}>What is the title of your new deck?</Text>
                    <View>
                        <TextInput style = {styles.input} placeholder = 'Enter a subject...' value = {key} onChangeText = {(text) => this.setState({key: text})} />
                    </View>
                </View>
                <View style = {styles.buttonContainer}>
                    <SubmitBtn onPress = {this.submit} />
                </View>
            </View>
        )
    }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'stretch',
    },
    subContainer: {
        justifyContent: 'space-evenly',
        alignItems:'stretch',
        marginTop: 50,
        flex: 0.5,
    },
    input : {
        height: 45, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:20
    },
    label: {
        fontSize: 35,
        textAlign: 'center',
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
         borderRadius: 2
     },
     submitBtnText: {
         color: white,
         fontSize: 22,
         textAlign: 'center'
     },
     buttonContainer:{
         flex:0.5,
         justifyContent: 'flex-end',
         alignItems:'stretch',
         marginBottom: 40
     }
})