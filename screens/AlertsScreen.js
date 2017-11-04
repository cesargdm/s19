import React, { Component } from 'react'
import { Constants, Location, Permissions } from 'expo'
import Colors from '../constants/Colors'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { CloseButton } from '../components'

class AlertsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedElement: null,
      showCreateAlert: false,
      elements: [
        {
          type: 'header'
        },
        {
          type: '000',
          value: 234,
          _id: 'o3ei2j3eoij23eik',
          title: 'Víveres'
        },
        {
          type: '002',
          value: 527,
          _id: 'o3ei56eoij23eik',
          title: 'Herramientas'
        }
      ]
    }

    this.onAlarm = this.onAlarm.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onAlarm: this.onAlarm
    })
  }

  onAlarm() {
    this.props.navigation.navigate('NewAlert')

    // this.setState({ showCreateAlert: true })
    // Permissions.askAsync(Permissions.LOCATION)
    // .then(({status}) => {
    //   return status === 'granted'
    //   ? Location.getCurrentPositionAsync({enableHighAccuracy: true})
    //   : null
    // })
    // .then(({coords}) => {
    //   const { accuracy, altitude, latitude, longitude } = coords
    //   console.log({ accuracy, altitude, latitude, longitude })
    // })
    // .catch(console.log)
  }

  renderItem({item}) {
    if (item.type === 'header')
    return (
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, marginBottom: 8, alignItems: 'center'}}>
        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 15, paddingLeft: 30, paddingTop: 7, paddingBottom: 7, borderRadius: 15, marginRight: 10, shadowColor: 'red', shadowOpacity: 0.7, shadowOffset: {width: 0, height: 0}}}
          onPress={() => this.onAlarm()}>
          <Text style={{fontWeight: '600', color: '#fff'}}>Alerta</Text>
        </TouchableOpacity>
      </View>
    )

    return (
      <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
        <TouchableOpacity
          onPress={() => this.setState(prevState => ({ selectedElement: prevState.selectedElement === item._id ? null : item._id }))}
          style={{width: '100%', height: 70, borderRadius: 10, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}
        >
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: 'red', width: 40, height: 40, borderRadius: 20, marginRight: 20}}></View>
            <Text style={{fontSize: 18}}>{item.title}</Text>
          </View>
          <Text style={{fontSize: 18}}>{item.value}</Text>
        </TouchableOpacity>
        {
          this.state.selectedElement === item._id
          &&
          <View style={{width: '90%'}}>
            {
              [0,0,0,0,0].map((requirement, index) =>
                <View
                  key={index}
                  style={{height: 90, backgroundColor: '#999', marginBottom: 20, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                >
                  <View style={{flex: 1}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flex: 1}}>
                      <Text style={{color: '#fff', fontSize: 24, fontWeight: '600', marginRight: 5}}>5 min</Text>
                      <Text>13 min</Text>
                    </View>
                    <Text style={{color: '#fff'}}>San Simonito el Alto, Tenancingo, MEX, México, 21312</Text>
                  </View>
                  <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: '#fff', marginBottom: 5}}></View>
                    <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>Enlatados</Text>
                  </View>
                </View>
              )
            }
          </View>
        }
      </View>
    )
  }

  render() {
    if (this.state.showCreateAlert) return (
      <View style={{position: 'absolute', top: 0}}>
        <Text></Text>
      </View>
    )

    return (
      <FlatList
        style={{width: '100%', height: '100%', marginTop: 30, paddingTop: 10, paddingBottom: 30}}
        data={this.state.elements}
        extraData={this.state.elements}
        keyExtractor={element => element._id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default AlertsScreen
