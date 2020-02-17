import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
//utils
import { deviceWidthDp, px2dpw, isIphoneX, iPhoneXTop, iPhoneTop, px2dpwh } from '../utils/commonUtils'
import Colors from '../utils/colors'
import CustomSvg from './customSvg'
import { useNavigation } from '@react-navigation/native';

interface ICommonHeader {
  leftElement: any,
  avatar?: string
}

const styles = StyleSheet.create({
  headerContainer: {
    width: deviceWidthDp,
    height: isIphoneX() ? iPhoneXTop + px2dpwh(40) : iPhoneTop + px2dpwh(40),
    backgroundColor: Colors.mainPurple,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2
  },
  headerInner: {
    width: deviceWidthDp,
    paddingLeft: px2dpw(19),
    paddingRight: px2dpw(14),
    height: px2dpwh(40),
    marginTop: isIphoneX() ? iPhoneXTop : iPhoneTop,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    width: px2dpw(24),
    height: px2dpw(24),
  },
  headerRightIcon: {
    width: px2dpw(24),
    height: px2dpw(24),
    borderRadius: px2dpw(12),
  }
})

const commonHeader = (props: ICommonHeader) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
    <View style={styles.headerInner}>
      {props.leftElement}
      <CustomSvg fill={Colors.mainGreen} width={23} height={27} svg={require('../assets/logo-cat.svg')}/>
      <TouchableOpacity onPress={() => navigation.navigate('Me')} style={styles.headerRight}>
        <Image style={styles.headerRightIcon} source={{uri: props.avatar || ''}}/>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default commonHeader