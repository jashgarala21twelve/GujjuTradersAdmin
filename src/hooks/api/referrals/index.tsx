import { getReferrals } from '@/api/referrals';
import { useMutation } from '@tanstack/react-query';

export const useReferralsHook = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: getReferrals,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};
