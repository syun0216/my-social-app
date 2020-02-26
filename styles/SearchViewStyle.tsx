import { StyleSheet } from 'react-native';
import {
  px2dpw,
  deviceWidthDp,
  deviceHeightDp,
  isIphoneX,
  iPhoneTop,
  iPhoneXTop,
  px2dpwh,
  spText,
} from '../utils/commonUtils';
import Colors from '../utils/colors';
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
    paddingTop: isIphoneX() ? iPhoneXTop : iPhoneTop,
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchDisabled: {
    backgroundColor: Colors.mainGray,
  },
  searchTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(16),
    color: Colors.deepPurple,
    marginBottom: px2dpw(3),
  },
  searchIcon: {
    marginRight: px2dpw(6),
    marginTop: px2dpw(-2),
  },
  searchSubtitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(10),
    color: Colors.mainPurple,
  },
  contentContainer: {
    backgroundColor: Colors.mainWhite,
    flex: 1,
    paddingTop: isIphoneX()
      ? px2dpwh(40) + iPhoneXTop
      : px2dpwh(40) + iPhoneTop,
    width: deviceWidthDp,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dateContainer: {
    marginTop: px2dpw(10),
    alignItems: 'center',
    marginBottom: px2dpw(24),
    position: 'relative',
  },
  commonTitle: {
    fontSize: spText(12),
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
    marginTop: 2,
  },
  commonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: px2dpw(16),
  },
  dateBtnDefault: {
    borderWidth: 0,
    marginRight: px2dpw(8),
    marginBottom: px2dpw(13),
  },
  dateBtnDefaultText: {
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.mainWhite,
    fontSize: spText(14),
  },
  dateBtnActive: {
    marginRight: px2dpw(8),
    marginBottom: px2dpw(13),
    backgroundColor: Colors.mainGreen,
    borderColor: Colors.mainGreen,
  },
  dateBtnActiveText: {
    color: Colors.deepPurple,
    fontSize: spText(14),
  },
  channelView: {
    alignItems: 'center',
  },
  channelBtnDefault: {
    marginRight: px2dpw(12),
    marginBottom: px2dpw(9),
  },
  channelBtnActive: {
    marginRight: px2dpw(12),
    marginBottom: px2dpw(9),
    backgroundColor: Colors.mainGreen,
    borderColor: Colors.mainGreen,
  },
  channelBtnActiveText: {
    color: Colors.deepPurple,
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
    marginBottom: px2dpwh(5),
  },
  searchResInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px2dpwh(8),
  },
  searchResInnerText: {
    fontSize: spText(16),
    fontFamily: 'SourceSansPro-Semibold',
    color: Colors.mainPurple,
  },
  searchDefaultBtn: {
    backgroundColor: Colors.mainGreen,
  },
  searchDefaultBtnText: {
    color: Colors.mainBlack,
    fontSize: spText(10),
    fontFamily: 'SourceSansPro-Semibold',
  },
  searchResSubtitle: {
    fontSize: spText(12),
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.mainBlack,
  },
  listItemContainer: {
    backgroundColor: Colors.mainWhite,
    paddingLeft: px2dpw(16),
    paddingTop: px2dpwh(16),
  },
  listItemWrapper: {
    flexDirection: 'row',
  },
  listItemWrapperLeft: {
    flex: 1,
  },
  listItemWrapperRight: {
    marginLeft: px2dpw(8),
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
    alignItems: 'center',
  },
  listItemTopAvatar: {
    width: px2dpw(20),
    height: px2dpw(20),
    borderRadius: px2dpw(10),
    marginRight: px2dpw(8),
  },
  listItemTopTitle: {
    color: Colors.mainBlack,
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(12),
  },
  listItemTopBtn: {
    borderWidth: 1,
    borderColor: Colors.lightestPurple,
  },
  listItemTopBtnText: {
    fontSize: spText(12),
    color: Colors.mainPurple,
  },
  listItemTitle: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: spText(18),
    color: Colors.deepPurple,
    marginBottom: px2dpwh(8),
  },
  listItemSubtitle: {
    color: Colors.mainPurple,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(12),
  },
  listItemSubTitleSvg: {
    marginRight: px2dpw(5),
  },
  listItemDesc: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.mainBlack,
    marginBottom: px2dpwh(12),
  },
  listItemBottom: {
    flexDirection: 'row',
    marginRight: px2dpw(31),
    alignItems: 'center',
  },
  listItemBottomSvg: {
    marginRight: px2dpw(5),
  },
  listItemBottomText: {
    fontSize: spText(12),
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.deepPurple,
  },
  timePickerContainer: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: Colors.mainWhite,
    width: px2dpw(208),
    height: px2dpwh(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerIcon: {
    marginRight: px2dpw(6),
  },
  timePickerText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.mainPurple,
  },
  timePickerDivider: {
    color: 'rgba(0, 0, 0, 0.09)',
  },
  timePickerTriangle: {
    position: 'absolute',
    top: -12,
    right: px2dpw(80),
    height: 0,
    borderStyle: 'solid',
    borderWidth: 6,
    borderTopColor: 'transparent', //下箭头颜色
    borderLeftColor: 'transparent', //右箭头颜色
    borderBottomColor: Colors.mainWhite, //上箭头颜色
    borderRightColor: 'transparent', //左箭头颜色
  },
  dateTimePicker: {
    backgroundColor: Colors.mainWhite,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: px2dpwh(150),
    zIndex: 4,
  },
});
