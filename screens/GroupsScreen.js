import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

class GroupsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedElement: null,
      elements: [
        {
          type: 'options',
          _id: 'options'
        },
        {
          _id: '32nejqknej',
          title: 'Familia',
          members: ['3dasdads','d32dasdasd','dasdasdasd'],
          percentage: 0.32,
          actions: {
            title: 'Reserva baja'
          }
        },
        {
          _id: '23rdasd3x',
          title: 'Amigos',
          members: ['3dasdads','d32dasdasd','dasdasdasd'],
          percentage: 0.92,
        },
        {
          _id: '23rd324d3x',
          title: 'Empresa',
          members: ['3dasdads','d32dasdasd','dasdasdasd'],
          percentage: 0.92,
        }
      ]
    }

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({item}) {
    switch (item.type) {
      case 'options':
        return (
          <View style={{padding: 20, paddingTop: 10, paddingBottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: 38, height: 38, backgroundColor: "#fff", borderRadius: 19, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}/>
            <View style={{width: 38, height: 38, backgroundColor: "#fff", borderRadius: 19, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}/>
          </View>
        )
      default:
      return (
        <TouchableOpacity style={{ width: '100%', padding: 20}} onPress={() => this.setState(prevState => ({ selectedElement: prevState.selectedElement === item._id ? null : item._id }))}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{padding: 20, width: '100%', height: 130, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}, display: 'flex', alignItems: 'flex-end'}}>
              <Text style={{fontSize: 34, fontWeight: '300'}}>{item.title}</Text>
              <Text style={{marginBottom: 10}}>{item.members.length} Integrantes</Text>
              <View style={{width: '100%', height: 10, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden'}}>
                <View style={{width: `${item.percentage * 100}%`, height: '100%', backgroundColor: '#654BC1', borderRadius: 5}}></View>
              </View>
            </View>
            {
              item.actions
              &&
              <View style={{position: 'relative', width: '90%', height: item._id === this.state.selectedElement ? 120 : 30, backgroundColor: '#654BC1', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5, paddingLeft: 10}}>
                {
                  item._id === this.state.selectedElement
                  ? <Text></Text>
                  : <Text style={{color: '#fff', fontWeight: '500'}}>Reserva insuficiente</Text>
                }
              </View>
            }
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', paddingTop: 20}}>
        <FlatList
          style={{width: '100%', height: '100%', flex: 1 }}
          data={this.state.elements}
          // extraData={this.state.elements}
          keyExtractor={element => element._id}
          renderItem={this.renderItem}
          // alwaysBounceVertical={false}
        />
      </View>
    )
  }
}

export default GroupsScreen
