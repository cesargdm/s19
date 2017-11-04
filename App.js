import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as firebase from 'firebase'

import RootApp from './RootApp.js'
import aid from './reducers'

const store = createStore(aid)

firebase.initializeApp({
  apiKey: "AIzaSyBW2DnON1SFfQIRWk3fB7kj3I2YjdByHSI",
  authDomain: "senti-5ca31.firebaseapp.com",
  databaseURL: "https://senti-5ca31.firebaseio.com",
  projectId: "senti-5ca31",
  storageBucket: "senti-5ca31.appspot.com",
  messagingSenderId: "45207062216"
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsAreLoaded: false,
      isLoggedIn: false
    }
  }

  render() {
    return (
      <Provider store={store}>
        {
          <RootApp
            {...this.props}
            skipLoadingScreen={this.state.skipLoadingScreen}
            assetsAreLoaded={this.state.assetsAreLoaded}
          />
        }
      </Provider>
    )
  }
}
