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

export const TRADE_TYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const;

export const TRADE_TERM = {
  SHORT_TERM: '1',
  MEDIUM_TERM: '2',
  LONG_TERM: '3',
} as const;

export const FEATURES = {
  STOCK_TRADE_SUGGESTIONS: 1,
  IPO_UPDATES: 2,
  TELEGRAM_ALERTS: 3,
  HIGH_QUALITY_TRADE_RECOMMENDATIONS: 4,
  MARKET_INSIGHTS: 5,
  QUERY_SUPPORT_BASIC: 6,
  PREMIUM_TRADE_SUGGESTIONS: 7,
  HIGH_IMPACT_ANALYSIS: 8,
  EXPERT_GUIDANCE: 9,
  PORTFOLIO_REVIEW: 10,
  ADVANCED_TOOLS: 11,
  ONE_ON_ONE_SUPPORT: 12,
};
export const FEATURE_OPTIONS = [
  { id: FEATURES.STOCK_TRADE_SUGGESTIONS, label: 'Stock Trade Suggestions' },
  { id: FEATURES.IPO_UPDATES, label: 'IPO Updates' },
  { id: FEATURES.TELEGRAM_ALERTS, label: 'Telegram Alerts' },
  {
    id: FEATURES.HIGH_QUALITY_TRADE_RECOMMENDATIONS,
    label: 'High Quality Trade Recommendations',
  },
  { id: FEATURES.MARKET_INSIGHTS, label: 'Market Insights' },
  { id: FEATURES.QUERY_SUPPORT_BASIC, label: 'Query Support Basic' },
  {
    id: FEATURES.PREMIUM_TRADE_SUGGESTIONS,
    label: 'Premium Trade Suggestions',
  },
  { id: FEATURES.HIGH_IMPACT_ANALYSIS, label: 'High Impact Analysis' },
  { id: FEATURES.EXPERT_GUIDANCE, label: 'Expert Guidance' },
  { id: FEATURES.PORTFOLIO_REVIEW, label: 'Portfolio Review' },
  { id: FEATURES.ADVANCED_TOOLS, label: 'Advanced Tools' },
  { id: FEATURES.ONE_ON_ONE_SUPPORT, label: 'One on One Support' },
];

export const PLAN_PLATFORM_ACCESS_PLATFORMS = {
  TELEGRAM: 1,
  EMAIL: 2,
  WHATSAPP: 3,
  WEB: 4,
} as const;

export const PLAN_PLATFORM_ACCESS_OPTIONS = [
  { id: PLAN_PLATFORM_ACCESS_PLATFORMS.TELEGRAM, label: 'Telegram' },
  { id: PLAN_PLATFORM_ACCESS_PLATFORMS.EMAIL, label: 'Email' },
  { id: PLAN_PLATFORM_ACCESS_PLATFORMS.WHATSAPP, label: 'WhatsApp' },
  { id: PLAN_PLATFORM_ACCESS_PLATFORMS.WEB, label: 'Web' },
];

export const RESPONSE_TIME_OPTIONS = {
  WITHIN_AN_HOUR: 'Within an hour',
  WITHIN_A_FEW_HOURS: 'Within a few hours',
  SAME_DAY: 'Same day',
  WITHIN_24_HOURS: 'Within 24 hours',
  WITHIN_48_HOURS: 'Within 48 hours',
} as const;

export const RESPONSE_TIME_SELECT_OPTIONS = [
  {
    id: RESPONSE_TIME_OPTIONS.WITHIN_AN_HOUR,
    label: RESPONSE_TIME_OPTIONS.WITHIN_AN_HOUR,
  },
  {
    id: RESPONSE_TIME_OPTIONS.WITHIN_A_FEW_HOURS,
    label: RESPONSE_TIME_OPTIONS.WITHIN_A_FEW_HOURS,
  },
  { id: RESPONSE_TIME_OPTIONS.SAME_DAY, label: RESPONSE_TIME_OPTIONS.SAME_DAY },
  {
    id: RESPONSE_TIME_OPTIONS.WITHIN_24_HOURS,
    label: RESPONSE_TIME_OPTIONS.WITHIN_24_HOURS,
  },
  {
    id: RESPONSE_TIME_OPTIONS.WITHIN_48_HOURS,
    label: RESPONSE_TIME_OPTIONS.WITHIN_48_HOURS,
  },
];
