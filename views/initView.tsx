import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import {userStorage} from '../cache/appCache'
import { deviceWidthDp, deviceHeightDp } from '../utils/commonUtils'
import colors from '../utils/colors'

export default class initView extends React.PureComponent<any> {
  public componentDidMount() {
    userStorage.getData((error, data) => {
      if (error === null && data != null) {
        console.log('data', data)
        // if (store.getState().auth.username === null) {
        //   store.dispatch({type: 'LOGIN', ...data})
        // }
        this.props.navigation.replace("Search")
      }else {
        console.log(this.props)
        this.props.navigation.replace("Login")
      }
    })
  }

  public render() {
    return (
      <View style={{width: deviceWidthDp, height: deviceHeightDp,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.mainBlack} size="large"/>
      </View>
    )
  }
}