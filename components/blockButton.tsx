import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Text from '../components/unScalingText'
//utils
import { px2dpw, iPhoneXBottom, isIphoneX } from '../utils/commonUtils'
import Colors from '../utils/colors'

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.mainGreen,
    width: '100%',
    height: isIphoneX() ? px2dpw(64) + iPhoneXBottom : px2dpw(64),
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: px2dpw(16),
    color: Colors.deepPurple,
    // fontFamily: 'SourceSansPro-Semibold'
  }
})

const blockButton = (props: any) => (
  <TouchableOpacity style={styles.btnContainer} activeOpacity={0.8}>
    {props.children ? props.children : (
      <Text style={styles.btnText}>{props.text}</Text>
    )}
  </TouchableOpacity>
)

export default blockButton