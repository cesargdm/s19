import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'

class NewAlertScreen extends Component {
  static navigationOptions = {
    header: null
  }

  renderItem() {
    return (
      <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
    )
  }

  render() {
    return (
      <View style={{padding: 30, backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>X</Text>
        </TouchableOpacity>
        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          ['element', 'element2', 'element3', 'element-4', '23432'].map((element, index) =>
          <TouchableOpacity
            key={index}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110, backgroundColor: '#fff', margin: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}
          >
            <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 25, marginBottom: 10}}></View>
            <Text>{element}</Text>
          </TouchableOpacity>
          )
        }
        </View>
      </View>
    )
  }
}

export default NewAlertScreen
