import { useEffect } from 'react';
import { useSyncDB } from '@/hooks/api/useSyncDB';
import { convertToFormData } from '@/utils/helper';
import { CircleLoading } from '@/components/loader';
import DataTable from '@/components/DataTable';
import Loader from '@/components/loader/loader';
import PageTitle from '@/components/pageTitle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

const DashBoard = () => {
  return (
    <div className='flex flex-col flex-1 h-full'>
      <PageTitle title='Dashboard' />

      {/* ✅ Loader now fills the entire dashboard area */}
      {/* {isPending && <Loader />} */}

      {/* ✅ Error Message */}
      {/* {isError && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error fetching data</p>
        </div>
      )} */}

      {/* ✅ Data Display */}

      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total Users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{0}</div>
              {/* <p className='text-muted-foreground mt-1'>This period</p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Active Users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{0}</div>
              {/* <p className='text-muted-foreground mt-1'>New users</p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Inactive Users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{0}</div>
              {/* <p className='text-muted-foreground mt-1'>Avg rate</p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total Transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{0}</div>
              {/* <p className='text-muted-foreground mt-1'>Avg rate</p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total Tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-4xl font-bold'>{0}</div>
              {/* <p className='text-muted-foreground mt-1'>Avg rate</p> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
