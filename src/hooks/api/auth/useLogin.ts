import { loginApi } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import {
  setSessionStorageItem,
  setSessionStorageObject,
  setToken,
} from '@/utils/sessionStorage';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/toast/commonToast';

export const useLoginMutation = (onSuccessHandler) => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      sessionStorage.setItem('userEmail', data?.data?.email);

      if (!data?.success) {
        Toast(
          'destructive',
          'Login Failed',
          data?.message || 'Invalid Email or Password!'
        );
        return;
      }
      const payload = data?.data;
      const { accessToken, ...loginData } = payload;
      if (accessToken) {
        onSuccessHandler(accessToken, loginData);
      }
    },
  });
};
