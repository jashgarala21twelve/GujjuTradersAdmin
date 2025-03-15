import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import dayjs from 'dayjs';
import { useReferralsHook } from '@/hooks/api/referrals';
import Toast from '@/components/toast/commonToast';

interface IReferral {
  pendingReferrals: number;
  totalReferrals: number;
  completedReferrals: number;
}

const Referrals = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [referralsData, setReferralsData] = useState<IReferral>();

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'Referrals fetched successfully');
    setReferralsData(data?.data);
  };

  console.log('referralsData', referralsData);

  const { mutate, isPending } = useReferralsHook(onSuccessHandler);

  const handleFilterReferrals = () => {
    const payload = {
      startDate: dayjs(fromDate).format('YYYY-MM-DD'),
      endDate: dayjs(toDate).format('YYYY-MM-DD'),
    };

    mutate(payload);
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Referrals</h1>

        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium'>From</span>
            <input
              type='date'
              className='w-full py-2 px-4 text-sm bg-transparent border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
              onChange={(e) => setFromDate(new Date(e.target.value))}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium'>To</span>
            <input
              type='date'
              className='w-full py-2 px-4 text-sm bg-transparent border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
              onChange={(e) => setToDate(new Date(e.target.value))}
            />
          </div>

          <Button
            className='mt-auto'
            onClick={handleFilterReferrals}
            disabled={isPending}
          >
            {isPending ? 'Applying Filter...' : 'Apply Filter'}
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Total Referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-bold'>
              {referralsData?.totalReferrals || 0}
            </div>
            {/* <p className='text-muted-foreground mt-1'>This period</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Completed Referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-bold'>
              {referralsData?.completedReferrals || 0}
            </div>
            {/* <p className='text-muted-foreground mt-1'>New users</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Pending Referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-4xl font-bold'>
              {referralsData?.pendingReferrals || 0}
            </div>
            {/* <p className='text-muted-foreground mt-1'>Avg rate</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Referrals;
