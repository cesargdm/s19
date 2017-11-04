import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Platform,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import { logout } from './actions'
import LoginScreen from './screens/LoginScreen'
import RootNavigation from './navigation/RootNavigation'

class RootApp extends Component {
  constructor(props) {
    super(props)

    this.setUser = this.setUser.bind(this)
  }

  componentWillMount() {
    this.setUser()
  }

  setUser() {
    AsyncStorage.getItem('currentUser')
    .then(userString => {
      console.log({userstring})
      if (!userString) {
        this.props.logout()
      }

      const user = JSON.parse(userString)
      this.props.setUser(user)
    })
    .catch(() => {
      console.log('No user')
      this.props.logout()
    })
  }

  render() {
    return (
      false
      ? <LoginScreen />
      : <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' &&
          <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout())
    },
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootApp)
