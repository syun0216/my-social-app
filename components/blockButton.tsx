import React, { memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  // eslint-disable-next-line no-unused-vars
  ViewProps,
} from 'react-native';
import Text from '../components/unScalingText';
//utils
import { px2dpw, iPhoneXBottom, isIphoneX, spText } from '../utils/commonUtils';
import Colors from '../utils/colors';

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.mainGreen,
    width: '100%',
    height: isIphoneX() ? px2dpw(64) + iPhoneXBottom : px2dpw(64),
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: spText(16),
    color: Colors.deepPurple,
    fontFamily: 'SourceSansPro-Semibold',
  },
});

type PropTypes = {
  disabled?: boolean;
  style?: ViewProps['style'];
  isLoading?: boolean;
  text?: string;
  clickFunc(): void;
  children?: React.ReactNode;
};

const blockButton = (props: PropTypes): React.ReactElement => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={props.clickFunc}
    style={[styles.btnContainer, props.style]}
    activeOpacity={0.8}
  >
    {!props.isLoading ? (
      props.children ? (
        props.children
      ) : (
        <Text style={styles.btnText}>{props.text}</Text>
      )
    ) : (
      <ActivityIndicator color={Colors.mainBlack} size="large" />
    )}
  </TouchableOpacity>
);

blockButton.defaultProps = {
  disabled: false,
  isLoading: false,
  clickFunc: () => {},
};

export default memo(blockButton);
