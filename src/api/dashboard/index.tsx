import { BASE_API_URL } from '@/utils/constants';
import { request } from '../api';

const DASHBOARD_ROUTES = {
  DASHBOARD: BASE_API_URL + '/dashboard',
};

// Get TradeTips
// export const getDashboard = () => {
//   return request('get', DASHBOARD_ROUTES.DASHBOARD);
// };

export const getDashboard = async (data) => {
  console.log(data, 'dataaaaa');

  return request('get', DASHBOARD_ROUTES.DASHBOARD, null, {
    params: data || {},
  });
};
