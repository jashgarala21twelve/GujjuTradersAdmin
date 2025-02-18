import { FC } from 'react';
import { useParams } from 'react-router-dom';
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

  const { data, error, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="h-[700px] flex justify-center items-center">
        <CircleLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl">{error.message}</h1>
      </div>
    );
  }

  const userData: UserResponse = data?.data || null;

  return !userData ? (
    <div>
      <h1 className="text-2xl">User Not Found</h1>
    </div>
  ) : (
    <div className="">
      <PageTitle title="User Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* User Card */}
        <Card className="w-full  ">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={userData?.profile_image} />
                <AvatarFallback>
                  {userData?.full_name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">
                  {userData?.full_name}
                </div>
                <div className="text-gray-500">{userData?.email}</div>
                <div className="text-gray-500">ID: {userData?._id}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
            <div className="text-sm text-gray-400">
              <strong>Joined on:</strong>{' '}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default User;
