import { useMutation, useQuery } from '@tanstack/react-query';
import { getStockBySymbol } from '@/api/stocks';
import { createTradeTip, getTradeTips } from '@/api/tradetips';

export const useCreateTradeTip = onSuccessHandler => {
  return useMutation({
    mutationFn: createTradeTip,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};

export const useGetStockBySymbol = () => {
  return useMutation({
    mutationFn: getStockBySymbol,
  });
};
const TRADE_TIP_QUERY_KEY = ['tradetip'];

export const useTradeTipsList = params => {
  return useQuery({
    queryKey: [...TRADE_TIP_QUERY_KEY], // Ensures query re-fetches when params change
    queryFn: () => getTradeTips(params), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
