import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircleLoading } from '@/components/loader';
import PageTitle from '@/components/pageTitle';
import { useUser } from '@/hooks/api/users/useUser';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AlertDialogComponent from '@/components/alertDialog/alertConfirmDialog';
import { Button } from '@/components/ui/button';
import { ACCOUNT_STATUS } from '@/utils/constants';
import { activeInactiveUserHook } from '@/hooks/api/users/useUsers';
import Toast from '@/components/toast/commonToast';

interface UserResponse {
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  user_type: number;
  account_status: number;
  referral_code: string;
  createdAt: string;
  planId: string;
  profile_image: string;
}

const User: FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, error, isLoading, refetch } = useUser(userId);
  const [isInactiveUserAlertOpen, setIsInactiveUserAlertOpen] = useState(false);
  const [isActiveUserAlertOpen, setActiveUserAlertOpen] = useState(false);

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'News created successfully');
  };
  const { mutate: activeInactive, isSuccess: activateUserSuccess } =
    activeInactiveUserHook(onSuccessHandler);

  useEffect(() => {
    if (activateUserSuccess) refetch();
  }, [activateUserSuccess]);

  if (isLoading) {
    return (
      <div className='h-[700px] flex justify-center items-center'>
        <CircleLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className='text-2xl'>{error.message}</h1>
      </div>
    );
  }

  const handleActiveUser = (value: number) => {
    const payload = {
      userId: userId,
      action: value,
    };
    activeInactive(payload);
    console.log('Payload:>>', payload);
  };

  const userData: UserResponse = data?.data || null;

  return !userData ? (
    <div>
      <h1 className='text-2xl'>User Not Found</h1>
    </div>
  ) : (
    <div className=''>
      <PageTitle title='User Profile' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {/* User Card */}
        <Card className='w-full  '>
          <CardHeader>
            <div className='flex items-center space-x-4'>
              <Avatar className='w-[70px] h-[70px] overflow-hidden rounded-md'>
                {userData?.profile_image ? (
                  <img
                    src={userData?.profile_image}
                    className='h-full w-full object-cover'
                    alt='Profile Icon'
                  />
                ) : (
                  <AvatarFallback className='rounded-md'>
                    {userData?.full_name[0].toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className='text-xl font-semibold'>
                  {userData?.full_name}
                </div>
                <div className='text-gray-500'>{userData?.email}</div>
                <div className='text-gray-500'>ID: {userData?._id}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <strong>Phone Number:</strong> {userData?.phone_number}
              </div>
              <div>
                <strong>Referral Code:</strong> {userData?.referral_code}
              </div>
              <div>
                <strong>Account Status:</strong>{' '}
                {/* <Badge color={userData?.account_status === 1 ? 'green' : 'red'}> */}
                {userData?.account_status === 1 ? 'Active' : 'Inactive'}
                {/* </Badge> */}
              </div>
              <div>
                <strong>Plan:</strong> {userData?.planId || '-'}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className='text-sm text-gray-400'>
              <strong>Joined on:</strong>{' '}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
          <div className='flex w-full justify-end space-x-3 p-4'>
            <p>User Account Status: </p>
            {userData.account_status === ACCOUNT_STATUS.ACTIVE ? (
              <Button
                variant={'destructive'}
                onClick={() => setIsInactiveUserAlertOpen(true)}
              >
                InActive
              </Button>
            ) : (
              <Button
                variant={'default'}
                onClick={() => setActiveUserAlertOpen(true)}
              >
                Activate
              </Button>
            )}
          </div>
        </Card>
      </div>
      <AlertDialogComponent
        title='Are you sure you want Active this User?'
        description=''
        confirmText='Activate User'
        cancelText='Cancel'
        onConfirm={() => handleActiveUser(1)}
        confirmButtonClass='bg-primary  hover:bg-primary-600'
        open={isActiveUserAlertOpen}
        setOpen={setActiveUserAlertOpen}
      />
      <AlertDialogComponent
        title='Are you sure you want In Active this User?'
        description=''
        confirmText='InActive User'
        cancelText='Cancel'
        onConfirm={() => handleActiveUser(2)}
        confirmButtonClass='bg-destructive text-white hover:bg-red-600'
        open={isInactiveUserAlertOpen}
        setOpen={setIsInactiveUserAlertOpen}
      />
    </div>
  );
};

export default User;
