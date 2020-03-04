import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
//utils
import { deviceWidthDp, px2dpw, px2dph } from '../utils/commonUtils';
import Colors from '../utils/colors';
import CustomSvg from './customSvg';
import { useNavigation } from '@react-navigation/native';
//components
import { TopWrapper } from '../components/iPhoneXAboveModelWrapper';

const styles = StyleSheet.create({
  headerContainer: {
    width: deviceWidthDp,
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
  rightElement?: React.ReactNode;
  avatar?: string;
}

const commonHeader = (props: PropTypes): React.ReactElement => {
  const navigation = useNavigation();
  return (
    <TopWrapper height={px2dph(40)} style={styles.headerContainer}>
      {style => (
        <View style={[style, styles.headerInner]}>
          {props.leftElement}
          <CustomSvg
            fill={Colors.mainGreen}
            width={23}
            height={27}
            svg={require('../assets/logo-cat.svg')}
          />
          {props.rightElement ? (
            props.rightElement
          ) : (
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
          )}
        </View>
      )}
    </TopWrapper>
  );
};

export default memo(commonHeader);
