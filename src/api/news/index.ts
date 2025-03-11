import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

export const BASE_AUTH_ROUTE = BASE_API_URL;
 

const ROUTES = {
    PLANS: BASE_AUTH_ROUTE + '/news',
    CATEGORY: BASE_AUTH_ROUTE + '/news-category',
};
// news-category
export const getNews = async () => {
    return request('get', ROUTES.PLANS);
}

export const CreateCategory = async (data) => {
    return request('post', ROUTES.CATEGORY, data);
}

export const getNewsByCategory = async () => { 
    return request('get', ROUTES.CATEGORY);
}