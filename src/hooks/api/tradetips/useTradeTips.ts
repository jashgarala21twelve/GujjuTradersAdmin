import { useMutation } from '@tanstack/react-query';
import { getStockBySymbol } from '@/api/stocks';
import { createTradeTip } from '@/api/tradetips';

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
