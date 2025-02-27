import { useMutation, useQuery } from '@tanstack/react-query';

import { createPlan } from '@/api/plans';

export const useCreatePlan = onSuccessHandler => {
  return useMutation({
    mutationFn: createPlan,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};
