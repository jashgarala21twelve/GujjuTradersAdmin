import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTradeTip,
  getTradeTipById,
  getTradeTips,
  updateTradeTip,
} from "@/api/tradetips";

const TRADE_TIP_QUERY_KEY = ["tradetip", "search"];
export const useCreateTradeTip = (onSuccessHandler) => {
 c
};

export const useUpdateTradeTip = (onSuccessHandler) => {
  return useMutation({
    mutationFn: updateTradeTip,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};

export const useTradeTipsList = (params) => {
  return useQuery({
    queryKey: [params], // Ensures query re-fetches when params change
    queryFn: () => getTradeTips(params), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

export const useGetTradeTip = (tradeTipId: string) => {
  return useQuery({
    queryKey: [tradeTipId],
    queryFn: () => getTradeTipById(tradeTipId),
    staleTime: 0,
    refetchOnMount:true,

    // staleTime: 5 * 60 * 1000,
  });
};
