import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
//utils
import {
  deviceWidthDp,
  px2dpw,
  isIphoneX,
  iPhoneXTop,
  iPhoneTop,
  px2dph,
} from '../utils/commonUtils';
import Colors from '../utils/colors';
import CustomSvg from './customSvg';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  headerContainer: {
    width: deviceWidthDp,
    height: isIphoneX() ? iPhoneXTop + px2dph(40) : iPhoneTop + px2dph(40),
    backgroundColor: Colors.mainPurple,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  headerInner: {
    width: deviceWidthDp,
    paddingLeft: px2dpw(19),
    paddingRight: px2dpw(14),
    height: px2dph(40),
    marginTop: isIphoneX() ? iPhoneXTop : iPhoneTop,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    width: px2dpw(24),
    height: px2dpw(24),
  },
  headerRightIcon: {
    width: px2dpw(24),
    height: px2dpw(24),
    borderRadius: px2dpw(12),
  },
});

interface PropTypes {
  leftElement: React.ReactNode;
  avatar?: string;
}

const commonHeader = (props: PropTypes): React.ReactElement => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInner}>
        {props.leftElement}
        <CustomSvg
          fill={Colors.mainGreen}
          width={23}
          height={27}
          svg={require('../assets/logo-cat.svg')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Me')}
          style={styles.headerRight}
        >
          <Image
            style={styles.headerRightIcon}
            source={
              props.avatar
                ? { uri: props.avatar }
                : require('../assets/avatar.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(commonHeader);
