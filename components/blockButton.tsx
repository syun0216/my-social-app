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
import { px2dpw, spText } from '../utils/commonUtils';
import Colors from '../utils/colors';
import { BottomWrapper } from '../components/iPhoneXAboveModelWrapper';

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: Colors.mainGreen,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
  <BottomWrapper height={px2dpw(64)} style={[styles.btnContainer, props.style]}>
    {style => (
      <TouchableOpacity
        style={style}
        disabled={props.disabled}
        onPress={props.clickFunc}
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
    )}
  </BottomWrapper>
);

blockButton.defaultProps = {
  disabled: false,
  isLoading: false,
  clickFunc: () => {},
};

export default memo(blockButton);
