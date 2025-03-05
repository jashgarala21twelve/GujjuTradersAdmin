import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  COUPONS: BASE_AUTH_ROUTE + '/coupon',
};

export const createCoupon = async data => {
  return request('post', ROUTES.COUPONS, data);
};

export const updateCoupon = async ({
  couponId,
  data,
}: {
  couponId: string;
  data: Record<string, any>;
}) => {
  return request('put', ROUTES.COUPONS + `/${couponId}`, data);
};

export const resetCoupon = async couponId => {
  return request('put', ROUTES.COUPONS + `/reset/${couponId}`);
};

export const getCoupons = async params => {
  return request('get', ROUTES.COUPONS, null, { params });
};

export const getCoupon = async (couponId: string) => {
  return request('get', ROUTES.COUPONS + `/${couponId}`);
};
