import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity, Switch} from 'react-native'
import { ImagePicker } from 'expo'

import Colors from '../constants/Colors'

function ProfileElement(props) {
  return(
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{maxWidth: 300, height: 40, flex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
        {
          props.children
        }
      </View>
    </View>
  )
}

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      tags: [
        {
          title: 'Paramédico'
        }
      ],
      elements: [{
        type: 'profile',
        _id: 'profile'
      }, {
        type: 'tags',
        _id: 'tags'
      }, {
        type: 'hosting',
        _id: 'hosting'
      }, {
        type: 'certificates',
        _id: 'certificates'
      },  {
        type: 'transportation',
        _id: 'transportation'
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
      case 'hosting':
      return (
        <ProfileElement>
            <View>
              <Text style={{fontSize: 17}}>Hospedaje</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{width: 30, height: 30, borderWidth: 1, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: Colors.tintColor, backgroundColor: '#fff'}}><Text style={{fontSize: 20, color: Colors.tintColor}}>-</Text></TouchableOpacity>
              <Text style={{fontSize: 17, fontWeight: '600', marginRight: 5, marginLeft: 5, fontSize: 18}}>3</Text>
              <TouchableOpacity style={{width: 30, height: 30, borderWidth: 1, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: Colors.tintColor, backgroundColor: '#fff'}}><Text style={{fontSize: 20, color: Colors.tintColor}}>+</Text></TouchableOpacity>
            </View>
          </ProfileElement>
      )
      case 'tags':
      return (
        <View style={{display: 'flex', padding: 10, flexDirection: 'row', justifyContent: 'center'}}>
          {
            this.state.tags.map((tag, index) =>
              <View
                key={index}
                style={{backgroundColor: Colors.tintColor, borderRadius: 10, shadowColor: '#000', shadowColor: Colors.tintColor ,shadowOpacity: 0.9, shadowOffset: {width: 0, height: 0}}}>
                <Text style={{backgroundColor: 'transparent', padding: 5, paddingLeft: 13, paddingRight: 13, color: '#fff'}}>{tag.title}</Text>
              </View>
            )
          }
        </View>
      )
      case 'certificates':
      return (
        <ProfileElement>
            <View>
              <Text style={{fontSize: 17}}>Certificados</Text>
            </View>
            <View>
              <Switch
                onTintColor={Colors.tintColor}
                tintColor={Colors.tintColor}
              />
            </View>
          </ProfileElement>
      )
      case 'transportation':
      return (
        <ProfileElement>
            <View>
              <Text style={{fontSize: 17}}>Vehículos</Text>
            </View>
            <View>
              <Switch
                onTintColor={Colors.tintColor}
                tintColor={Colors.tintColor}
              />
            </View>
          </ProfileElement>
      )
      case 'profile':
      default:
      return (
          <View style={{width: '100%', height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40}}>
            <Text>Título</Text>
            <Text style={{fontWeight: '700', fontSize: 20, color: Colors.tintColor, marginBottom: 10}}>Rescatista</Text>
            <TouchableOpacity
              style={{width: 100, height: 100, backgroundColor: '#ccc', borderRadius: 50}}
              onPress={() => this.selectProfilePicture()}
            >
          </TouchableOpacity>
          <Text style={{fontWeight: '800', marginTop: 20, fontSize: 22}}>Luis Octavio Gómez</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
          style={{width: '100%', height: '100%', marginTop: 30, paddingTop: 20}}
          data={this.state.elements}
          extraData={this.state.elements}
          keyExtractor={element => element._id}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

export default ProfileScreen
