import { StyleSheet } from 'react-native';
import {
  deviceWidthDp,
  deviceHeightDp,
  px2dpw,
  px2dph,
  spText,
  isIphoneXAboveModel,
  iPhoneXTop,
} from '../utils/commonUtils';
import Colors from '../utils/colors';
export default StyleSheet.create({
  loginBg: {
    width: deviceWidthDp,
    height: deviceHeightDp,
    flex: 1,
  },
  linearGradientBg: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    marginTop: isIphoneXAboveModel ? px2dpw(69) + iPhoneXTop : px2dpw(69),
    width: deviceWidthDp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: spText(24),
    marginBottom: px2dpw(37),
    color: Colors.mainGreen,
    fontFamily: 'SourceSansPro-Bold',
  },
  logoSubtitle: {
    fontSize: spText(16),
    marginBottom: px2dpw(16),
    color: Colors.mainGreen,
    fontFamily: 'SourceSansPro-Semibold',
  },
  logoImg: {
    width: px2dpw(64),
    height: px2dpw(64),
    borderRadius: px2dpw(32),
    borderWidth: 1,
    borderColor: Colors.mainGreen,
    paddingTop: px2dpw(8),
    paddingLeft: px2dpw(7),
  },
  fillinContainer: {
    width: deviceWidthDp,
    marginTop: px2dph(100),
    alignItems: 'center',
  },
  fillinItem: {
    paddingHorizontal: px2dpw(13.3),
    backgroundColor: 'transparent',
    width: px2dpw(240),
    height: px2dpw(40),
    color: Colors.deepPurple,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: px2dpw(20),
    borderColor: Colors.lightestPurple,
    borderWidth: 2,
    marginBottom: px2dpw(16),
  },
  fillinSvg: {
    marginRight: px2dpw(6),
  },
  fillin: {
    flex: 1,
    height: px2dpw(40),
    fontSize: spText(16),
    fontFamily: 'SourceSansPro-Regular',
  },
  fillinActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  submitBtn: {
    position: 'relative',
  },
});
