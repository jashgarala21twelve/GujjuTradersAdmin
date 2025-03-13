import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  CATEGORY: BASE_AUTH_ROUTE + '/media-asset',
};

// export const getFaq = async () => {
//   return request('get', ROUTES.CATEGORY);
// };

export const createMedia = async (data: any) => {
  return request('post', ROUTES.CATEGORY, data);
};

export const getMediaAssetsById = async (id: string) => {
  return request('get', ROUTES.CATEGORY + '/' + id);
};

// export const updateFaqById = async ({ faqId, data }: any) => {
//   return request('put', ROUTES.CATEGORY + '/' + faqId, data);
// };

export const deleteMediaAssets = async (data: any) => {
  return request('delete', ROUTES.CATEGORY, data);
};
