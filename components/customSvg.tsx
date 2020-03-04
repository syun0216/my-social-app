import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { px2dpw, px2dph } from '../utils/commonUtils';

type PropTypes = {
  width: number;
  height: number;
  svg: any;
  style?: ViewProps['style'];
  fill: string;
};

const customSvg = (props: PropTypes): React.ReactElement => (
  <View style={props.style}>
    <SvgUri
      width={px2dpw(props.width)}
      height={px2dph(props.height)}
      source={props.svg}
      fill={props.fill}
      fillAll={true}
    />
  </View>
);

export default memo(customSvg);
