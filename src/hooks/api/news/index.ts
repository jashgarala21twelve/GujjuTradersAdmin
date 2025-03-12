import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getNewsByCategory,
  CreateCategory,
  getNewsCategoryById,
  updateNewsCategoryById,
} from '@/api/newsCategory';
import { data } from 'react-router-dom';
import { createNews, getNews, getNewsById, updateNewsById } from '@/api/news';

const NEWS_QUERY_KEY = ['news'];

export const useGetNews = () => {
  return useQuery({
    queryKey: [NEWS_QUERY_KEY],
    queryFn: () => getNews(),
  });
};

export const useCreateNews = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: createNews,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};

export const useGetNewsByIdHook = (newsId: string) => {
  return useQuery({
    queryKey: [newsId],
    queryFn: () => getNewsById(newsId),
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useUpdateNews = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: updateNewsById,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};
