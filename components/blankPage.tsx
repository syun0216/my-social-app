import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
//components
import Text from '../components/unScalingText';
import CustomSvg from '../components/customSvg';
//utils
import Colors from '../utils/colors';
import { px2dpw, spText } from '../utils/commonUtils';

const styles = StyleSheet.create({
  blankContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBg,
  },
  blankIcon: {
    marginBottom: px2dpw(11),
  },
  blankText: {
    color: Colors.mainGray,
    fontSize: spText(14),
    fontFamily: 'SourceSansPro-Regular',
  },
});

type PropTypes = {
  text: string;
  style?: {};
};

const blankPage = ({ style, text }: PropTypes): React.ReactElement => (
  <View style={[styles.blankContainer, style]}>
    <CustomSvg
      style={styles.blankIcon}
      width={60}
      height={60}
      fill={Colors.lightestPurple}
      svg={require('../assets/no-activity.svg')}
    />
    <Text style={styles.blankText}>{text}</Text>
  </View>
);

export default memo(blankPage);
