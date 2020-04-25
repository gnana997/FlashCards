import React from 'react';
import { StyleSheet, StatusBar , View, } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Decks from './components/Decks'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import AddDeck from './components/AddDeck'
import {Entypo, FontAwesome} from '@expo/vector-icons'
import {createAppContainer} from 'react-navigation';
import { purple, white } from "./utils/colors";
import reducer from './reducers'
import Constants from 'expo-constants'
import Deck from './components/Deck';

function CustomStatusBar({backgroundColor, ...props}){
  const height = Constants.statusBarHeight
  return(
    <View style = {{backgroundColor, height: height}}>
      <StatusBar translucent backgroundColor= {backgroundColor} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  History: {
    screen: Decks,
    navigationOptions:{
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Entypo name = 'archive' size = {30} color = {tintColor} />
    }
  },
  AddEntry:{
    screen: AddDeck,
    navigationOptions:{
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name = 'plus-square' size = {30} color = {tintColor} />
    }
  }
})

const Routes = createStackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions:{
      headerShown: false
    }
  },
  Deck:{
    screen: Deck
  }
})

const Home = createAppContainer(Routes)


export default function App() {
  return (
    <Provider store = {createStore(reducer)}>
      <View style = {styles.container}>
        <CustomStatusBar backgroundColor = {purple} />
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
