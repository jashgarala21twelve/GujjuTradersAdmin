import {
  createCoupon,
  getCoupon,
  getCoupons,
  resetCoupon,
  updateCoupon,
} from '@/api/coupons';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateCoupon = onSuccessHandler => {
  return useMutation({
    mutationFn: createCoupon,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};

export const useUpdateCoupon = onSuccessHandler => {
  return useMutation({
    mutationFn: updateCoupon,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};
export const useResetCoupon = onSuccessHandler => {
  return useMutation({
    mutationFn: resetCoupon,
    retry: false,
    onSuccess: data => {
      onSuccessHandler(data);
    },
  });
};
export const useGetCoupons = params => {
  return useQuery({
    queryKey: [params], // Ensures query re-fetches when params change
    queryFn: () => getCoupons(params), // Calls API function
  });
};

export const useGetCoupon = (couponId: string) => {
  return useQuery({
    queryKey: [couponId],
    queryFn: () => getCoupon(couponId),
    staleTime: 0,
    refetchOnMount: true,
  });
};
