export interface loginModel {
  token: string,
  user: loginInfoModel
}

export interface loginInfoModel {
  id: number,
  username: string,
  email: string,
  avatar: string
}

export interface eventListModel {
  hasMore: boolean,
  events: eventItemModel[]
}

export interface eventItemModel {
  id: number,
  name: string,
  creator_id: number,
  channel_id: number,
  begin_time: string,
  end_time: string,
  create_time: string,
  update_time: string,
  location: string,
  location_detail: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  channel,
  images: string[],
  likes_count: number,
  goings_count: number,
  me_likes: boolean,
  me_going: boolean
}

export interface channelListModel {
  channels: channelInfoModel[]
}
export interface channelInfoModel {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string
}

export interface creatorModel extends loginModel {
  salt: string,
  avatar: string,
  createdAt: string,
  updatedAt: string
}

export interface likeModel {
  hasMore: boolean,
  users: likeItemModal[]
}

export interface likeItemModal {
  id: number,
  username: string,
  avatar: string
}

export interface commentsModel {
  comments: commentItemModel[]
}

export interface commentItemModel {
  id: number,
  userId: number,
  eventId: number,
  create_time: string,
  comment: string,
  createdAt: string,
  updateAt: string
}

export interface userInfo extends loginInfoModel {
  likes_count: number,
  past_count: number
  goings_count: number
}