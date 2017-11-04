import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'
import { connect } from 'react-redux'


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
      photo: '',
      elements: [{
        type: 'profile',
        _id: 'profile'
      }, {
        type: 'hosting',
        _id: 'hosting'
      }, {
        type: 'certificates',
        _id: 'certificates'
      }]
    }

    this.selectProfilePicture = this.selectProfilePicture.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  selectProfilePicture() {
    ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3]})
    .then((result) => {
      if (!result.cancelled) {
        this.setState({ photo: result.uri })
      //  firebase.database().ref('users').child()update(updates)
      }
    })
    .catch((error) => {
      // Dumb catch
      console.log(error)
    })
  }

  renderItem({item}) {
    switch (item.type) {
      case 'hosting':
      return (
        <ProfileElement>
            <View>
              <Text style={{fontSize: 17}}>Hospedaje</Text>
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '600'}}>3</Text>
            </View>
          </ProfileElement>
      )
      case 'certificates':
      return (
        <ProfileElement>
            <View>
              <Text style={{fontSize: 17}}>Certificados</Text>
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '600'}}>3</Text>
            </View>
          </ProfileElement>
      )
      case 'profile':
      default:
      return (
          <View style={{width: '100%', height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40}}>
            <Text>Título</Text>
            <Text style={{fontWeight: '600', fontSize: 20, color: Colors.tintColor, marginBottom: 10}}>Rescatista</Text>
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
      <FlatList
        style={{width: '100%', height: '100%', marginTop: 30, paddingTop: 20}}
        data={this.state.elements}
        extraData={this.state.elements}
        keyExtractor={element => element._id}
        renderItem={this.renderItem}
      />
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(login(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
