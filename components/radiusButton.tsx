import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// components
import Text from '../components/unScalingText';
//utils
import { px2dpw, spText } from '../utils/commonUtils';
import Colors from '../utils/colors';

interface IRadiusButton {
  text: string;
  defaultStyle?: object;
  activeStyle?: object;
  textStyle?: object;
  textActiveStyle?: object;
  clickFunc?: any;
}

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

const radiusButton = (props: IRadiusButton): React.ReactElement => (
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

radiusButton.defaultProps = {
  defaultStyle: {},
  activeStyle: {},
  textStyle: {},
  textActiveStyle: {},
  clickFunc: () => {},
};

export default radiusButton;
