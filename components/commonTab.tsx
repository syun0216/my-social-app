import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../utils/colors'
import { px2dpwh, deviceWidthDp, px2dpw } from '../utils/commonUtils'
import Text from './unScalingText'
import CustomSvg from './customSvg'

interface ITabItem {
  svg: any,
  activeSvg: any,
  svgStyle?: object,
  svgWidth: number,
  svgHeight: number,
  label: string,
}

interface ICommonTab {
  tabData: ITabItem[]
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
    height: px2dpwh(48),
    backgroundColor: Colors.mainWhite,
    width: deviceWidthDp,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    height: px2dpwh(48),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  tabItemDivider: {
    height: px2dpwh(12),
    width: 1,
    backgroundColor: Colors.lighterGray,
    position: 'absolute',
    right: 0,
    top: px2dpwh(18)
  },
  tabItemIcon: {
    marginRight: px2dpw(6.2)
  },
  tabItemText: {
    color: Colors.tabGray,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12)
  }
})

const commonTab = (props: ICommonTab) => {
  return (
    <View style={styles.tabContainer}>
      {
        props.tabData.map((item, idx) => (
          <View style={styles.tabItem} key={idx}>
            <TouchableOpacity style={styles.tabItem}>
              <CustomSvg style={[styles.tabItemIcon, item.svgStyle]} width={item.svgWidth} height={item.svgHeight} fill={Colors.mainGray} svg={item.svg}/>
              <Text style={styles.tabItemText}>{item.label}</Text>
            </TouchableOpacity>
            {
              idx < props.tabData.length - 1 ? (
                <View style={styles.tabItemDivider}></View>
              ) : null
            }
          </View>
        ))
      }
    </View>
  )
}

export default commonTab