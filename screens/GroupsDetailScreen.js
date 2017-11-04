import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'
import { BackButton } from '../components'

class GroupsDetailScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <View style={{paddingTop: 50, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
        <View style={{paddingTop: 0, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <BackButton
            onPress={() => this.props.navigation.goBack()}
          />
          <TouchableOpacity style={{padding: 14, paddingTop: 7, paddingBottom: 7, backgroundColor: Colors.tintColor, borderRadius: 14}}>
            <Text style={{color: '#fff', fontWeight: '800'}}>¿Todo OK?</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, padding: 20}}>
          <Text style={{fontSize: 38, marginBottom: 10}}>Familia</Text>
          <Text>4 Integrantes</Text>
          <ScrollView horizontal>
            {
              [0,0,0,0,0].map((member, index) =>
                <View
                  key={index}
                  style={{width: 34, height: 34, backgroundColor: '#999', marginRight: 10, borderRadius: 17}}
                >
                </View>
              )
            }
          </ScrollView>
        </ScrollView>
      </View>
    )
  }
}

export default GroupsDetailScreen
