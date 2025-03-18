'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import dayjs from 'dayjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import DashBoardCard from './DashBoardCard';
import { useDashboard } from '@/hooks/api/dashboard';

interface IData {
  totalUsers: number;
  totalTradeTips: number;
  totalRevenue: number;
  activeUsers: number;
  inactiveUsers: number;
  activeTradeTips: number;
  inactiveTradeTips: number;
  targetAchievedCount: number;
  stopLossHitCount: number;
  mostBookmarkedTradeTips: {
    bookmarkCount: number;
    stockName: string;
  };
  failedTransactionCount: number;
  successTransactionCount: number;
  userPlanCounts: [];
}

interface IDate {
  fromDate: string;
  toDate: string;
}

const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [dashboardData, setDashboardData] = useState<IData>();
  const [date, setDate] = useState<IDate>();

  const { data, isSuccess, refetch } = useDashboard(date);

  console.log('Dashboard Data:>>', dashboardData);

  useEffect(() => {
    if (isSuccess && data) {
      setDashboardData(data?.data);
    }
  }, [isSuccess, data]);

  const handleFilterReferrals = () => {
    const payload = {
      fromDate: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? dayjs(toDate).format('YYYY-MM-DD') : '',
    };

    setDate(payload);
  };

  console.log('Date:>>', date);

  const handleResetDate = () => {
    setDate({});
    setFromDate(undefined);
    setToDate(undefined);
    refetch();
  };

  return (
    <div className='flex flex-col flex-1 h-full bg-gradient-to-br from-background to-background/80'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col gap-5 flex-wrap md:flex-row justify-between items-start md:items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <p className='text-muted-foreground mt-1'>
              Overview of your platform's performance
            </p>
          </div>

          <div className='mt-4 md:mt-0 w-full md:w-auto bg-card rounded-xl p-4 shadow-sm border'>
            <div className='flex flex-col sm:flex-row gap-4 items-end'>
              <div className='flex flex-col gap-2 relative'>
                <span className='text-sm font-medium flex items-center gap-2'>
                  <Calendar size={14} />
                  From
                </span>
                <div className='relative'>
                  <input
                    type='date'
                    value={fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : ''}
                    className='w-full py-2 px-4 text-sm bg-background border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
                    onChange={(e) =>
                      setFromDate(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                  {fromDate && (
                    <button
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      onClick={() => setFromDate(undefined)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-2 relative'>
                <span className='text-sm font-medium flex items-center gap-2'>
                  <Calendar size={14} />
                  To
                </span>
                <div className='relative'>
                  <input
                    type='date'
                    value={toDate ? dayjs(toDate).format('YYYY-MM-DD') : ''}
                    className='w-full py-2 px-4 text-sm bg-background border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
                    onChange={(e) =>
                      setToDate(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                  />
                  {toDate && (
                    <button
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      onClick={() => setToDate(undefined)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='default'
                  size='sm'
                  onClick={handleFilterReferrals}
                  disabled={!fromDate && !toDate}
                >
                  Apply Filter
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleResetDate}
                  disabled={!fromDate && !toDate}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <DashBoardCard
            heading='Total Users'
            number={dashboardData?.totalUsers ?? 0}
            // trend={+5.2}
            icon='users'
            color='primary'
          />
          <DashBoardCard
            heading='Total Tradetips'
            number={dashboardData?.totalTradeTips ?? 0}
            // trend={+12.5}
            icon='trending-up'
            color='success'
          />
          <DashBoardCard
            heading='Total Revenue'
            number={dashboardData?.totalRevenue ?? 0}
            // trend={+8.7}
            icon='credit-card'
            color='warning'
          />
        </div>

        <Tabs defaultValue='users' className='w-full'>
          <TabsList className='mb-6'>
            <TabsTrigger value='users'>User Data</TabsTrigger>
            <TabsTrigger value='tradetips'>Tradetips Data</TabsTrigger>
            <TabsTrigger value='payments'>Payment Data</TabsTrigger>
            <TabsTrigger value='plans'>Plan Data</TabsTrigger>
          </TabsList>

          <TabsContent value='users' className='space-y-4'>
            <div className='bg-card rounded-xl p-6 shadow-sm border'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-semibold'>User Data</h2>
                {/* <Badge variant='outline' className='px-3'>
                  Last 30 days
                </Badge> */}
              </div>
              <Separator className='mb-6' />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <DashBoardCard
                  heading='Active Users'
                  number={dashboardData?.activeUsers ?? 0}
                  icon='user-check'
                  color='success'
                />
                <DashBoardCard
                  heading='Inactive Users'
                  number={dashboardData?.inactiveUsers ?? 0}
                  icon='user-x'
                  color='destructive'
                />
                <DashBoardCard
                  heading='Total Users'
                  number={dashboardData?.totalUsers ?? 0}
                  icon='users'
                  color='primary'
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='tradetips' className='space-y-4'>
            <div className='bg-card rounded-xl p-6 shadow-sm border'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-semibold'>Tradetips Data</h2>
                {/* <Badge variant='outline' className='px-3'>
                  Last 30 days
                </Badge> */}
              </div>
              <Separator className='mb-6' />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <DashBoardCard
                  heading='Total Tradetips'
                  number={dashboardData?.totalTradeTips ?? 0}
                  icon='bar-chart-2'
                  color='primary'
                />
                <DashBoardCard
                  heading='Active Tradetips'
                  number={dashboardData?.activeTradeTips ?? 0}
                  icon='activity'
                  color='success'
                />
                <DashBoardCard
                  heading='Inactive Tradetips'
                  number={dashboardData?.inactiveTradeTips ?? 0}
                  icon='x-circle'
                  color='destructive'
                />
                <DashBoardCard
                  heading='Target Archived'
                  number={dashboardData?.targetAchievedCount ?? 0}
                  icon='target'
                  color='warning'
                />
                <DashBoardCard
                  heading='Stoploss Hit'
                  number={dashboardData?.stopLossHitCount ?? 0}
                  icon='alert-triangle'
                  color='destructive'
                />
                <DashBoardCard
                  heading='Most Bookmarked'
                  number={
                    dashboardData?.mostBookmarkedTradeTips?.bookmarkCount ?? 0
                  }
                  icon='bookmark'
                  trend={
                    dashboardData?.mostBookmarkedTradeTips?.stockName ?? 'N/A'
                  }
                  color='info'
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='payments' className='space-y-4'>
            <div className='bg-card rounded-xl p-6 shadow-sm border'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-semibold'>Payment Data</h2>
                {/* <Badge variant='outline' className='px-3'>
                  Last 30 days
                </Badge> */}
              </div>
              <Separator className='mb-6' />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <DashBoardCard
                  heading='Total Revenue'
                  number={dashboardData?.totalRevenue ?? 0}
                  icon='credit-card'
                  color='primary'
                />
                <DashBoardCard
                  heading='Failed Transactions'
                  number={dashboardData?.failedTransactionCount ?? 0}
                  icon='x-circle'
                  color='destructive'
                />
                <DashBoardCard
                  heading='Success Transactions'
                  number={dashboardData?.successTransactionCount ?? 0}
                  icon='check-circle'
                  color='success'
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='plans' className='space-y-4'>
            <div className='bg-card rounded-xl p-6 shadow-sm border'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-semibold'>Plan Data</h2>
                {/* <Badge variant='outline' className='px-3'>
                  Active Subscriptions
                </Badge> */}
              </div>
              <Separator className='mb-6' />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {dashboardData?.userPlanCounts.map(
                  (item: { label: string; count: number }) => {
                    return (
                      <DashBoardCard
                        key={item?.count}
                        heading={item?.label}
                        number={item?.count}
                        description='Active Users'
                        icon='zap'
                        color='warning'
                      />
                    );
                  }
                )}

                {/* <DashBoardCard
                  heading='Smart Trader'
                  number={15}
                  description='Active Users'
                  icon='award'
                  color='info'
                />
                <DashBoardCard
                  heading='Pro Trader'
                  number={5}
                  description='Active Users'
                  icon='star'
                  color='primary'
                /> */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
