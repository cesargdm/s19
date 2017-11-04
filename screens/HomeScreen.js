import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Alert, TextInput, AsyncStorage, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { Contacts, Permissions, WebBrowser, BarCodeScanner } from 'expo'

import Colors from '../constants/Colors'

class HomeScreen extends Component {

  // static navigationOptions = ({navigation, screenProps}) => {
  //   const { params = {} } = navigation.state
  //
  //   return {
  //     title: 'Mi información',
  //     headerRight: (
  //       <TouchableOpacity onPress={() => params.onEdit()}>
  //         <Text style={{marginRight: 15, fontWeight: '600', color: Colors.tintColor}}>
  //           { params.isEditing ? 'Terminar' : 'Editar'}
  //         </Text>
  //       </TouchableOpacity>
  //     ),
  //     // headerRight: (
  //     //   <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
  //     //     <Text style={{backgroundColor: Colors.tintColor, color: '#fff', padding: 5, borderRadius: 5, marginRight: 10, overflow: 'hidden', fontWeight: '600'}}>Escanear</Text>
  //     //   </TouchableOpacity>
  //     // )
  //   }
  // }

  componentWillMount() {
    this.getUserDetails()
  }

  getUserDetails() {
    if (!this.props.user) {
      return
    }

    firebase.database().ref('/users/' + this.props.user.uid).once('value')
    .then(snapshot => {
      let userData = snapshot.val()

      let health = this.state.health
      // Load new values
      health = health.map(healthState => ({ ...healthState, value: userData[healthState.key] }) )

      this.setState({
        isDoctor: userData.isDoctor,
        fullName: userData.fullName,
        health
      }, () => {
        this.props.navigation.setParams({
          isDoctor: userData.isDoctor
        })
      })
    })
    .catch(error => {
      Alert.alert('Error al obtener información', 'Ups, estamos teniendo problemas al obtener la información, intenta de nuevo más tarde')
    })
  }

  render() {
    return (
      <View>
        
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
}

function mapStateToProps({auth}) {
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps)(HomeScreen)
