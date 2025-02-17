import { SidebarFooter } from '@/components/ui/sidebar';
import AlertDialogComponent from '@/components/alertDialog/alertConfirmDialog';
import { useAuth } from '@/context/authContext';
import ChangePasswordDialog from '@/components/dialog/changePassword';
import { useChangePasswordMutation } from '@/hooks/api/auth/useChangePassword';
import { convertToFormData } from '@/utils/helper';
import Toast from '@/components/toast/commonToast';
import { useState } from 'react';
import { useLogoutQuery } from '@/hooks/api/auth/useLogout';

export const SidebarFooterComponent = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logoutApi();
    logout();
  };
  const { refetch: logoutApi } = useLogoutQuery();

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const onHandleChangePasswordSuccess = () => {
    Toast('success', 'Password Change Success');
    setIsChangePasswordDialogOpen(false); // Close the modal on success
  };
  const { isPending, mutate: changePassword } = useChangePasswordMutation(
    onHandleChangePasswordSuccess
  );
  const handleChangePassword = data => {
    const formData = convertToFormData(data);
    changePassword(formData);
  };

  return (
    <SidebarFooter className="border-t  border-r border-secondary dark:bg-gray-950">
      <div className="flex flex-col gap-5 py-3">
        {/* <Button variant="outline">Change Password</Button> */}

        <ChangePasswordDialog
          onHandleSubmit={handleChangePassword}
          isLoading={isPending}
          isOpen={isChangePasswordDialogOpen}
          onOpenChange={setIsChangePasswordDialogOpen}
        />
        {/* Logout Button with Alert Dialog */}
        <AlertDialogComponent
          title="Are you sure you want to logout?"
          description="You will need to log in again to access your account."
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleLogout}
          triggerText="Logout"
          variant="destructive"
          confirmButtonClass="bg-destructive text-white hover:bg-red-600"
        />
      </div>
    </SidebarFooter>
  );
};
