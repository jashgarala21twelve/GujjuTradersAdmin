import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  CATEGORY: BASE_AUTH_ROUTE + '/news',
};

export const getNews = async () => {
  return request('get', ROUTES.CATEGORY);
};

export const createNews = async (data: any) => {
  return request('post', ROUTES.CATEGORY, data);
};

export const getNewsById = async (id: string) => {
  return request('get', ROUTES.CATEGORY + '/' + id);
};

export const updateNewsById = async ({ newsId, data }: any) => {
  return request('put', ROUTES.CATEGORY + '/' + newsId, data);
};
