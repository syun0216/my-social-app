import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// components
import Text from '../components/unScalingText';
//utils
import { px2dpw, spText } from '../utils/commonUtils';
import Colors from '../utils/colors';

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    borderColor: Colors.mainWhite,
    paddingLeft: px2dpw(7.5),
    paddingRight: px2dpw(7.5),
    paddingTop: px2dpw(5),
    paddingBottom: px2dpw(5),
    borderRadius: 20,
    alignSelf: 'flex-start', // 自适应宽度
  },
  btnActiveContainer: {
    backgroundColor: Colors.mainGreen,
    borderColor: Colors.mainGreen,
  },
  btnText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainWhite,
  },
  btnTextActive: {
    color: Colors.deepPurple,
  },
});

type PropTypes = {
  text: string;
  defaultStyle?: {};
  activeStyle?: {};
  textStyle?: {};
  textActiveStyle?: {};
  clickFunc?: () => void;
};

const radiusButton = (props: PropTypes): React.ReactElement => (
  <TouchableOpacity
    onPress={props.clickFunc}
    activeOpacity={0.8}
    style={[styles.btnContainer, props.defaultStyle]}
  >
    <Text style={[styles.btnText, props.textStyle, props.textActiveStyle]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default memo(radiusButton);
