import { useQuery } from '@tanstack/react-query';
import { getTransaction, getTransactionById } from '@/api/transaction';

const TRANSACTION_QUERY_KEY = ['transaction'];

export const useTransactions = (params) => {
  return useQuery({
    queryKey: [TRANSACTION_QUERY_KEY],
    queryFn: () => getTransaction(params),
  });
};

export const useGetTransactionByIdHook = (TransactionId: string) => {
  return useQuery({
    queryKey: [TransactionId],
    queryFn: () => getTransactionById(TransactionId),
    staleTime: 0,
    refetchOnMount: true,
  });
};
