import {Dimensions} from 'react-native';

export const deviceWidthDp = Dimensions.get('window').width
export const deviceHeightDp = Dimensions.get('window').height
const  uiWidthPx = 320

export function px2dp(uiElementPx: number) {
  return uiElementPx * deviceWidthDp / uiWidthPx
}