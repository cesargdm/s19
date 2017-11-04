import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'

import Colors from '../constants/Colors'
import { CloseButton } from '../components'

class NotificationsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      elements: [{
        type: 'cancel',

      }
        ,{
        message: 'Luis Octavio Gómez te ha añadido a su grupo de Familia',
        _id: 'd982j3d8iqj3idj'
      }]
    }

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({item}) {
    if (item.type === 'cancel') return (
      <View style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 20}}>
        <CloseButton
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )

    return (
      <View style={{display: 'flex', height: 130, padding: 20}}>
        <View style={{display: 'flex', backgroundColor: '#fff', height: '100%', borderRadius: 10, padding: 10, alignItems: 'center', flexDirection: 'row'}}>
          <View style={{width: 40, height: 40, backgroundColor: 'red', borderRadius: 20, marginRight: 10}}></View>
          <View style={{flex: 1}}><Text style={{fontSize: 16}}>{item.message}</Text></View>
          <View style={{width: 73, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10}}>
            <TouchableOpacity style={{width: 30, height: 30, borderRadius: 15, backgroundColor: 'blue'}}></TouchableOpacity>
            <TouchableOpacity style={{width: 30, height: 30, borderRadius: 15, backgroundColor: 'blue'}}></TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={{width: '100%', height: '100%', marginTop: 30, paddingTop: 10}}
        data={this.state.elements}
        extraData={this.state.elements}
        keyExtractor={element => element._id}
        renderItem={this.renderItem}
      />

    )
  }
}

export default NotificationsScreen
