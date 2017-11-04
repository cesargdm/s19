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

let store = createStore(aid)

firebase.initializeApp({
  apiKey: "AIzaSyCOgis5l8cQgIDSRw0xuw-RYhDEDABQSMc",
  authDomain: "medical-cbf55.firebaseapp.com",
  databaseURL: "https://medical-cbf55.firebaseio.com",
  projectId: "medical-cbf55",
  storageBucket: "medical-cbf55.appspot.com",
  messagingSenderId: "1000049284751"
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
