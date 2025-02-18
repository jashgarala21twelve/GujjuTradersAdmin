import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/api/stocks';

const USERS_QUERY_KEY = ['stocks'];

export const useStockList = (params: Record<string, any>) => {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, params], // Ensures query re-fetches when params change
    queryFn: () => getStockList(params), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
