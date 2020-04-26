import React,{Component} from "react";
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import { white, purple, blue } from "../utils/colors";

export default class SubmitBtn extends Component{
    render(){
        return (
            <TouchableOpacity
            style ={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress = {this.props.onPress}>
                <Text style = {styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
     }
})