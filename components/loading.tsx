import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Colors from '../utils/colors'

const loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <ActivityIndicator color={Colors.mainBlack} size="large"></ActivityIndicator>
  </View>
)

export default loading
