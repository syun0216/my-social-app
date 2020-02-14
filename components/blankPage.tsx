import React from 'react'
import { View, StyleSheet } from 'react-native'
//components
import Text from '../components/unScalingText'
import CustomSvg from '../components/customSvg'
//utils
import Colors from '../utils/colors'
import { px2dpw } from '../utils/commonUtils'

interface IBlankPage {
  text: string
}

const styles = StyleSheet.create({
  blankContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blankIcon: {
    marginBottom: px2dpw(11),
  },
  blankText: {
    color: Colors.mainGray,
    fontSize: px2dpw(14),
    // fontFamily: 'SourceSansPro-Regular'
  }
})

const blankPage = (props: IBlankPage) => (
  <View style={styles.blankContainer}>
    <CustomSvg style={styles.blankIcon} width={60} height={60} fill={Colors.lightestPurple} svg={require('../assets/no-activity.svg')} />
    <Text style={styles.blankText}>{props.text}</Text>
  </View>
)

export default blankPage 