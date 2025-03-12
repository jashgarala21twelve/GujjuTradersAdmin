import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getNewsByCategory,
  CreateCategory,
  getNewsCategoryById,
  updateNewsCategoryById,
} from '@/api/newsCategory';
import { data } from 'react-router-dom';

const NEWS_BY_CATEGORY_QUERY_KEY = ['category'];

export const useGetNewsCategory = () => {
  return useQuery({
    queryKey: [NEWS_BY_CATEGORY_QUERY_KEY],
    queryFn: () => getNewsByCategory(),
  });
};

export const useGetNewsCategoryByIdHook = (categoryId: string) => {
  return useQuery({
    queryKey: [categoryId],
    queryFn: () => getNewsCategoryById(categoryId),
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useUpdateNewCategory = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: updateNewsCategoryById,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};

export const useCreateCategory = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: CreateCategory,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};
