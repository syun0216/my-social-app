import { StyleSheet } from "react-native"
import { px2dpw, px2dpwh,isIphoneX, iPhoneTop, iPhoneXTop } from '../utils/commonUtils'
import Colors from '../utils/colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: isIphoneX() ? px2dpwh(40) + iPhoneXTop : px2dpwh(40) + iPhoneTop,
    backgroundColor: Colors.mainWhite
  },
  introContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: px2dpwh(36),
    paddingBottom: px2dpwh(25)
  },
  introAvatar: {
    width: px2dpw(72),
    height: px2dpw(72),
    borderWidth: 2,
    borderColor: Colors.lightestPurple,
    marginBottom: px2dpwh(24),
    borderRadius: px2dpw(36),
    paddingBottom: px2dpwh(25),
  },
  introName: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(24),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(8)
  },
  introEmailIcon: {
    marginRight: px2dpw(6),
    marginTop: px2dpw(2)
  },
  introEmail: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(14),
    color: Colors.mainPurple
  }
})