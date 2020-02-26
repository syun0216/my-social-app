import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  deviceWidthDp,
  px2dpwh,
  spText,
  isIphoneX,
  iPhoneXTop,
  iPhoneTop,
} from '../utils/commonUtils';
import Colors from '../utils/colors';
import Text from './unScalingText';

interface IToast {
  bgColor?: string;
  textColor?: string;
  autoHide?: boolean;
}

interface IState {
  transY: Animated.Value;
  msg: string;
}

const styles = StyleSheet.create({
  toastContainer: {
    width: deviceWidthDp,
    height: isIphoneX() ? px2dpwh(32) + iPhoneXTop : px2dpwh(32) + iPhoneTop,
    backgroundColor: 'rgba(229, 247, 169, 0.8)',
    fontSize: spText(14),
    fontFamily: 'SourceSansPro-Semibold',
    position: 'absolute',
    top: 0,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: Colors.mainPurple,
    fontSize: spText(14),
    fontFamily: 'SourceSansPro-Semibold',
  },
});

export default class Toast extends React.PureComponent<IToast, IState> {
  public state: IState = {
    transY: new Animated.Value(0),
    msg: '',
  };

  public show(msg = 'hello') {
    this.setState({
      msg,
    });
    Animated.spring(this.state.transY, {
      toValue: 1,
    }).start();
    if (this.props.autoHide) {
      setTimeout(() => {
        this.hide();
      }, 2500);
    }
  }

  public hide() {
    Animated.spring(this.state.transY, {
      toValue: 0,
      // duration: 800,
      // easing: Easing.cubic
    }).start();
  }

  public render() {
    return (
      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [
              {
                translateY: this.state.transY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    -(isIphoneX()
                      ? px2dpwh(32) + iPhoneXTop
                      : px2dpwh(32) + iPhoneTop),
                    0,
                  ],
                }),
              },
            ],
            backgroundColor: this.props.bgColor || 'rgba(229, 247, 169, 0.8)',
          },
        ]}
      >
        <Text
          style={[
            styles.toastText,
            { color: this.props.textColor || Colors.mainPurple },
          ]}
        >
          {this.state.msg}
        </Text>
      </Animated.View>
    );
  }
}
