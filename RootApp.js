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

import { logout, setCredentials } from './actions'
import LoginScreen from './screens/LoginScreen'
import RootNavigation from './navigation/RootNavigation'

class RootApp extends Component {
  componentWillMount() {
    AsyncStorage.getItem('credentials')
    .then(userString => {

      const user = JSON.parse(userString)

      if (!user) {
        return this.props.logout()
      }

      console.log('USER', user)

      this.props.setCredentials({...user, isLoggedIn: true})
    })
    .catch(() => {
      this.props.logout()
    })
  }

  render() {
    return (
      !this.props.auth.isLoggedIn
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
    setCredentials: (user) => {
      dispatch(setCredentials(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootApp)
