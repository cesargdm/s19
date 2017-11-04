import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Location, Permissions } from 'expo'

import Colors from '../constants/Colors'
import { CloseButton } from '../components'

import firebase from 'firebase'

class NewAlertScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      currentCoords: null,
      selectedElement: null,
      selectedOptions: []
    }

    this.sendReport = this.sendReport.bind(this)
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.LOCATION)
    .then(({status}) => {
      return status === 'granted'
      ? Location.getCurrentPositionAsync({enableHighAccuracy: true})
      : null
    })
    .then(({coords}) => {
      this.setState({
        currentCoords: coords
      })
    })
  }

  sendReport() {
    let report = {
      options: this.state.selectedOptions,
      coords: this.state.currentCoords,
    }
    // Report to firebase
    firebase.database().ref('reports').push(report)
    .then(() => {
      this.props.navigation.goBack()
    })
    console.log(
      this.state.selectedElement,
      this.state.selectedOptions,
      this.state.currentCoords
    )
  }

  renderItem() {
    return (
      <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
    )
  }

  render() {
    return (
      <View style={{padding: 20, backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 20}}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
              this.state.selectedElement
              ?
              <TouchableOpacity onPress={() => this.setState({ selectedElement: null })}>
                <Text style={{color: this.state.selectedElement.color, fontWeight: '600'}}>{this.state.selectedElement.title}</Text>
              </TouchableOpacity>
              : <Text style={{color: Colors.tintColor, fontWeight: '600'}}>¿Qué hace falta en la zona?</Text>
            }
          </View>
          <CloseButton
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10}}>
        {
          this.state.selectedElement
          ?
            <View style={{flex: 1, display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
              <ScrollView style={{flex: 1}}>
                <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                  {
                    this.state.selectedElement.options.map((element, index) => {
                      const isContained = this.state.selectedOptions.filter(({type}) => element.type === type).length
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            this.setState(prevState =>
                              ({
                                selectedOptions: isContained ? prevState.selectedOptions.filter(({type}) => element.type !== type) : prevState.selectedOptions.concat([element])
                              })
                            )
                          }
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120,
                            backgroundColor: isContained ? this.state.selectedElement.color :'#fff',
                            margin: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0},
                          }}
                        >
                          <View style={{
                            width: 50, height: 50, borderWidth: 3,
                            borderColor: !isContained ? this.state.selectedElement.color :'#fff',
                            borderRadius: 25, marginBottom: 10
                          }} />
                          <Text style={{color: !isContained ? '#000' :'#fff', fontWeight: '500'}}>{element.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </ScrollView>
              <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <TouchableOpacity
                  onPress={this.sendReport}
                  style={{backgroundColor: this.state.selectedElement.color, padding: 10, paddingRight: 22, paddingLeft: 22, borderRadius: 20, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                  <Text style={{fontWeight: '700', color: '#fff'}}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          : this.props.options.map((element, index) =>
              <TouchableOpacity
                key={index}
                onPress={() => this.setState({selectedElement: element})}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, backgroundColor: '#fff', margin: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}
              >
                <View style={{width: 50, height: 50, borderWidth: 3 , borderColor: element.color || 'red', borderRadius: 25, marginBottom: 10}}></View>
                <Text style={{padding: 3, paddingTop: 0, paddingBottom: 0, textAlign: 'center'}}>{element.title}</Text>
              </TouchableOpacity>
          )
        }
        </View>
      </View>
    )
  }
}

NewAlertScreen.defaultProps = {
  options: [
    {
      title: 'Víveres',
      type: '000',
      color: '#27b4e8',
      options: [
        {
          title: 'Elatados',
          type: '001'
        },
        {
          title: 'Agua',
          type: '002'
        },
        {
          title: 'Ropa',
          type: '003'
        },
        {
          title: 'Higiene',
          type: '004'
        },
        {
          title: 'Agua',
          type: '005'
        }
      ]
    },
    {
      title: 'Herramientas',
      type: '100',
      color: '#997420',
      options: [
        {
          title: 'Elatados',
          type: '101'
        }
      ]
    },
    {
      title: 'Maquinaria',
      type: '200',
      color: '#e8961c',
      options: [
        {
          title: 'Elatados',
          type: '201'
        }
      ]
    },
    {
      title: 'Asistencia Médica',
      type: '300',
      color: '#591bcd',
      options: [
        {
          title: 'Elatados',
          type: '301'
        }
      ]
    },
    {
      title: 'Vivienda',
      type: '004',
      color: '#b942dd',
      options: [
        {
          title: 'Elatados',
          type: '010'
        }
      ]
    },
    {
      title: 'Asistencia para Animales',
      type: '005',
      color: '#e3d841',
      options: [
        {
          title: 'Elatados',
          type: '010'
        }
      ]
    },
    {
      title: 'Manos',
      type: '006',
      color: '#1f7fd7',
      options: [
        {
          title: 'Elatados',
          type: '010'
        }
      ]
    }
  ]
}

export default NewAlertScreen
