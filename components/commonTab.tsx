import React, { useState, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import Colors from '../utils/colors';
import { px2dph, deviceWidthDp, px2dpw, spText } from '../utils/commonUtils';
import Text from './unScalingText';
import CustomSvg from './customSvg';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
    height: px2dph(48),
    backgroundColor: Colors.mainWhite,
    width: deviceWidthDp,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    height: px2dph(48),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabItemDivider: {
    height: px2dph(12),
    width: 1,
    backgroundColor: Colors.lighterGray,
    position: 'absolute',
    right: 0,
    top: px2dph(18),
  },
  tabItemIcon: {
    marginRight: px2dpw(6.2),
  },
  tabItemText: {
    color: Colors.tabGray,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
  },
  tabItemTextActive: {
    color: Colors.deepGreen,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
  },
});

type PropTypes = {
  tabData: ITabItem[];
  callback?: (idx: number) => void;
};

type ITabItem = {
  svg: NodeRequire;
  activeSvg: NodeRequire;
  svgStyle?: ViewProps['style'];
  svgWidth: number;
  svgHeight: number;
  label: string;
};

const commonTab = (props: PropTypes): React.ReactElement => {
  const [tabIdx, setTabIdx] = useState(0);

  const setTabInner = idx => {
    setTabIdx(idx);
    props.callback && props.callback(idx);
  };

  return (
    <View style={styles.tabContainer}>
      {props.tabData.map((item: ITabItem, idx: number) => (
        <View style={styles.tabItem} key={idx}>
          <TouchableOpacity
            onPress={() => setTabInner(idx)}
            style={styles.tabItem}
          >
            <CustomSvg
              style={[styles.tabItemIcon, item.svgStyle]}
              width={item.svgWidth}
              height={item.svgHeight}
              fill={idx === tabIdx ? Colors.deepGreen : Colors.mainGray}
              svg={idx === tabIdx ? item.activeSvg : item.svg}
            />
            <Text
              style={
                idx === tabIdx ? styles.tabItemTextActive : styles.tabItemText
              }
            >
              {item.label}
            </Text>
          </TouchableOpacity>
          {idx < props.tabData.length - 1 ? (
            <View style={styles.tabItemDivider}></View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default memo(commonTab);
