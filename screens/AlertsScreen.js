import React, { Component } from 'react'
import { Constants, Location, Permissions } from 'expo'
import Colors from '../constants/Colors'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

class AlertsScreen extends Component {

  static navigationOptions({navigation}) {
    const { params = {} } = navigation.state

    return {
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 15, paddingTop: 5, paddingBottom: 5, borderRadius: 5, marginRight: 10}}
          onPress={() => params.onAlarm()}>
          <Text style={{fontWeight: '600', color: '#fff'}}>Alerta</Text>
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showCreateAlert: false,
      elements: [
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
    return (
      <View style={{width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
        <View style={{width: '100%', height: '100%', borderRadius: 10, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: 'red', width: 40, height: 40, borderRadius: 20, marginRight: 20}}></View>
            <Text style={{fontSize: 18}}>{item.title}</Text>
          </View>
          <Text style={{fontSize: 18}}>{item.value}</Text>
        </View>
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
        style={{width: '100%', height: '100%', paddingTop: 10}}
        data={this.state.elements}
        extraData={this.state.elements}
        keyExtractor={element => element._id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default AlertsScreen
