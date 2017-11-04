import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg } from 'expo'

function BackButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width={30}
        height={30}>
        <Svg.Path
          d="M15.94,21.21l5.66,5.66a1.57,1.57,0,0,0,2.68-1.11,1.62,1.62,0,0,0-.46-1.11L18.16,19l5.66-5.66a1.58,1.58,0,0,0,0-2.21,1.56,1.56,0,0,0-1.11-.46,1.54,1.54,0,0,0-1.11.46l-5.66,5.66L13.72,19Z"
          fill="#bbb"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default BackButton
