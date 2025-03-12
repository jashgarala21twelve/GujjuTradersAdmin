import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  CATEGORY: BASE_AUTH_ROUTE + '/news-category',
};

export const CreateCategory = async (data: any) => {
  return request('post', ROUTES.CATEGORY, data);
};

export const getNewsByCategory = async () => {
  return request('get', ROUTES.CATEGORY);
};

export const getNewsCategoryById = async (id: string) => {
  return request('get', ROUTES.CATEGORY + '/' + id);
};

export const updateNewsCategoryById = async ({ categoryId, data }: any) => {
  return request('put', ROUTES.CATEGORY + '/' + categoryId, data);
};
