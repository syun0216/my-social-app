import { StyleSheet } from 'react-native'
import { px2dpw, deviceWidthDp, deviceHeightDp, isIphoneX, iPhoneTop, iPhoneXTop, px2dpwh } from '../utils/commonUtils'
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
    width: px2dpw(240),
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
    fontSize: px2dpw(16),
    color: Colors.deepPurple,
    marginBottom: px2dpw(3)
  },
  searchIcon: {
    marginRight: px2dpw(6),
    marginTop: px2dpw(-2)
  },
  searchSubtitle: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(10),
    color: Colors.mainPurple
  },
  contentContainer: {
    backgroundColor: Colors.mainWhite,
    flex: 1,
    paddingTop: isIphoneX() ? px2dpwh(40) + iPhoneXTop : px2dpwh(40) + iPhoneTop
  },
  dateContainer: {
    marginTop: px2dpw(10),
    alignItems: 'center',
    marginBottom: px2dpw(24)
  },
  commonTitle: {
    fontSize: px2dpw(12),
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.lighterPurple,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterPurple,    
  },
  divider: {
    height: 2,
    width: px2dpw(26),
    backgroundColor: Colors.lighterPurple,
    marginBottom: px2dpw(16),
    marginTop: 2
  },
  commonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: px2dpw(16)
  },
  dateBtnDefault: {
    borderWidth: 0,
    fontFamily: 'SourceSansPro-Semibold',
    fontWeight: 'bold',
    fontSize: px2dpw(14),
    color: Colors.mainWhite,
    marginRight: px2dpw(8),
    marginBottom: px2dpw(13)
  },
  channelView: {
    alignItems: 'center',
  },
  channelBtnDefault: {
    marginRight: px2dpw(12),
    marginBottom: px2dpw(9),
  },
  searchResContainer: {
    width: '100%',
    // height: px2dpwh(68),
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    paddingLeft: px2dpw(27),
    paddingRight: px2dpw(15),
    paddingTop: px2dpwh(14),
    paddingBottom: px2dpwh(11),
    marginBottom: px2dpwh(5)
  },
  searchResInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dpwh(8)
  },
  searchResInnerText: {
    fontSize: px2dpw(16),
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.mainPurple
  },
  searchDefaultBtn: {
    backgroundColor: Colors.mainGreen,
  },
  searchDefaultBtnText: {
    color: Colors.mainBlack,
    fontSize: px2dpw(10),
    fontFamily: 'SourceSansPro-Semibold',
  },
  searchResSubtitle: {
    fontSize: px2dpw(12),
    // fontFamily: 'SourceSansPro-Regular',
    color: Colors.mainBlack
  },
  listItemContainer: {
    backgroundColor: Colors.mainWhite,
    paddingLeft: px2dpw(16),
    paddingTop: px2dpwh(16)
  },
  listItemWrapper: {
    flexDirection: 'row',
  },
  listItemWrapperLeft: {
    flex: 1,
  },
  listItemWrapperRight: {
    marginLeft: px2dpw(8)
  },
  listItemWrapperRightImg: {
    width: px2dpw(64),
    height: px2dpw(64),
  },
  listItemInner: {
    paddingBottom: px2dpwh(18),
    paddingRight: px2dpw(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterGray,

  },
  listItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dpwh(8),
    alignItems: 'center'
  },
  listItemTopAvatar: {
    width: px2dpw(20),
    height: px2dpw(20),
    borderRadius: px2dpw(10),
    marginRight: px2dpw(8)
  },
  listItemTopTitle: {
    color: Colors.mainBlack,
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dpw(12),
  },
  listItemTopBtn: {
    borderWidth: 1,
    borderColor: Colors.lightestPurple
  },
  listItemTopBtnText: {
    fontSize: px2dpw(12),
    color: Colors.mainPurple
  },
  listItemTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dpw(18),
    color: Colors.deepPurple,
    marginBottom: px2dpwh(8)
  },
  listItemSubtitle: {
    color: Colors.mainPurple,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
  },
  listItemSubTitleSvg: {
    marginRight: px2dpw(5)
  },
  listItemDesc: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(14),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(12)
  },
  listItemBottom: {
    flexDirection: 'row',
    marginRight: px2dpw(31),
    alignItems: 'center'
  },
  listItemBottomSvg: {
    marginRight: px2dpw(5)
  },
  listItemBottomText: {
    fontSize: px2dpw(12),
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.deepPurple
  }
})