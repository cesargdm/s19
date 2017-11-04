import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

function SocialButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{backgroundColor: props.backgroundColor, padding: 10, paddingRight: 25, paddingLeft: 25, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: props.border || 0}}>
      <Text style={{color: props.textColor || '#fff', fontWeight: '600'}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default SocialButton
