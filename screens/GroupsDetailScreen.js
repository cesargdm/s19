import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Svg } from 'expo'

import Colors from '../constants/Colors'
import { BackButton } from '../components'

class GroupsDetailScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <View style={{paddingTop: 50, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
        <View style={{paddingTop: 0, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <BackButton
            onPress={() => this.props.navigation.goBack()}
          />
          <TouchableOpacity style={{padding: 14, paddingTop: 7, paddingBottom: 7, backgroundColor: Colors.tintColor, borderRadius: 14}}>
            <Text style={{color: '#fff', fontWeight: '800'}}>¿Todo OK?</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, padding: 20}}>
          <Text style={{fontSize: 38, marginBottom: 10}}>Familia</Text>
          <Text>4 Integrantes</Text>
          <ScrollView
            style={{marginBottom: 20}}
            horizontal
          >
            {
              [0,0,0,0,0].map((member, index) =>
                <View
                  key={index}
                  style={{width: 34, height: 34, backgroundColor: '#999', marginRight: 10, borderRadius: 17}}
                >
                </View>
              )
            }
            <View
              style={{width: 34, height: 34, backgroundColor: '#fff', marginRight: 10, borderRadius: 17, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.tintColor}}
            >
              <Svg height={38} width={38}>
                <Svg.Path
                  d="M25.92,19a1.41,1.41,0,0,1-1.41,1.41h-4.1V24.5a1.41,1.41,0,0,1-2.82,0V20.42H13.51a1.42,1.42,0,1,1,0-2.83h4.08V13.5a1.41,1.41,0,0,1,2.82,0v4.09h4.1A1.42,1.42,0,0,1,25.92,19Z"
                  fill={Colors.tintColor}
                />
              </Svg>
            </View>
          </ScrollView>
          <Text>Kit de supervivencia</Text>
          <View style={{width: '100%', height: 10, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden'}}>
            <View style={{width: `${70 * 100}%`, height: '100%', backgroundColor: '#654BC1', borderRadius: 5}}></View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default GroupsDetailScreen
