import { StyleSheet } from 'react-native'
import { px2dp, deviceWidthDp, deviceHeightDp, isIphoneX, iPhoneTop, iPhoneXTop } from '../utils/commonUtils'
import Colors from '../utils/colors'
export default StyleSheet.create({
  mainContainer: {
    width: deviceWidthDp,
    height: deviceHeightDp,
    backgroundColor: Colors.mainWhite,
    position: 'relative',
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: px2dp(240),
    backgroundColor: Colors.deepPurple,
    paddingTop: isIphoneX() ? iPhoneXTop : iPhoneTop
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dp(16),
    color: Colors.deepPurple,
    marginBottom: px2dp(3)
  },
  searchIcon: {
    marginRight: px2dp(6),
    marginTop: px2dp(-2)
  },
  searchSubtitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dp(10),
    color: Colors.mainPurple
  },
  contentContainer: {
    backgroundColor: Colors.mainWhite,
    paddingTop: isIphoneX() ? iPhoneXTop : iPhoneTop,
    flex: 1
  },
  dateContainer: {
    marginTop: px2dp(10),
    alignItems: 'center',
    marginBottom: px2dp(24)
  },
  commonTitle: {
    fontSize: px2dp(12),
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.lighterPurple,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterPurple,    
  },
  divider: {
    height: 2,
    width: px2dp(26),
    backgroundColor: Colors.lighterPurple,
    marginBottom: px2dp(16),
    marginTop: 2
  },
  commonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: px2dp(16)
  },
  dateBtnDefault: {
    borderWidth: 0,
    fontFamily: 'SourceSansPro-Semibold',
    fontWeight: 'bold',
    fontSize: px2dp(14),
    color: Colors.mainWhite,
    marginRight: px2dp(8),
    marginBottom: px2dp(13)
  },
  channelView: {
    alignItems: 'center',
  },
  channelBtnDefault: {
    marginRight: px2dp(12),
    marginBottom: px2dp(9),
  }
})