import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList,Platform } from "react-native";
import { getDecks, getDeck, clearItems } from "../utils/api";
import { receiveEntries, addEntry } from "../actions/index";
import { blue, white } from "../utils/colors";
import { AppLoading } from "expo";
import { connect } from "react-redux";
import DeckList from "./DeckList";

class Decks extends Component {
  state = {
    isLoading: true,
  };

  convertArrayToObject = (array) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        ...item,
      };
    }, initialValue);
  }

  FlatListItemSeperator =(highlighted) => {
    return (
        <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
    )
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await getDecks().then(res => {
        const result = this.convertArrayToObject(res)
        dispatch(receiveEntries(result))
    }).then(() => this.setState({
        isLoading: false
    }))
  }

  render() {
    const { isLoading } = this.state;
    const { state } = this.props;
    const data = []
    Object.keys(state).map((key) => data.push({
        'title': key
    }))
    console.log(state)
    if (isLoading) {
      console.log('Loading')
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={Platform.OS === 'android' && this.FlatListItemSeperator}
                data={data}
                renderItem={({item}) => (
                    <DeckList navigation = {this.props.navigation} key = {item.title} subject = {item.title} />
                )}
                keyExtractor = {(item,index) => index.toString()}
            />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems:'stretch',
    justifyContent: 'space-evenly'
  },
  separator: {
    marginBottom: 30
  }
});
