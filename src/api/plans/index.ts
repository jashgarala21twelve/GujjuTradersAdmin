import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  PLANS: BASE_AUTH_ROUTE + '/plans/',
};

export const createPlan = async data => {
  return request('post', ROUTES.PLANS, data);
};
