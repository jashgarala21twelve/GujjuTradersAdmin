import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  PLANS: BASE_AUTH_ROUTE + '/plans/',
};

export const createPlan = async data => {
  return request('post', ROUTES.PLANS, data);
};

export const updatePlan = async ({
  planId,
  data,
}: {
  planId: string;
  data: Record<string, any>;
}) => {
  return request('put', ROUTES.PLANS + `/${planId}`, data);
};

export const getPlans = async params => {
  return request('get', ROUTES.PLANS, null, { params });
};

export const getPlan = async (planId: string) => {
  return request('get', ROUTES.PLANS + `/${planId}`);
};
