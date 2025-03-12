import { useMutation, useQuery } from '@tanstack/react-query';

import { getSocialLinks, createSocialLinks } from "@/api/socialLinks"

const SOCIAL_LINKS_QUERY_KEY = ['socialLinks']


export const getSocial = () => {
  return useQuery({
    queryKey: [], // Ensures query re-fetches when params change
    queryFn: () => getSocialLinks(), // Calls API function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};



export const useSocialLink = (onSuccessHandler) => { 
     return useMutation({
        mutationFn: createSocialLinks,
        retry: false,
        onSuccess: (data) => {
          onSuccessHandler(data);
        },
      });
}


