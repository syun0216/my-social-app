import { StyleSheet } from "react-native"
import { px2dpw, px2dpwh,isIphoneX, iPhoneTop, iPhoneXTop, deviceWidthDp } from '../utils/commonUtils'
import Colors from '../utils/colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: isIphoneX() ? px2dpwh(40) + iPhoneXTop : px2dpwh(40) + iPhoneTop,
    backgroundColor: Colors.mainWhite
  },
  topIntroContainer: {
    paddingLeft: px2dpw(16),
    paddingRight: px2dpw(16),
    paddingTop: px2dpwh(18),
    paddingBottom: px2dpwh(24)
  },
  channelBtn: {
    borderWidth: 1,
    borderColor: Colors.lightestPurple,
    marginBottom: px2dpwh(15)
  },
  channelBtnText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainPurple
  },
  introTitle: {
    // fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dpw(20),
    color: Colors.deepPurple,
    marginBottom: px2dpwh(24)
  },
  introAvatarContainer: {
    flexDirection: 'row',
  },
  introAvatarImg: {
    borderRadius: px2dpw(18),
    width: px2dpw(36),
    height: px2dpw(36),
    marginRight: px2dpw(12)
  },
  introAvatarTitle: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(14),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(4)
  },
  introAvatarSubtitle: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainGray
  },
  infoContainer: {
    paddingTop: px2dpwh(16),
    paddingLeft: px2dpwh(16),
    paddingBottom: px2dpwh(16),
    backgroundColor: Colors.deepGrayBg,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray
  },
  descContainer: {
    paddingBottom: px2dpwh(19.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterGray
  },
  scrollImgContainer: {
    marginBottom: px2dpwh(12)
  },
  scrollImg: {
    width: px2dpw(180),
    height: px2dpwh(100),
    borderRadius: px2dpw(8),
    marginRight: px2dpw(12)
  },
  descTextItem: {
    paddingRight: px2dpw(16),
    position: 'relative'
  },
  descText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(14),
    color: Colors.mainBlack
  },
  viewAllContainer: {
    height: px2dpwh(57),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: px2dpw(16)
  },
  viewAllInner: {
    position: 'relative',
    height: px2dpwh(57)
  },
  viewAllBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.mainGreen,
  },
  viewAllBtnText: {
    color: Colors.mainBlack,
    fontSize: px2dpw(10),
    // fontFamily: 'SourceSansPro-Semibold'
  },
  dateContainer: {
    paddingTop: px2dpwh(16.5),
    paddingBottom: px2dpwh(16.5),
    borderBottomColor: Colors.lighterGray,
    borderBottomWidth: 1
  },
  commonLeftTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dpwh(16)
  },
  commonLeftDivider: {
    height: px2dpwh(16),
    width: px2dpwh(4),
    backgroundColor: Colors.mainPurple,
    borderRadius: px2dpw(2),
    marginRight: px2dpw(6)
  },
  commonLeftTitle: {
    fontSize: px2dpw(16),
    // fontFamily: 'SourceSansPro-Semibold',
    color: Colors.mainPurple
  },
  dateContent: {
    flexDirection: 'row'
  },
  dateContentItem: {
    position: 'relative',
    flex: 1,
    height: px2dpwh(74),
    paddingLeft: px2dpw(13)
  },
  dateContentItemDivider: {
    borderRightWidth: 1,
    borderColor: Colors.lighterGray
  },
  dateContentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dpwh(6)
  },
  dateContentTimeIcon: {
    marginRight: px2dpw(4)
  },
  dateContentTimeText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(16),
    color: Colors.mainBlack,
  },
  dateContentHourContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  dateContentHourText: {
    fontSize: px2dpw(32),
    // fontFamily: 'SourceSansPro-Regular',
    color: Colors.deepGreen,
    marginRight: px2dpw(6)
  },
  dateContentHourSubText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(10),
    color: Colors.deepGreen,
    lineHeight: px2dpwh(25)
  },
  whereContainer: {
    paddingTop: px2dpwh(16.5)
  },
  whereTitle: {
    // fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dpw(14),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(2)
  },
  whereSubTitle: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(5)
  },
  whereLocation: {
    width: px2dpw(288),
    height: px2dpwh(88),
    borderRadius: px2dpw(8),
  },
  participantContainer: {
    paddingTop: px2dpwh(10),
    paddingLeft: px2dpw(16),
    backgroundColor: Colors.deepGrayBg,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dpwh(52.5)
  },
  participantItemDivider: {
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  participantCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: px2dpw(80)
  },
  participantCountIcon: {
    marginRight: px2dpw(5)
  },
  participantCountText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainBlack
  },
  participantCountAvatar: {
    width: px2dpw(24),
    height: px2dpw(24),
    borderRadius: px2dpw(12),
    marginRight: px2dpw(7)
  },
  participantCountMoreIcon: {

  },
  commentContainer: {
    paddingLeft: px2dpw(16),
    paddingRight: px2dpw(16),
    paddingBottom: px2dpw(16),
    paddingTop: px2dpwh(26),
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  commentAvatar: {
    width: px2dpw(32),
    height: px2dpw(32),
    borderRadius: px2dpw(16),
    marginRight: px2dpw(12)
  },
  commentContentContainer: {
    flex: 1,
  },
  commentTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dpwh(4)
  },
  commentTopName: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(12),
    color: Colors.mainPurple,
    marginRight: px2dpw(12)
  },
  commentTopTime: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(10),
    color: Colors.mainGray
  },
  commentTopIcon: {},
  commentContentText: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: px2dpw(14),
    color: Colors.deepPurple
  },
  bottomBar: {
    flexDirection: 'row',
    height: px2dpwh(56),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  bottomBarLeft: {
    flex: 2,
    backgroundColor: Colors.mainPurple,
    flexDirection: 'row',

  },
  bottomBarLeftBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBarLeftIcon: {

  },
  bottomBarRight: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.mainGreen,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBarRightIcon: {
    marginRight: px2dpw(12)
  },
  bottomBarRightText: {
    // fontFamily: 'SourceSansPro-Semibold',
    fontSize: px2dpw(14),
    color: Colors.deeperGreen
  },
  bottomInputContainer: {
    flexDirection: 'row',
    height: px2dpwh(56),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
  },
  bottomInputLeft: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.mainPurple,
    alignItems: 'center',
    paddingLeft: px2dpw(10)
  },
  bottomInputLeftIcon: {
    marginRight: px2dpw(10)
  },
  bottomInput: {
    width: px2dpw(207),
    height: px2dpw(32),
    backgroundColor: Colors.mainWhite,
    borderRadius: px2dpw(16),
    paddingLeft: px2dpw(19),
    paddingRight: px2dpw(10),
  },
  bottomInputSubmitBtn: {
    backgroundColor: Colors.mainGreen,
    width: px2dpw(64),
    height: px2dpw(56),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomInputSubmitBtnIcon: {
  }
})