export const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
export const HOMEPAGE = import.meta.env.VITE_APP_HOMEPAGE;
export const BASE_PATH = import.meta.env.VITE_APP_BASE_PATH;

export const SESSION_STORAGE_AUTH_TOKEN_KEY = 'authToken';

export const Model = {
  Customer: 'Customer',
  Memo: 'Memo',
};
export const USER_TYPE = {
  ADMIN: 0,
  USER: 1,
} as const;
export const ACCOUNT_STATUS = {
  DELETED: 0,
  ACTIVE: 1,
  DEACTIVATED: 2,
} as const;
export const SUBSCRIPTION_DURATION = {
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
} as const;
