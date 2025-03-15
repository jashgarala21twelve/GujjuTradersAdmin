import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  REFERRALS: BASE_AUTH_ROUTE + '/referral',
};

export const getReferrals = async (data: any) => {
  const { startDate, endDate } = data;
  return request(
    'get',
    ROUTES.REFERRALS + `/insights?startDate=${startDate}&endDate=${endDate}`
  );
};
