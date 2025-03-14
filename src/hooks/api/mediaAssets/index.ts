import { useMutation, useQuery } from '@tanstack/react-query';
import { createMedia, deleteMediaAssets, getMediaAssetsById } from '@/api/mediaAssets';

const MEDIA_QUERY_KEY = ['media'];

// export const useGetFaqs = () => {
//   return useQuery({
//     queryKey: [MEDIA_QUERY_KEY],
//     queryFn: () => getFaq(),
//   });
// };

export const useAddMedia = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: createMedia,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};

export const useGetMediaAssetsByIdHook = (mediaAssetsId: string) => {
  return useQuery({
    queryKey: [mediaAssetsId],
    queryFn: () => getMediaAssetsById(mediaAssetsId),
    staleTime: 0,
    refetchOnMount: true,
  });
};

// export const useUpdateFaq = (onSuccessHandler: any) => {
//   return useMutation({
//     mutationFn: updateFaqById,
//     retry: false,
//     onSuccess: (data) => {
//       onSuccessHandler(data);
//     },
//   });
// };

export const useDeleteMediaAssetsHook = (onSuccessHandler: any) => {
  return useMutation({
    mutationFn: deleteMediaAssets,
    retry: false,
    onSuccess: (data) => {
      onSuccessHandler(data);
    },
  });
};
