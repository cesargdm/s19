import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Svg } from 'expo'

import Colors from '../constants/Colors'

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
            title: 'Reserva baja',
            type: '00',
            elements: [
              {
                title: 'Linterna de baterías'
              },
              {
                title: 'Silbato'
              },
              {
                title: 'Comida elatada'
              },
              {
                title: 'Baterías'
              }
            ]
          }
        },
        {
          _id: '23rdasd3x',
          title: 'Amigos',
          members: ['3dasdads','d32dasdasd','dasdasdasd'],
          percentage: 0.92,
        },
        {
          _id: '23rd3d3T3s',
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notifications')}
              style={{width: 38, height: 38, backgroundColor: "#fff", borderRadius: 19, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}
            >
              <Svg height={38} width={38}>
                <Svg.Path
                  d="M23.22,21.72a.09.09,0,0,1,0-.07V18.26a4.53,4.53,0,0,0-3.29-4.69.1.1,0,0,1-.06-.09v-.19a1.18,1.18,0,0,0-1-1.19,1.12,1.12,0,0,0-1.28,1.11v.34a4.53,4.53,0,0,0-3.34,4.71v3.4a.14.14,0,0,1,0,.06l-1.08,1.37a.08.08,0,0,0,0,.05v.7a.09.09,0,0,0,.09.09H24.77a.09.09,0,0,0,.09-.09v-.69a.11.11,0,0,0,0-.07Z"
                  fill={Colors.tintColor}
                />
                <Svg.Path
                  d="M18.81,25.91a1.41,1.41,0,0,0,1.42-1.32.1.1,0,0,0-.09-.1H17.49a.09.09,0,0,0-.09.1A1.41,1.41,0,0,0,18.81,25.91Z"
                  fill={Colors.tintColor}
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('NewGroup')}
              style={{width: 38, height: 38, backgroundColor: "#fff", borderRadius: 19, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}}}
            >
              <Svg height={38} width={38}>
                <Svg.Path
                  d="M25.92,19a1.41,1.41,0,0,1-1.41,1.41h-4.1V24.5a1.41,1.41,0,0,1-2.82,0V20.42H13.51a1.42,1.42,0,1,1,0-2.83h4.08V13.5a1.41,1.41,0,0,1,2.82,0v4.09h4.1A1.42,1.42,0,0,1,25.92,19Z"
                  fill={Colors.tintColor}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        )
      default:
      return (
        <View style={{ width: '100%', padding: 20, paddingBottom: 10}}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('GroupDetail')}
              style={{alignSelf: 'flex-end', paddingTop: 40, padding: 20, width: '100%', height: 130, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: {width: 0, height: 0}, display: 'flex', alignItems: 'flex-start'}}
              >
              <Text style={{fontSize: 30, fontWeight: '400'}}>{item.title}</Text>
              <Text style={{marginBottom: 10}}>{item.members.length} Integrantes</Text>
              <View style={{width: '100%', height: 10, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden'}}>
                <View style={{width: `${item.percentage * 100}%`, height: '100%', backgroundColor: '#654BC1', borderRadius: 5}}></View>
              </View>
            </TouchableOpacity>
            {
              item.actions
              &&
              <TouchableOpacity
                onPress={() => this.setState(prevState => ({ selectedElement: prevState.selectedElement === item._id ? null : item._id }))}
                style={{position: 'relative', width: '90%', height: item._id === this.state.selectedElement ? 'auto' : 30, backgroundColor: '#654BC1', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5, paddingLeft: 10}}
              >
                {
                  item._id === this.state.selectedElement
                  && <View style={{marginBottom: 10}}>
                      {
                        item.actions.elements.map((element, index) =>
                          <TouchableOpacity
                            key={index}
                            style={{display: 'flex', flexDirection: 'row', marginBottom: 5, marginTop: 5}}
                            >
                            <View style={{borderWidth: 2, borderColor: '#fff', width: 20, height: 20, borderRadius: 10, padding: 2}}>
                              <View style={{width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 50}}></View>
                            </View>
                            <Text style={{color: '#fff', marginLeft: 10, fontWeight: '600'}}>{element.title}</Text>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                }
                <Text style={{color: '#fff', fontWeight: '500', alignSelf: 'flex-end', marginRight: 10, marginBottom: 5}}>Reserva insuficiente</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', paddingTop: 30, backgroundColor: '#f7f7f7'}}>
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
