import { BASE_API_URL } from '@/utils/constants';
import api, { request } from '../api';

const TRADETIPS_ROUTES = {
  CREATE: BASE_API_URL + '/tradetip',
  GET_TRADE_TIPS_LIST: BASE_API_URL + '/tradetip',
};

// Create TradeTip
export const createTradeTip = async (data: Record<string, any>) => {
  return request('post', TRADETIPS_ROUTES.CREATE, data);
};

// Get TradeTips
export const getTradeTips = async params => {
  return request('get', TRADETIPS_ROUTES.GET_TRADE_TIPS_LIST, null, { params });
};
