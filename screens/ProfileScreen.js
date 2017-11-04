import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [{
        type: 'profile',
        _id: 'profile'
      }]
    }

    this.selectProfilePicture = this.selectProfilePicture.bind(this)
this.renderItem = this.renderItem.bind(this)
  }

  async selectProfilePicture() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  renderItem({item}) {
    switch (item.type) {
      case 'profile':
      default:
      return (
          <View style={{width: '100%', height: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40}}>
            <TouchableOpacity
              style={{width: 90, height: 90, backgroundColor: '#ccc', borderRadius: 45}}
              onPress={() => this.selectProfilePicture()}

            >
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <FlatList
        style={{width: '100%', height: '100%'}}
        data={this.state.elements}
        extraData={this.state.elements}
        keyExtractor={element => element._id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default ProfileScreen
