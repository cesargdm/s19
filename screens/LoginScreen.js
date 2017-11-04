import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, Button, AsyncStorage, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'

import { login } from '../actions'
import Colors from '../constants/Colors'
import { SocialButton } from '../components'

function DefaultTextInput(props) {
  return (
    <TextInput
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      keyboardType={props.keyboardType}
      placeholder={props.placeholder}
      value={props.value}
      style={{width: 180, padding: 4, paddingRight: 7, paddingLeft: 7, borderColor: 'gray', borderWidth: 1, borderRadius: 5, ...props.style}}
      onChangeText={text => props.onChange(props.name, text)}
      secureTextEntry={props.secureTextEntry}
    />
  )
}

const auth = firebase.auth
const provider = new firebase.auth.FacebookAuthProvider()

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      isCreatingAccount: false,
      isWorking: false,
      isRestoringPassword: false,
      user: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetEmail = this.resetEmail.bind(this)
    this.loginFacebook = this.loginFacebook.bind(this)
    this.logoutFacebook = this.logoutFacebook.bind(this)
  }

  onChange(name, text) {
    this.setState({
      [name]: text
    })
  }

  resetEmail() {

  }

  async loginFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '147505939330132',
      { permissions: ['public_profile'] }
    );

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.

      })

      // Redirect ?
    }
  }

  async logoutFacebook(){
    await auth().signOut()
    this.setState({user: null})
  }

  onSubmit() {
    const { username, password } = this.state

    this.setState({
      isWorking: true
    })

    if (this.state.isCreatingAccount) {
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then(response => {
        this.setState({
          isWorking: false
        })

        const currentUser = firebase.auth().currentUser

        AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.props.login(currentUser)
      })
      .catch(error => {
        console.log(error, error.code)
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Usuario existente', 'El correo que introduciste ya fue registrado')
            break
          default:
            Alert.alert('Error al crear cuenta', 'Intenta nuevamente más tarde')
        }
        this.setState({
          isWorking: false
        })
      })
    } else {
      firebase.auth().signInWithEmailAndPassword('cesargdm@icloud.com', 'Macintosh96')
      .then(response => {
        this.setState({
          isWorking: false
        })

        const currentUser = firebase.auth().currentUser

        AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.props.login(currentUser)
      })
      .catch(error => {
        Alert.alert('Error al iniciar sesión')
        console.log(error, error.code)
        this.setState({
          isWorking: false
        })
      })
    }

  }

  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        {
          this.state.isRestoringPassword
          ? <View style={{width: '100%', flexGrow: 1,  position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{marginBottom: 30, fontWeight: '800'}}>Cambio de contraseña</Text>
              <Text style={{fontWeight: '600', fontSize: 10, width: 180}}>Correo electrónico</Text>
              <DefaultTextInput
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChange={this.onChange}
                value={this.state.username}
                name="username"
                placeholder="Correo electrónico"
                style={{marginBottom: 15}}
              />
              <Button
                title="Cambiar contraseña"
                onPress={this.resetEmail}
                color={Colors.tintColor}
              />
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 0, marginBottom: 20, left: 0, right: 0}}>
                <TouchableOpacity onPress={() => this.setState({ isRestoringPassword: false })}>
                  <Text style={{fontSize: 13, fontWeight: '500', color: Colors.tintColor}}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          :
          <View style={{width: '100%', flexGrow: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: 30, fontWeight: '700'}}>Senti</Text>
            <Text style={{marginBottom: 30, fontWeight: '600'}}>Iniciar sesión</Text>
            <View style={{width: '100%', maxWidth: 200, display: 'flex'}}>
              <SocialButton
                title="Facebook"
                backgroundColor="#3b5998"
                onPress={this.loginFacebook}
              />
              <SocialButton
                title="Twitter"
                backgroundColor="#1da1f2"
                onPress={() => {}}
              />
              <Text>O usa</Text>
              <SocialButton
                title="Correo electrónico"
                backgroundColor="green"
                onPress={(() => this.setState({emailSignup: true}))}
              />
            </View>
            {/* <View style={{margin: 20}}>
              <Text>O usa tu correo electrónico</Text>
            </View>
            <DefaultTextInput
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChange={this.onChange}
              value={this.state.username}
              name="username"
              placeholder="Correo electrónico"
              style={{marginBottom: 15}}
            />
            <DefaultTextInput
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              placeholder="Contraseña"
              style={{marginBottom: 15}}
              secureTextEntry
            /> */}
            {
              this.state.isCreatingAccount
              ? <DefaultTextInput
                  onChange={this.onChange}
                  value={this.state.repeatPassword}
                  name="repeatPassword"
                  placeholder="Repetir contraseña"
                  style={{marginBottom: 15}}
                  secureTextEntry
                />
              : null
            }
            {
              this.state.isWorking
              && <ActivityIndicator />
            }
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 0, marginBottom: 20, left: 0, right: 0}}>
              {
                !this.state.isCreatingAccount &&
                <TouchableOpacity onPress={() => this.setState({ isRestoringPassword: true })}>
                  <Text style={{fontSize: 13, fontWeight: '500', color: Colors.tintColor}}>Olvidé mi contraseña</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity onPress={() => this.setState(({isCreatingAccount}) => ({ isCreatingAccount: !isCreatingAccount }))}>
                <Text style={{fontSize: 13, fontWeight: '500', color: Colors.tintColor}}>{ this.state.isCreatingAccount ? 'Ya tengo cuenta, iniciar sesión' : 'No tengo cuenta' }</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps({credentials}) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(login(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
