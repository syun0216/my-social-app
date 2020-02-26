import request from './request';

export const httpCode = {
  success: 200,
  invalidCode: 403,
  notFound: 404,
};

export const httpStatus = {
  LOADING: 1,
  LOAD_SUCCESS: 2,
  LOAD_FAILED: 3,
  NO_MORE_DATA: 4,
  NO_DATA: 5,
};

export function userLogin(data: loginData) {
  return request.postJSONData('/auth/token', data);
}

export function deleteToken() {
  return request.deleteData('/auth/token');
}

export function getChannels() {
  return request.getData('/channels');
}

export function getEvents(params) {
  let query = Object.keys(params).reduce((acm, val) => {
    if (params[val] !== null) {
      return (acm += `${val}=${params[val]}&`);
    } else {
      return (acm += '');
    }
  }, '?');
  query = query.slice(0, query.length - 1);
  return request.getData(`/events${query}`);
}

export function getEventsWithEventId(event_id) {
  return request.getData(`/events/${event_id}`);
}

export function getEventParticipantWithEventId(event_id) {
  return request.getData(`/events/${event_id}/participants`);
}

export function postEventParticipantWithEventId(event_id) {
  return request.postData(`/events/${event_id}/participants`);
}

export function deleteEventParticipantWithEventId(event_id) {
  return request.deleteData(`/events/${event_id}/participants`);
}

export function getCommentWithEventId(event_id) {
  return request.getData(`/events/${event_id}/comments`);
}

export function postCommentWithEventId(event_id, comment) {
  return request.postData(`/events/${event_id}/comments`, {
    comment,
  });
}

export function getLikesWithEventId(event_id) {
  return request.getData(`/events/${event_id}/likes`);
}

export function postLikeWithEventId(event_id) {
  return request.postData(`/events/${event_id}/likes`);
}

export function deleteLikeWithEventId(event_id) {
  return request.deleteData(`/events/${event_id}/likes`);
}

export function getUserInfo() {
  return request.getData(`/user`);
}

export function getUserEvents(type) {
  return request.getData(`/user/events?type=${type}`);
}
