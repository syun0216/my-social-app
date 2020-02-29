import { StyleSheet } from 'react-native';
import {
  px2dpw,
  px2dph,
  isIphoneXAboveModel,
  iPhoneTop,
  iPhoneXTop,
  spText,
} from '../utils/commonUtils';
import Colors from '../utils/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: isIphoneXAboveModel()
      ? px2dph(40) + iPhoneXTop
      : px2dph(40) + iPhoneTop,
    backgroundColor: Colors.mainWhite,
  },
  topIntroContainer: {
    paddingLeft: px2dpw(16),
    paddingRight: px2dpw(16),
    paddingTop: px2dph(18),
    paddingBottom: px2dph(24),
  },
  channelBtn: {
    borderWidth: 1,
    borderColor: Colors.lightestPurple,
    marginBottom: px2dph(15),
  },
  channelBtnText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainPurple,
  },
  introTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(20),
    color: Colors.deepPurple,
    marginBottom: px2dph(24),
  },
  introAvatarContainer: {
    flexDirection: 'row',
  },
  introAvatarImg: {
    borderRadius: px2dpw(18),
    width: px2dpw(36),
    height: px2dpw(36),
    marginRight: px2dpw(12),
  },
  introAvatarTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.mainBlack,
    marginBottom: px2dph(4),
  },
  introAvatarSubtitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainGray,
  },
  infoContainer: {
    paddingTop: px2dph(16),
    paddingLeft: px2dph(16),
    paddingBottom: px2dph(16),
    backgroundColor: Colors.deepGrayBg,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  descContainer: {
    paddingBottom: px2dph(19.5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterGray,
  },
  scrollImgContainer: {
    marginBottom: px2dph(12),
  },
  scrollImg: {
    width: px2dpw(180),
    height: px2dph(100),
    borderRadius: px2dpw(8),
    marginRight: px2dpw(12),
  },
  descTextItem: {
    paddingRight: px2dpw(16),
    position: 'relative',
  },
  descText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.mainBlack,
  },
  viewAllContainer: {
    height: px2dph(57),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: px2dpw(16),
  },
  viewAllInner: {
    position: 'relative',
    height: px2dph(57),
  },
  viewAllBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.mainGreen,
  },
  viewAllBtnText: {
    color: Colors.mainBlack,
    fontSize: spText(10),
    fontFamily: 'SourceSansPro-Semibold',
  },
  dateContainer: {
    paddingTop: px2dph(16.5),
    paddingBottom: px2dph(16.5),
    borderBottomColor: Colors.lighterGray,
    borderBottomWidth: 1,
  },
  commonLeftTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dph(16),
  },
  commonLeftDivider: {
    height: px2dph(16),
    width: px2dph(4),
    backgroundColor: Colors.mainPurple,
    borderRadius: px2dpw(2),
    marginRight: px2dpw(6),
  },
  commonLeftTitle: {
    fontSize: spText(16),
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.mainPurple,
  },
  dateContent: {
    flexDirection: 'row',
  },
  dateContentItem: {
    position: 'relative',
    flex: 1,
    height: px2dph(74),
    paddingLeft: px2dpw(13),
  },
  dateContentItemDivider: {
    borderRightWidth: 1,
    borderColor: Colors.lighterGray,
  },
  dateContentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dph(6),
  },
  dateContentTimeIcon: {
    marginRight: px2dpw(4),
  },
  dateContentTimeText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(16),
    color: Colors.mainBlack,
  },
  dateContentHourContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateContentHourText: {
    fontSize: spText(32),
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.deepGreen,
    marginRight: px2dpw(6),
  },
  dateContentHourSubText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(10),
    color: Colors.deepGreen,
    lineHeight: px2dph(25),
  },
  whereContainer: {
    paddingTop: px2dph(16.5),
  },
  whereTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(14),
    color: Colors.mainBlack,
    marginBottom: px2dph(2),
  },
  whereSubTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainBlack,
    marginBottom: px2dph(5),
  },
  whereLocation: {
    width: px2dpw(288),
    height: px2dph(88),
    borderRadius: px2dpw(8),
  },
  participantContainer: {
    paddingTop: px2dph(10),
    paddingLeft: px2dpw(16),
    backgroundColor: Colors.deepGrayBg,
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dph(52.5),
  },
  participantItemDivider: {
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  participantCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: px2dpw(80),
  },
  participantCountIcon: {
    marginRight: px2dpw(5),
  },
  participantCountText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainBlack,
  },
  participantCountAvatar: {
    width: px2dpw(24),
    height: px2dpw(24),
    borderRadius: px2dpw(12),
    marginRight: px2dpw(7),
    marginBottom: px2dpw(7),
  },
  participantCountMoreIcon: {},
  commentContainer: {
    paddingLeft: px2dpw(16),
    paddingRight: px2dpw(16),
    paddingBottom: px2dpw(16),
    paddingTop: px2dph(26),
    borderBottomWidth: 1,
    borderColor: Colors.lighterGray,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: px2dph(16),
  },
  commentAvatar: {
    width: px2dpw(32),
    height: px2dpw(32),
    borderRadius: px2dpw(16),
    marginRight: px2dpw(12),
  },
  commentContentContainer: {
    flex: 1,
  },
  commentTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dph(4),
  },
  commentTopName: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
    color: Colors.mainPurple,
    marginRight: px2dpw(12),
  },
  commentTopTime: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(10),
    color: Colors.mainGray,
  },
  commentTopIcon: {},
  commentContentText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.deepPurple,
  },
  bottomBar: {
    flexDirection: 'row',
    // height: px2dph(56),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarLeft: {
    flex: 1,
    backgroundColor: Colors.mainPurple,
    flexDirection: 'row',
  },
  bottomBarLeftBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarLeftIcon: {},
  bottomBarRight: {
    flexDirection: 'row',
    backgroundColor: Colors.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
    width: px2dpw(140),
  },
  bottomBarRightIcon: {
    marginRight: px2dpw(12),
  },
  bottomBarRightText: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(14),
    color: Colors.deeperGreen,
  },
  bottomInputContainer: {
    flexDirection: 'row',
    height: px2dph(56),
    position: 'absolute',
    bottom: -px2dph(56),
    left: 0,
    right: 0,
    zIndex: 3,
  },
  bottomInputLeft: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.mainPurple,
    alignItems: 'center',
    paddingLeft: px2dpw(10),
  },
  bottomInputLeftIcon: {
    marginRight: px2dpw(10),
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
    alignItems: 'center',
  },
  bottomInputSubmitBtnIcon: {},
});
