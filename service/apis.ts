// eslint-disable-next-line no-unused-vars
import request from '../utils/request';

export function userLogin(data: loginData): Promise<loginModel> {
  return request({
    url: '/auth/token',
    method: 'post',
    headers: {
      post: {
        'Content-Type': 'application/json',
      },
    },
    data,
  });
}

export function deleteToken(): Promise<any> {
  return request({
    url: '/auth/token',
    method: 'delete',
  });
}

export function getChannels(): Promise<channelListModel> {
  return request({
    url: '/channels',
    method: 'get',
  });
}

export function getEvents(params: Params): Promise<eventListModel> {
  return request({
    url: `/events`,
    method: 'get',
    params,
  });
}

export function getEventsWithEventId(
  event_id: number
): Promise<eventItemModel> {
  return request({
    url: `/events/${event_id}`,
    method: 'get',
  });
}

export function getEventParticipantWithEventId(
  event_id: number
): Promise<participantsItemModel> {
  return request({
    url: `/events/${event_id}/participants`,
    method: 'get',
  });
}

export function postEventParticipantWithEventId(event_id): Promise<any> {
  return request({
    url: `/events/${event_id}/participants`,
    method: 'post',
  });
}

export function deleteEventParticipantWithEventId(event_id): Promise<any> {
  return request({
    url: `/events/${event_id}/participants`,
    method: 'delete',
  });
}

export function getCommentWithEventId(event_id): Promise<commentsModel> {
  return request({
    url: `/events/${event_id}/comments`,
    method: 'get',
  });
}

export function postCommentWithEventId(event_id, comment): Promise<any> {
  return request({
    url: `/events/${event_id}/comments`,
    method: 'post',
    data: {
      comment,
    },
  });
}

export function getLikesWithEventId(event_id): Promise<likeModel> {
  return request({
    url: `/events/${event_id}/likes`,
    method: 'get',
  });
}

export function postLikeWithEventId(event_id): Promise<any> {
  return request({
    url: `/events/${event_id}/likes`,
    method: 'post',
  });
}

export function deleteLikeWithEventId(event_id): Promise<any> {
  return request({
    url: `/events/${event_id}/likes`,
    method: 'delete',
  });
}

export function getUserInfo(): Promise<userInfo> {
  return request({
    url: `/user`,
    method: 'get',
  });
}

export function getUserEvents(type): Promise<eventListModel> {
  return request({
    url: `/user/events?type=${type}`,
    method: 'get',
  });
}
