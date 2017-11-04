import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg } from 'expo'

function CloseButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width={30}
        height={30}>
        <Svg.Path
          d="M29.17,27.24A1.92,1.92,0,0,1,25.9,28.6L19,21.7l-6.9,6.9a1.92,1.92,0,0,1-2.71,0,1.92,1.92,0,0,1,0-2.7L16.3,19,9.39,12.1A1.91,1.91,0,0,1,12.1,9.4L19,16.3l6.9-6.9a1.91,1.91,0,0,1,1.35-.56,2,2,0,0,1,1.36.56,1.92,1.92,0,0,1,0,2.7L21.7,19l6.91,6.9A1.89,1.89,0,0,1,29.17,27.24Z"
          fill="#bbb"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default CloseButton
