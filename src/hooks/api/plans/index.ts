import { useMutation, useQuery } from '@tanstack/react-query';

import { createPlan, getPlan, getPlans, updatePlan } from '@/api/plans';

export const useCreatePlan = onSuccessHandler => {
  return useMutation({
    mutationFn: createPlan,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};

export const useUpdatePlan = onSuccessHandler => {
  return useMutation({
    mutationFn: updatePlan,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};

export const useGetPlans = params => {
  return useQuery({
    queryKey: [params], // Ensures query re-fetches when params change
    queryFn: () => getPlans(params), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

export const useGetPlan = (planId: string) => {
  return useQuery({
    queryKey: [planId],
    queryFn: () => getPlan(planId),
    staleTime: 0,
    refetchOnMount: true,
  });
};
