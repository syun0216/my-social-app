import {Dimensions, Platform} from 'react-native';

export const deviceWidthDp = Dimensions.get('window').width
export const deviceHeightDp = Dimensions.get('window').height
export const iPhoneXBottom = 34
export const iPhoneXTop = 44
export const iPhoneTop = 20

// iPhoneX
const iPhoneX_WIDTH = 375;
const iPhoneX_HEIGHT = 812;

// iPhone XR
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

const  uiWidthPx = 320

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === iPhoneX_HEIGHT && deviceWidthDp === iPhoneX_WIDTH) ||
      (deviceHeightDp === iPhoneX_WIDTH && deviceWidthDp === iPhoneX_HEIGHT))
  )
}

export function isIphoneXr() {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === XR_HEIGHT && deviceWidthDp === XR_WIDTH) ||
      (deviceHeightDp === XR_WIDTH && deviceWidthDp === XR_HEIGHT))
  )
}

export function px2dp(uiElementPx: number) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}
