import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

const TRANSACTIONS_ROUTES = {
  TRANSACTIONS: BASE_API_URL + '/transaction',
};

// Get TradeTips
export const getTransaction = async (params) => {
  return request('get', TRANSACTIONS_ROUTES.TRANSACTIONS, null, { params });
};

export const getTransactionById = async (id: string) => {
  return request('get', TRANSACTIONS_ROUTES.TRANSACTIONS + '/' + id);
};
