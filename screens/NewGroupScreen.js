import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Dimensions from 'Dimensions'

import Colors from '../constants/Colors'

class NewGroupScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      currentView: 0,
      groupName: ''
    }

    this.nextOption = this.nextOption.bind(this)
    this.backOption = this.backOption.bind(this)
  }

  renderItem() {
    return (
      <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
    )
  }

  nextOption() {
    this.setState({ currentView: 1})
    this.scrollView.scrollTo({x: Dimensions.get('window').width, animated: true })
  }

  backOption() {
    if (this.state.currentView === 0)
    return this.props.navigation.goBack()

    this.setState({ currentView: 0})
    this.scrollView.scrollTo({x: 0, animated: true })
  }

  render() {
    return (
      <View style={{backgroundColor: Colors.tintColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          style={{flex: 1, width: '100%'}}
          scrollEnabled={false}
          horizontal
        >
          <View
            style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: '100%'}}>
            {/* <Text style={{color: '#fff'}}>Nuevo grupo</Text> */}
            <TextInput
              onChangeText={text => this.setState({groupName: text})}
              value={this.state.groupName}
              placeholder="Nombre del Grupo"
              style={{borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.5)', padding: 5, paddingLeft: 10, paddingRight: 10, fontSize: 20, width: '80%', textAlign: 'center', color: '#fff'}}
            />
          </View>
          <View
            style={{flex: 1, display: 'flex', padding: 20, paddingTop: 50, width: Dimensions.get('window').width, height: '100%'}}>
            <Text style={{color: '#fff'}}>Añadir personas</Text>
            <TextInput
              placeholder="Correo electrónico"
              style={{borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.5)', padding: 5, paddingLeft: 10, paddingRight: 10, marginTop: 10}}
            />
            <ScrollView style={{marginTop: 40}}>
              {
                [0,0,0,0,0,0,0,0].map((element, index) =>
                  <View
                    key={index}
                    style={{display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'space-between'}}
                  >
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                      <View style={{width: 30, height: 30, backgroundColor: '#fff', borderRadius: 15}}></View>
                      <Text style={{fontWeight: '600', color: '#fff', marginLeft: 8, fontSize: 18}}>Nombre</Text>
                    </View>
                    <TouchableOpacity style={{display: 'flex', width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: '#fff', fontSize: 24, backgroundColor: 'transparent', fontWeight: '300', lineHeight: 0}}>+</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 30}}>
          <TouchableOpacity
            onPress={this.backOption}
            >
            <Text style={{fontSize: 16, color: '#fff'}}>
              {
                this.state.currentView === 0
                ? 'Cancelar'
                : 'Regresar'
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={(this.state.currentView === 0 && this.state.groupName === '')}
            onPress={this.nextOption}
            >
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              {
                this.state.currentView === 0
                ? 'Siguiente'
                : 'Terminar'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default NewGroupScreen
