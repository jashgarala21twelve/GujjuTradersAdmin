import { BASE_API_URL } from '@/utils/constants';
import api, { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  GET_USERS: BASE_AUTH_ROUTE + '/user',
  GET_USER_BY_ID: BASE_AUTH_ROUTE + '/user',
  ACTIVE_INACTIVE: BASE_AUTH_ROUTE + '/user/activeInactive',
  GET_ALL_USERS: BASE_AUTH_ROUTE + '/user/all-users',
};
// Users List API Call
export const getUsersApi = async (params) => {
  // return axiosRequestWrapper(() => api.get(ROUTES.GET_USERS, { params }));
  return request('get', ROUTES.GET_USERS, null, { params });
};
export const getUserByIdApi = async (userId) => {
  // return axiosRequestWrapper(() =>
  // api.get(`${ROUTES.GET_USER_BY_ID}/${userId}`)
  return request('get', `${ROUTES.GET_USER_BY_ID}/${userId}`);
};

export const activeInactiveUser = async (data) => {
  return request('post', ROUTES.ACTIVE_INACTIVE, data);
};

export const getAllUsersApi = async (params) => {
  // return axiosRequestWrapper(() => api.get(ROUTES.GET_USERS, { params }));
  return request('get', ROUTES.GET_ALL_USERS, null, { params });
};
