import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppStorage from '../cache/appStorage';
import { inject } from 'mobx-react';
import { deviceWidthDp, deviceHeightDp } from '../utils/commonUtils';
import colors from '../utils/colors';

type PropTypes = any;
type State = any;

@inject('basicMobx')
export default class initView extends React.PureComponent<PropTypes, State> {
  public async componentDidMount() {
    // AppStorage.removeAll();
    let userData = await AppStorage.getUser();
    if (userData) {
      this.props.basicMobx.setUserInfo(JSON.parse(userData));
      this.props.navigation.replace('Search');
    } else {
      this.props.navigation.replace('Login');
    }
  }

  public render() {
    return (
      <View
        style={{
          width: deviceWidthDp,
          height: deviceHeightDp,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color={colors.mainBlack} size="large" />
      </View>
    );
  }
}
