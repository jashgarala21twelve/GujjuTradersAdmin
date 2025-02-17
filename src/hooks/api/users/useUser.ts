import { useQuery } from '@tanstack/react-query';
import { getUserByIdApi } from '@/api/users'; // Adjust the import path as needed

const USER_QUERY_KEY = ['user'];

export const useUser = userId => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, userId], // Ensures query re-fetches when params change
    queryFn: () => getUserByIdApi(userId), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
