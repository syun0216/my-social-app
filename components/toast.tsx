import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import {
  deviceWidthDp,
  px2dph,
  spText,
  isIphoneXAboveModel,
  iPhoneXTop,
  iPhoneTop,
} from '../utils/commonUtils';
import Colors from '../utils/colors';
import Text from './unScalingText';

const styles = StyleSheet.create({
  toastContainer: {
    width: deviceWidthDp,
    height: isIphoneXAboveModel()
      ? px2dph(32) + iPhoneXTop
      : px2dph(32) + iPhoneTop,
    backgroundColor: 'rgba(229, 247, 169, 0.8)',
    fontSize: spText(14),
    fontFamily: 'SourceSansPro-Semibold',
    position: 'absolute',
    top: 0,
    zIndex: 3,
    justifyContent: 'flex-end',
  },
  toastInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dph(40),
  },
  toastText: {
    color: Colors.mainPurple,
    fontSize: spText(14),
    fontFamily: 'SourceSansPro-Semibold',
  },
});

type PropTypes = {
  bgColor?: string;
  textColor?: string;
  autoHide?: boolean;
};

type State = {
  transY: Animated.Value;
  msg: string;
};

export default class Toast extends React.PureComponent<PropTypes, State> {
  public state: State = {
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
                    -(isIphoneXAboveModel()
                      ? px2dph(32) + iPhoneXTop
                      : px2dph(32) + iPhoneTop),
                    0,
                  ],
                }),
              },
            ],
            backgroundColor: this.props.bgColor || 'rgba(229, 247, 169, 0.8)',
          },
        ]}
      >
        <View style={styles.toastInnerContainer}>
          <Text
            style={[
              styles.toastText,
              { color: this.props.textColor || Colors.mainPurple },
            ]}
          >
            {this.state.msg}
          </Text>
        </View>
      </Animated.View>
    );
  }
}
