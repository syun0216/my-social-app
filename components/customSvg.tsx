import React from 'react'
import { View } from 'react-native'
import SvgUri from 'expo-svg-uri'
import { px2dp } from '../utils/commonUtils'

interface ICustomSvg {
  width: number,
  height: number,
  svg: any,
  style?: object,
  fill: string
}

const customSvg = (props: ICustomSvg) => (
  <View style={props.style}>
    <SvgUri
      width={px2dp(props.width)}
      height={px2dp(props.height)}
      source={props.svg}
      fill={props.fill}
      fillAll={true}
    />
  </View>
)

export default customSvg