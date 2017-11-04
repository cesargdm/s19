import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'

class NewAlertScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => NavigationActions.back()}>
          <Text>Grupos</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewAlertScreen
