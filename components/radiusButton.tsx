import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
// components
import Text from '../components/unScalingText'
//utils
import { px2dpw } from '../utils/commonUtils'
import Colors from '../utils/colors'

interface IRadiusButton {
  text: string,
  defaultStyle?: object,
  activeStyle?: object,
  textStyle?: object,
  textActiveStyle?: object
}

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    borderColor: Colors.mainWhite,
    paddingLeft: px2dpw(7.5),
    paddingRight: px2dpw(7.5),
    paddingTop: px2dpw(5),
    paddingBottom: px2dpw(5),
    borderRadius: 20,
    alignSelf: 'flex-start' // 自适应宽度
  },
  btnActiveContainer: {
    backgroundColor: Colors.mainGreen,
    borderColor: Colors.mainGreen
  },
  btnText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainWhite
  },
  btnTextActive: {
    color: Colors.deepPurple,
  }
})

const radiusButton = (props: IRadiusButton) => (
  <TouchableOpacity activeOpacity={0.8} style={[styles.btnContainer, props.defaultStyle]}>
    <Text style={[styles.btnText, props.textStyle]}>{props.text}</Text>
  </TouchableOpacity>
)

export default radiusButton