import React, { Component } from 'react'
import { Constants, Location, Permissions } from 'expo'
import { View, Text, TouchableOpacity } from 'react-native'

class AlertsScreen extends Component {

  sendLocation() {
    Permissions.askAsync(Permissions.LOCATION)
    .then(({status}) => {
      if (status !== 'granted') return

      Location.getCurrentPositionAsync({})
      .then(location => {
        const {latitude, longitude, accuracy} = location.coords
        console.log({latitude, longitude, accuracy})
      })
    })
  }

  render() {
    return (
      <View>
        <Text>Alerts</Text>
        <TouchableOpacity
          onPress={this.sendLocation}
        >
          <Text>Send location</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AlertsScreen
