import request from './request';

export const httpCode: {
  success: number;
  invalidCode: number;
  notFound: number;
} = {
  success: 200,
  invalidCode: 403,
  notFound: 404,
};

export const httpStatus: {
  LOADING: number;
  LOAD_SUCCESS: number;
  LOAD_FAILED: number;
  NO_MORE_DATA: number;
  NO_DATA: number;
} = {
  LOADING: 1,
  LOAD_SUCCESS: 2,
  LOAD_FAILED: 3,
  NO_MORE_DATA: 4,
  NO_DATA: 5,
};

export function userLogin(data: loginData): Promise<loginModel> {
  return request.postJSONData('/auth/token', data);
}

export function deleteToken(): Promise<any> {
  return request.deleteData('/auth/token');
}

export function getChannels(): Promise<channelListModel> {
  return request.getData('/channels');
}

export function getEvents(params: Params): Promise<eventListModel> {
  let query: string = Object.keys(params).reduce((acm, val) => {
    if (params[val] !== null) {
      return (acm += `${val}=${params[val]}&`);
    } else {
      return (acm += '');
    }
  }, '?');
  query = query.slice(0, query.length - 1);
  return request.getData(`/events${query}`);
}

export function getEventsWithEventId(
  event_id: number
): Promise<eventItemModel> {
  return request.getData(`/events/${event_id}`);
}

export function getEventParticipantWithEventId(
  event_id: number
): Promise<participantsItemModel> {
  return request.getData(`/events/${event_id}/participants`);
}

export function postEventParticipantWithEventId(event_id): Promise<any> {
  return request.postData(`/events/${event_id}/participants`);
}

export function deleteEventParticipantWithEventId(event_id): Promise<any> {
  return request.deleteData(`/events/${event_id}/participants`);
}

export function getCommentWithEventId(event_id): Promise<commentsModel> {
  return request.getData(`/events/${event_id}/comments`);
}

export function postCommentWithEventId(event_id, comment): Promise<any> {
  return request.postData(`/events/${event_id}/comments`, {
    comment,
  });
}

export function getLikesWithEventId(event_id): Promise<likeModel> {
  return request.getData(`/events/${event_id}/likes`);
}

export function postLikeWithEventId(event_id): Promise<any> {
  return request.postData(`/events/${event_id}/likes`);
}

export function deleteLikeWithEventId(event_id): Promise<any> {
  return request.deleteData(`/events/${event_id}/likes`);
}

export function getUserInfo(): Promise<userInfo> {
  return request.getData(`/user`);
}

export function getUserEvents(type): Promise<eventListModel> {
  return request.getData(`/user/events?type=${type}`);
}
