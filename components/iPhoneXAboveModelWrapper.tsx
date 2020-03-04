import React, { memo } from 'react';
import { View, StyleSheet, Platform, ViewProps } from 'react-native';
import {
  isIphoneXAboveModel,
  iPhoneXTop,
  iPhoneTop,
  iPhoneXBottom,
} from '../utils/commonUtils';

const styles = StyleSheet.create({
  wrapperContainer: {
    justifyContent: 'flex-start',
  },
  wrapperInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type PropTypes = {
  style?: ViewProps['style'];
  height: number;
  children(style: {}): React.ReactNode;
};

const TopWrapper = memo((props: PropTypes) => (
  <View
    style={[
      styles.wrapperContainer,
      {
        height: isIphoneXAboveModel()
          ? props.height + iPhoneXTop
          : Platform.OS === 'ios'
          ? props.height + iPhoneTop
          : props.height,
        paddingTop: isIphoneXAboveModel()
          ? iPhoneXTop
          : Platform.OS === 'ios'
          ? iPhoneTop
          : 0,
      },
      props.style,
    ]}
  >
    {props.children([styles.wrapperInner, { height: props.height }])}
  </View>
));

const BottomWrapper = memo((props: PropTypes) => (
  <View
    style={[
      styles.wrapperContainer,
      {
        height: isIphoneXAboveModel()
          ? props.height + iPhoneXBottom - 20
          : props.height,
        paddingBottom: isIphoneXAboveModel() ? iPhoneXBottom - 20 : 0,
      },
      props.style,
    ]}
  >
    {props.children([styles.wrapperInner, { height: props.height }])}
  </View>
));

export { TopWrapper, BottomWrapper };
