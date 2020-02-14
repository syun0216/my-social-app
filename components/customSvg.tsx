import React from 'react'
import { View } from 'react-native'
import SvgUri from 'expo-svg-uri'
import { px2dpw, px2dpwh } from '../utils/commonUtils'

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
      width={px2dpw(props.width)}
      height={px2dpwh(props.height)}
      source={props.svg}
      fill={props.fill}
      fillAll={true}
    />
  </View>
)

export default customSvg