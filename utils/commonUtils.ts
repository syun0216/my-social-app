import { Dimensions, Platform } from 'react-native';

export const deviceWidthDp: number = Dimensions.get('window').width;
export const deviceHeightDp: number = Dimensions.get('window').height;
export const iPhoneXBottom: number = 34;
export const iPhoneXTop: number = 44;
export const iPhoneTop: number = 20;

// x xs 11pro
const iPhoneX_WIDTH: number = 375;
const iPhoneX_HEIGHT: number = 812;

// xr xsMax 11 proMax
const XR_WIDTH: number = 414;
const XR_HEIGHT: number = 896;

const uiWidthPx: number = 320;
const uiHeightPx: number = 572;
// 像素密度
const defaultDensity = 2;
const w2: number = uiWidthPx / defaultDensity;
//px转换成dp
const h2: number = uiHeightPx / defaultDensity;

// x xs 11pro
export function isIphoneX(): boolean {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === iPhoneX_HEIGHT && deviceWidthDp === iPhoneX_WIDTH) ||
      (deviceHeightDp === iPhoneX_WIDTH && deviceWidthDp === iPhoneX_HEIGHT))
  );
}

// xr xsMax 11 proMax
export function isIphoneXr(): boolean {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === XR_HEIGHT && deviceWidthDp === XR_WIDTH) ||
      (deviceHeightDp === XR_WIDTH && deviceWidthDp === XR_HEIGHT))
  );
}

// 是否为iPhone X以上机型
export function isIphoneXAboveModel(): boolean {
  return isIphoneX() || isIphoneXr();
}

export function px2dpw(uiElementPx: number) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export function px2dph(uiElementPx: number) {
  return (uiElementPx * deviceHeightDp) / uiHeightPx;
}

export function spText(size: number) {
  let scaleWidth = deviceWidthDp / w2;
  let scaleHeight = deviceHeightDp / h2;
  let scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round(size * scale + 0.5);
  return (size / defaultDensity) * 1;
}

export function isJsonString(str: string) {
  try {
    if (typeof JSON.parse(str) == 'object') {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}
