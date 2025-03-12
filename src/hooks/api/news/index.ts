import { useMutation, useQuery } from '@tanstack/react-query';
import { getNewsByCategory, getNews, CreateCategory } from '@/api/news/'
 

const NEWS_QUERY_KEY = ['news']
const NEWS_BY_CATEGORY_QUERY_KEY = ['category']

export const useNews = () => {
    return useQuery({queryKey: [NEWS_QUERY_KEY], queryFn: () => getNews(),staleTime: 5 * 60 * 1000,})
}

export const getNewsCategory = () => {
    return useQuery({queryKey: [NEWS_BY_CATEGORY_QUERY_KEY], queryFn: () => getNewsByCategory(), staleTime: 5 * 60 * 1000,})
}

export const useCategory = (onSuccessHandler) => {
       return useMutation({
           mutationFn: CreateCategory,
           retry: false,
           onSuccess: (data) => {
             onSuccessHandler(data);
           },
           
         });
}

