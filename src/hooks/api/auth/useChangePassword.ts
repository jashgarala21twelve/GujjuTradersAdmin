import { ChangePasswordApi } from "@/api/auth";
import Toast from "@/components/toast/commonToast";
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "../useApiError";

export const useChangePasswordMutation = (successHandler) => {
  return useMutation({
    mutationFn: ChangePasswordApi,
    onSuccess: (data) => {
      if (data?.success == false) {
        handleApiError(data);
      }
      if (data?.success == true) {
        successHandler(data);
      }
    },
    onError: (error: any) => {},
  });
};
