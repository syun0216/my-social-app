interface IBasic {
  error?: string;
  statusCode?: number;
  message?: string;
}

type Params = {
  [key: string]: any;
} | null;

interface loginData {
  username: string;
  password: string;
}

interface registerData extends loginData {
  email: string;
  avatar: string;
}

interface loginModel extends IBasic {
  token: string;
  user: loginInfoModel;
}

interface loginInfoModel {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

interface eventListModel extends IBasic {
  hasMore?: boolean;
  events: eventItemModel[];
}

interface eventDetailsModel extends IBasic {
  event?: eventItemModel;
}

interface eventItemModel {
  event: any;
  id: number;
  name: string;
  creator_id: number;
  channel_id: number;
  begin_time: string;
  end_time: string;
  create_time: string;
  update_time: string;
  location: string;
  location_detail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  channel;
  images: string[];
  likes_count: number;
  goings_count: number;
  me_likes: boolean;
  me_going: boolean;
  channel: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  creator: {
    id: number;
    username: string;
    password: string;
    email: string;
    salt: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface channelListModel extends IBasic {
  channels: channelInfoModel[];
}
interface channelInfoModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface creatorModel extends loginModel {
  salt: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface likeModel extends IBasic {
  hasMore?: boolean;
  users?: likeItemModal[];
}

interface likeItemModal {
  id: number;
  username: string;
  avatar: string;
}

interface participantsItemModel {
  id: number;
  username: string;
  users: any;
}

interface participantsModel {
  users?: participantsItemModel[];
}

interface commentsModel extends IBasic {
  comments?: commentItemModel[];
}

interface commentItemModel {
  id: number;
  userId: number;
  eventId: number;
  create_time: string;
  comment: string;
  createdAt: string;
  updateAt: string;
}

interface userInfo extends loginInfoModel, IBasic {
  likes_count: number;
  past_count: number;
  goings_count: number;
}
