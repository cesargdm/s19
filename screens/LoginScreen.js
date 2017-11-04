import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, Button, AsyncStorage, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Svg } from 'expo'
import firebase from 'firebase'

import { setCredentials } from '../actions'
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
      email: '',
      password: '',
      isCreatingAccount: false,
      isWorking: false,
      isRestoringPassword: false,
      user: null,
      emailSignup: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetEmail = this.resetEmail.bind(this)
    // this.facebookLogin = this.facebookLogin.bind(this)
    this.logoutFacebook = this.logoutFacebook.bind(this)
    this.loginFacebook = this.loginFacebook.bind(this)
  }

  onChange(name, text) {
    this.setState({
      [name]: text
    })
  }

  resetEmail() {

  }

   loginFacebook() {
     Expo.Facebook.logInWithReadPermissionsAsync('147505939330132', { permissions: ['public_profile', 'user_friends'] })
     .then((response) => {
       const { type, token } = response

       this.setState({
         isWorking: true
       })

       if (type === 'success') {
         // Build Firebase credential with the Facebook access token to sign in
         const credential = firebase.auth.FacebookAuthProvider.credential(token)

         // Sign in with credential from the Facebook user to get user information
         firebase.auth().signInWithCredential(credential)
         .then((facebookUser) => {
           let user = {
             name: facebookUser.displayName,
             phone: facebookUser.phoneNumber,
             photo: facebookUser.photoURL,
             uid: 'fuid-' + facebookUser.uid
           }

           //Post user to database specifying uid
           firebase.database().ref('users').child('fuid-'+ facebookUser.uid).set(user, () => {
             this.setState({
               isWorking: true
             })
             // Call action for user logged in
             AsyncStorage.setItem('credentials', JSON.stringify(user))
             this.props.setCredentials(user)
           })
         })
         .catch((error) => {
           // Handle Errors here.
           console.log(error)
           this.setState({
             isWorking: false
           })
         })
       }

       if (type === 'cancel') {
         // handle cancel ?
         console.log("Cancelled");
       }
     })
     .catch((error) => {
       // Handle strange shit occurring
       console.log(error)
     })


  }

  async logoutFacebook(){
    await auth().signOut()
    this.setState({user: null})
  }

  onSubmit() {
    const { email, password } = this.state

    this.setState({
      isWorking: true
    })

    if (this.state.isCreatingAccount) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(firebaseUser => {
        let user = {
          email: firebaseUser.email,
          password: password
        }

        //Post user to database specifying uid
        firebase.database().ref('users').child(firebaseUser.uid).set(user, () => {
          // Call actions for user logged in
          this.setState({
            isWorking: false
          })

          const currentUser = firebase.auth().currentUser

          AsyncStorage.setItem('credentials', JSON.stringify(currentUser))
          this.props.login(currentUser)
        })

      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Usuario existente', 'El correo que introduciste ya fue registrado')
            break
          case 'auth/weak-password':
            Alert.alert('Contraseña débil', 'El password debería tener por lo menos 6 caracteres')
            break
          default:
            Alert.alert('Error al crear cuenta', 'Intenta nuevamente más tarde')
        }
        this.setState({
          isWorking: false
        })
      })
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          isWorking: false
        })

        const currentUser = firebase.auth().currentUser

        AsyncStorage.setItem('credentials', JSON.stringify(currentUser))
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
          <View style={{width: '100%', flexGrow: 1, position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
            <KeyboardAvoidingView
              behavior="position">
              <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Svg width={100} height={100}>
                  <Svg.Path
                    d={'M17.18,51.11C16.954,51.112 16.76,50.944 16.73,50.72C16.568,49.582 15.941,48.56 15,47.9C13.759,47.067 12.283,46.654 10.79,46.72C9.535,46.648 8.291,47.001 7.26,47.72C6.423,48.38 5.954,49.405 6,50.47C6,51.342 6.526,52.132 7.33,52.47C9.123,53.212 10.99,53.758 12.9,54.1C17.02,55.03 19.77,56.1 21.16,57.3C22.55,58.5 23.24,60.41 23.24,63.06C23.32,65.561 22.14,67.941 20.1,69.39C18.033,70.93 15.2,71.7 11.6,71.7C8,71.7 5.2,70.87 3.2,69.21C1.256,67.574 0.092,65.189 0,62.65C-0.001,62.637 -0.002,62.623 -0.002,62.61C-0.002,62.355 0.205,62.144 0.46,62.14L5.25,62.14C5.481,62.144 5.675,62.321 5.7,62.55C5.784,63.75 6.368,64.861 7.31,65.61C8.562,66.487 10.075,66.913 11.6,66.82C13.12,66.898 14.635,66.584 16,65.91C16.972,65.444 17.592,64.457 17.59,63.38C17.675,62.441 17.241,61.527 16.46,61C14.961,60.236 13.351,59.709 11.69,59.44C7.23,58.48 4.227,57.403 2.68,56.21C1.18,55.06 0.43,53.21 0.43,50.8C0.338,48.27 1.452,45.841 3.43,44.26C5.757,42.541 8.611,41.685 11.5,41.84C14.297,41.718 17.047,42.61 19.24,44.35C21.109,45.916 22.283,48.161 22.5,50.59C22.502,50.607 22.503,50.624 22.503,50.64C22.503,50.892 22.301,51.101 22.05,51.11L17.18,51.11ZM35.6,71.47C32.82,71.623 30.113,70.521 28.23,68.47C26.5,66.47 25.64,63.71 25.64,60.07C25.64,56.737 26.52,54.113 28.28,52.2C30.196,50.244 32.866,49.208 35.6,49.36C38.8,49.36 41.263,50.327 42.99,52.26C44.71,54.19 45.58,56.94 45.58,60.51C45.6,60.796 45.6,61.084 45.58,61.37C45.55,61.599 45.351,61.772 45.12,61.77L31.21,61.77C31.228,63.083 31.605,64.366 32.3,65.48C33.26,66.589 34.701,67.164 36.16,67.02C36.988,67.025 37.797,66.778 38.48,66.31C39.004,66.009 39.421,65.551 39.67,65C39.737,64.821 39.909,64.701 40.1,64.7L44.79,64.7C44.794,64.7 44.798,64.7 44.802,64.7C45.049,64.7 45.252,64.903 45.252,65.15C45.252,65.197 45.245,65.245 45.23,65.29C44.727,67.085 43.613,68.649 42.08,69.71C40.154,70.951 37.89,71.566 35.6,71.47ZM39.82,58.29C39.763,57.234 39.417,56.213 38.82,55.34C38.019,54.364 36.789,53.84 35.53,53.94C34.234,53.873 32.996,54.498 32.28,55.58C31.765,56.405 31.424,57.328 31.28,58.29L39.82,58.29ZM49.24,50.66C49.24,50.657 49.24,50.653 49.24,50.65C49.24,50.277 49.547,49.97 49.92,49.97L54,49.97C54.249,49.975 54.45,50.181 54.45,50.43L54.45,53.07C54.682,52.699 54.936,52.341 55.21,52C56.652,50.231 58.862,49.263 61.14,49.4C63.074,49.301 64.962,50.029 66.33,51.4C67.651,52.896 68.328,54.857 68.21,56.85L68.21,70.24C68.21,70.619 67.899,70.93 67.52,70.93L63.37,70.93C62.991,70.93 62.68,70.619 62.68,70.24L62.68,57.83C62.752,56.816 62.453,55.81 61.84,55C61.172,54.306 60.231,53.94 59.27,54C58.018,53.918 56.793,54.399 55.93,55.31C55.085,56.377 54.667,57.722 54.76,59.08L54.76,70.24C54.76,70.243 54.76,70.247 54.76,70.25C54.76,70.623 54.453,70.93 54.08,70.93C54.08,70.93 54.08,70.93 54.08,70.93L49.92,70.93C49.92,70.93 49.92,70.93 49.92,70.93C49.547,70.93 49.24,70.623 49.24,70.25C49.24,70.247 49.24,70.243 49.24,70.24L49.24,50.66ZM83,70.4C83.001,70.76 82.719,71.064 82.36,71.09C81.57,71.09 80.64,71.16 79.59,71.16C78.115,71.303 76.633,70.951 75.38,70.16C74.452,69.269 73.98,68.001 74.1,66.72L74.1,53.84L71.84,53.84C71.84,53.84 71.84,53.84 71.84,53.84C71.467,53.84 71.16,53.533 71.16,53.16C71.16,53.157 71.16,53.153 71.16,53.15L71.16,50.66C71.16,50.657 71.16,50.653 71.16,50.65C71.16,50.277 71.467,49.97 71.84,49.97L74.06,49.97L74.06,45C74.06,45 74.06,45 74.06,45C74.06,44.627 74.367,44.32 74.74,44.32C74.743,44.32 74.747,44.32 74.75,44.32L78.9,44.32C78.903,44.32 78.907,44.32 78.91,44.32C79.283,44.32 79.59,44.627 79.59,45L79.59,50L82.27,50C82.649,50 82.96,50.311 82.96,50.69L82.96,53.18C82.96,53.559 82.649,53.87 82.27,53.87L79.59,53.87L79.59,65.75C79.524,66.138 79.693,66.531 80.02,66.75C80.602,66.946 81.217,67.025 81.83,66.98L82.27,66.98C82.649,66.98 82.96,67.291 82.96,67.67L83,70.4ZM86.68,50.66C86.68,50.281 86.991,49.97 87.37,49.97L91.52,49.97C91.899,49.97 92.21,50.281 92.21,50.66L92.21,70.24C92.21,70.619 91.899,70.93 91.52,70.93L87.37,70.93C86.991,70.93 86.68,70.619 86.68,70.24L86.68,50.66Z'}
                    stroke="#000"
                  />
                  <Svg.Circle
                    cx={95}
                    cy={39}
                    r={4}
                    fill="rgb(121,100,202)"
                  />
                  <Svg.Circle
                    cx={87}
                    cy={33}
                    r={5}
                    fill="rgb(249,235,33)"
                  />
                  <Svg.Circle
                    cx={89}
                    cy={45}
                    r={3}
                    fill="rgb(102,223,223)"
                  />
                </Svg>
                <Text style={{marginBottom: 10, fontWeight: '600'}}>Registrarse/Iniciar sesión</Text>
                <View
                  behavior="position"
                  style={{width: '100%', maxWidth: 200, display: 'flex'}}
                  >
                  {
                    this.state.emailSignup
                    ?
                    <View>
                      <DefaultTextInput
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChange={this.onChange}
                        value={this.state.email}
                        name="email"
                        placeholder="Correo electrónico"
                        style={{marginBottom: 15, borderColor: Colors.tintColor, borderRadius: 20, padding: 6, paddingRight: 15, paddingLeft: 15, width: '100%'}}
                      />
                      <DefaultTextInput
                        onChange={this.onChange}
                        value={this.state.password}
                        name="password"
                        placeholder="Contraseña"
                        style={{marginBottom: 15, borderColor: Colors.tintColor, borderRadius: 20, padding: 6, paddingRight: 15, paddingLeft: 15, width: '100%'}}
                        secureTextEntry
                      />
                    </View>
                    :
                    <SocialButton
                      title="Facebook"
                      backgroundColor="#3b5998"
                      onPress={this.loginFacebook}
                    />
                  }
                  <SocialButton
                    title={this.state.emailSignup ? 'Continuar' : "Correo electrónico"}
                    backgroundColor={this.state.emailSignup ? Colors.tintColor : "#fff"}
                    textColor={!this.state.emailSignup && "#000"}
                    onPress={() => this.setState({ emailSignup: true })}
                    border={!this.state.emailSignup}
                  />
                  {
                    this.state.emailSignup
                    &&
                    <TouchableOpacity
                      onPress={() => this.setState({ emailSignup: false })}
                      style={{color: '#ccc'}}
                      >
                      <Text style={{textAlign: 'center', color: '#aaa', fontWeight: '600', marginTop: 30}}>Cancelar</Text>
                    </TouchableOpacity>
                  }
                </View>
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
              </View>
              {
                this.state.isWorking
                && <ActivityIndicator />
              }
              </KeyboardAvoidingView>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 0, marginBottom: 20, left: 0, right: 0}}>
                {
                  !this.state.isCreatingAccount &&
                  <TouchableOpacity onPress={() => this.setState({ isRestoringPassword: true })}>
                    <Text style={{fontSize: 13, fontWeight: '500', color: Colors.tintColor}}>Olvidé mi contraseña</Text>
                  </TouchableOpacity>
                }

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
    setCredentials: (user) => {
      dispatch(setCredentials(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
