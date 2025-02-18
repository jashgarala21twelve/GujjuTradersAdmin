import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  GET_STOCK_LIST: BASE_AUTH_ROUTE + '/stocks/list',
};
// Users List API Call
export const getStockList = async params => {
  return request('get', ROUTES.GET_STOCK_LIST, null, { params });
};
