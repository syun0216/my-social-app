import React from 'react'
import CustomSvg from './customSvg'

interface ICommonIcon {
  width: number,
  height: number,
  fill: string,
  style?: {}
}

export const HomeIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/home.svg')} {...props}/>
)

export const LikeIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/like-outline.svg')} {...props}/>
)

export const LikeActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/like.svg')} {...props}/>
)

export const CheckIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/check-outline.svg')} {...props}/>
)

export const CheckActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/check.svg')} {...props}/>
)

export const InfoIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/info-outline.svg')} {...props}/>
)

export const InfoActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/info.svg')} {...props}/>
)

export const PeopleIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/people-outline.svg')} {...props}/>
)

export const PeopleActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/people.svg')} {...props}/>
)

export const CommentIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/comment-outline.svg')} {...props}/>
)

export const CommentActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/comment.svg')} {...props}/>
)

export const DateFromIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/date-from.svg')} {...props}/>
)

export const DateToIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/date-to.svg')} {...props}/>
)

export const ReplyIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/reply.svg')} {...props}/>
)

export const CommentSingleIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/comment-single.svg')} {...props}/>
)

export const SendIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/send.svg')} {...props}/>
)

export const CloseIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/cross.svg')} {...props}/>
)

export const SearchIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/search.svg')} {...props}/>
)

export const TimeIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/time.svg')} {...props}/>
)

export const LogoIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/logo-cat.svg')} {...props}/>
)

export const UserIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/user.svg')} {...props}/>
)

export const PasswordIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/password.svg')} {...props}/>
)

export const EmailIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/email.svg')} {...props}/>
)

export const PastIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/past-outline.svg')} {...props}/>
)

export const PastActiveIcon = (props: ICommonIcon): React.ReactElement => (
  <CustomSvg svg={require('../assets/past.svg')} {...props}/>
)