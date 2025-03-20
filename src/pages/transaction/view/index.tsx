import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageTitle from '@/components/pageTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetTransactionByIdHook } from '@/hooks/api/transaction';
import { Loader2 } from 'lucide-react';

const TransactionView: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);

  const {
    data: apiResponse,
    isSuccess,
    isError,
  } = useGetTransactionByIdHook(id as string);

  useEffect(() => {
    if (isSuccess) {
      setData(apiResponse?.data);
    }
  }, [isSuccess]);

  return (
    <div className=''>
      {isSuccess ? (
        <div>
          <PageTitle title='Transaction Details' />

          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* User Card */}
            <Card className='w-full'>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <strong>User Name:</strong>{' '}
                    <Link
                      to={`/users/${data?.userId || '#'}`}
                      className='hover:underline group'
                    >
                      <p className='text-gray-500 group-hover:text-white'>
                        {data?.full_name || '-'}
                      </p>
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>User Email:</strong>{' '}
                    <Link
                      to={`/users/${data?.userId || '#'}`}
                      className='hover:underline group'
                    >
                      <p className='text-gray-500 group-hover:text-white'>
                        {' '}
                        {data?.email || '-'}
                      </p>
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>User Contact:</strong>{' '}
                    <Link
                      to={`/users/${data?.userId}`}
                      className='hover:underline group'
                    >
                      <p className='text-gray-500 group-hover:text-white'>
                        {' '}
                        {data?.contact || '-'}
                      </p>
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Plan Name:</strong>{' '}
                    <p className='text-gray-500'> {data?.planName || '-'}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Plan ID:</strong>{' '}
                    <Link
                      to={`/plans/view/${data?.planId || '#'}`}
                      className='hover:underline group'
                    >
                      <p className='text-gray-500 group-hover:text-white'>
                        {' '}
                        {data?.planId || '-'}
                      </p>
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Total Amount:</strong>{' '}
                    <p className='text-gray-500'>
                      {' '}
                      {'₹ ' + data?.amount || '-'}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Coupon Applied:</strong>{' '}
                    {data?.isCouponApplied ? 'Yes' : 'No'}
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Payment ID:</strong>{' '}
                    <p className='text-gray-500'> {data?.paymentId || '-'}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Payment Method:</strong>{' '}
                    <p className='text-gray-500'> {data?.method || '-'}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Payment Date:</strong>{' '}
                    <p className='text-gray-500'>
                      {new Date(data?.webhook_timestamp).toDateString() || '-'}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <strong>Payment Status:</strong>{' '}
                    {data?.status ? (
                      data?.status === 'captured' ? (
                        <Button variant={'default'}>PAID</Button>
                      ) : (
                        <Button variant={'destructive'}>FAILED</Button>
                      )
                    ) : (
                      <p className='text-gray-500'>-</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <Loader2 size={40} className='animate-spin text-[#2A9D90]' />
        </div>
      )}

      {isError && (
        <div>
          <p className='text-red-500'>Somethings Went Wrong!!</p>
        </div>
      )}
    </div>
  );
};

export default TransactionView;
