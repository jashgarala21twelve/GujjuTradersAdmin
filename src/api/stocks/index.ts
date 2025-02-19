import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  GET_STOCK_LIST: BASE_AUTH_ROUTE + '/stocks/list',
  GET_REFETCH_STOCK_LIST: BASE_AUTH_ROUTE + '/stocks/refresh',
  GET_STOCK_BY_SYMBOL: BASE_AUTH_ROUTE + '/stocks/symbol',
};
// Users List API Call
export const getStockList = async params => {
  return request('get', ROUTES.GET_STOCK_LIST, null, { params });
};
export const refetchStockList = async () => {
  return request('get', ROUTES.GET_REFETCH_STOCK_LIST, null, {
    timeout: 120000,
  });
};
export const getStockBySymbol = async data => {
  return request('post', ROUTES.GET_STOCK_BY_SYMBOL, data);
};
