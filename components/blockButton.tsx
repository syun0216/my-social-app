import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
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
    fontFamily: 'SourceSansPro-Semibold'
  }
})

const blockButton = (props: any) => (
  <TouchableOpacity disabled={props.disabled || false} onPress={props.clickFunc} style={[styles.btnContainer, props.style]} activeOpacity={0.8}>
    {!props.isLoading ? (props.children ? props.children : (
      <Text style={styles.btnText}>{props.text}</Text>
    )) : (<ActivityIndicator color={Colors.mainBlack} size="large"/>)}
  </TouchableOpacity>
)

export default blockButton