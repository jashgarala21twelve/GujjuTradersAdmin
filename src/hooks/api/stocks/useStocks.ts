import { useMutation, useQuery } from '@tanstack/react-query';
import { getStockBySymbol, getStockList, refetchStockList } from '@/api/stocks';
import Toast from '@/components/toast/commonToast';

const USERS_QUERY_KEY = ['stocks'];

export const useStockList = (params: Record<string, any>) => {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, params], // Ensures query re-fetches when params change
    queryFn: () => getStockList(params), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

export const useRefetchStockList = () => {
  return useMutation({
    mutationFn: refetchStockList,
    retry: false,
    onSuccess: data => {},
  });
};

export const useGetStockBySymbol = () => {
  return useMutation({
    mutationFn: getStockBySymbol,
  });
};
