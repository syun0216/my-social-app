import { StyleSheet } from "react-native";
import { deviceWidthDp, deviceHeightDp, px2dp } from '../utils/commonUtils'
import Colors from '../utils/colors'
export default StyleSheet.create({
  loginBg: {
    width: deviceWidthDp,
    height: deviceHeightDp
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
    marginTop: px2dp(69),
    width: deviceWidthDp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: px2dp(24),
    marginBottom: px2dp(37),
    color: Colors.mainGreen,
    fontFamily: 'SourceSansPro-Bold'
  },
  logoSubtitle: {
    fontSize: px2dp(16),
    marginBottom: px2dp(16),
    color: Colors.mainGreen,
    fontFamily: 'SourceSansPro-Semibold'
  },
  logoImg: {
    width: px2dp(64),
    height: px2dp(64),
    borderRadius: px2dp(32),
    borderWidth: 1,
    borderColor: Colors.mainGreen,
    paddingTop: px2dp(8),
    paddingLeft: px2dp(7)
  },
  fillinContainer: {
    width: deviceWidthDp,
    marginTop: px2dp(118),
    alignItems: 'center'
  },
  fillinItem: {
    paddingLeft: px2dp(13.3),
    paddingRight: px2dp(13.3),
    backgroundColor: 'transparent',
    width: px2dp(240),
    height: px2dp(40),
    color: Colors.deepPurple,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: px2dp(20),
    borderColor: Colors.lightestPurple,
    borderWidth: 2,
    marginBottom: px2dp(16)
  },
  fillinSvg: {
    marginRight: px2dp(6)
  },
  fillin: {
    flex: 1,
    height: px2dp(40),
    fontSize: px2dp(16),
    fontFamily: 'SourceSansPro-Regular'
  },
  fillinActive: {

  }
})