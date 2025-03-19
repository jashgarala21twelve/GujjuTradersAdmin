import { BASE_API_URL } from "@/utils/constants";
import api, { request } from "../api";

const TRADETIPS_ROUTES = {
  TRADE_TIP: BASE_API_URL + "/tradetip",
};

// Create TradeTip
export const createTradeTip = async (data: Record<string, any>) => {
  return request("post", TRADETIPS_ROUTES.TRADE_TIP, data);
};

// Create TradeTip
export const updateTradeTip = async ({
  tradeTipId,
  data,
}: {
  tradeTipId: string;
  data: Record<string, any>;
}) => {
  return request("put", TRADETIPS_ROUTES.TRADE_TIP + `/${tradeTipId}`, data);
};

// Get TradeTips
export const getTradeTips = async (params: Record<string, string>) => {
  return request("get", TRADETIPS_ROUTES.TRADE_TIP, null, { params });
};

export const getTradeTipById = async (tradeTipId: string) => {
  return request("get", TRADETIPS_ROUTES.TRADE_TIP + `/${tradeTipId}`);
};

export const deleteTradeTip = async (id: string) => {
  return request('delete', TRADETIPS_ROUTES.TRADE_TIP + '/' + id);
};
