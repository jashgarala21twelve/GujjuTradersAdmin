import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';


export const BASE_AUTH_ROUTE = BASE_API_URL;

const ROUTES = {
  PLANS: BASE_AUTH_ROUTE + '/sociallinks',
};


export const getSocialLinks = async () => {
    return request('get', ROUTES.PLANS);
}


export const createSocialLinks = async data => {
    return await request('post', ROUTES.PLANS, data);
 }
 
