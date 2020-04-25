import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { white, blue } from "../utils/colors";

class DeckList extends Component{
    render(){
        const { navigate } = this.props.navigation;
        const {deck} = this.props
        if(!deck){
            navigate('Home')
            return(
                <View>
                    <Text>This subject has been Deleted</Text>
                </View>
            )
        }
        return(
            <TouchableOpacity 
            onPress ={() => navigate(
                'Deck',
                {deckId: deck.title}
            )}
            style = {styles.container}>
                <Text style = {styles.subject}>{deck.title}</Text>
                <Text style = {styles.text}>{`${deck.questions.length} cards`}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        marginTop: 2,
        alignContent: 'center',
        marginBottom: 5
    },
    subject:{
        textAlign:'center',
        justifyContent: 'center',
        fontSize: 30
    },
    text:{
        textAlign:'center',
        justifyContent: 'center',
        fontSize: 20
    }
})

function mapStateToProps(state,{subject}){
    const deck = state[subject]
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckList)