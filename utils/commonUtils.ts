import { Dimensions, Platform } from 'react-native';

export const deviceWidthDp: number = Dimensions.get('window').width;
export const deviceHeightDp: number = Dimensions.get('window').height;
export const iPhoneXBottom: number = 34;
export const iPhoneXTop: number = 44;
export const iPhoneTop: number = 20;

// iPhoneX
const iPhoneX_WIDTH: number = 375;
const iPhoneX_HEIGHT: number = 812;

// iPhone XR
const XR_WIDTH: number = 414;
const XR_HEIGHT: number = 896;

const uiWidthPx: number = 320;
const uiHeightPx: number = 572;
// 像素密度
const defaultDensity = 2;
const w2 = uiWidthPx / defaultDensity;
//px转换成dp
const h2 = uiHeightPx / defaultDensity;

export function isIphoneX(): boolean {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === iPhoneX_HEIGHT && deviceWidthDp === iPhoneX_WIDTH) ||
      (deviceHeightDp === iPhoneX_WIDTH && deviceWidthDp === iPhoneX_HEIGHT))
  );
}

export function isIphoneXr(): boolean {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeightDp === XR_HEIGHT && deviceWidthDp === XR_WIDTH) ||
      (deviceHeightDp === XR_WIDTH && deviceWidthDp === XR_HEIGHT))
  );
}

export function px2dpw(uiElementPx: number) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export function px2dpwh(uiElementPx: number) {
  return (uiElementPx * deviceHeightDp) / uiHeightPx;
}

export function spText(size: number): number {
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
  } catch (e) {}
  return false;
}
