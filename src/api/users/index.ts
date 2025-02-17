import { BASE_API_URL } from '@/utils/constants';
import api, { axiosRequestWrapper } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  GET_USERS: BASE_AUTH_ROUTE + '/user',
  GET_USER_BY_ID: BASE_AUTH_ROUTE + '/user',
};
// Users List API Call
export const getUsersApi = async params => {
  return axiosRequestWrapper(() => api.get(ROUTES.GET_USERS, { params }));
};
export const getUserByIdApi = async userId => {
  return axiosRequestWrapper(() =>
    api.get(`${ROUTES.GET_USER_BY_ID}/${userId}`)
  );
};
