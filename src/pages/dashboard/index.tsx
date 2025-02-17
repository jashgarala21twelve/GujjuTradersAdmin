import { useEffect } from 'react';
import { useSyncDB } from '@/hooks/api/useSyncDB';
import { convertToFormData } from '@/utils/helper';
import { CircleLoading } from '@/components/loader';
import DataTable from '@/components/DataTable';
import Loader from '@/components/loader/loader';
import PageTitle from '@/components/pageTitle';

const DashBoard = () => {
  const { mutate, data, isPending, isError } = useSyncDB();

  useEffect(() => {
    const formData = convertToFormData({ model: 'Memo' });
    mutate(formData); // Execute the mutation
  }, [mutate]); // Runs only on mount

  return (
    <div className="flex flex-col flex-1 h-full">
      <PageTitle title="Dashboard" />

      {/* ✅ Loader now fills the entire dashboard area */}
      {isPending && <Loader />}

      {/* ✅ Error Message */}
      {isError && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error fetching data</p>
        </div>
      )}

      {/* ✅ Data Display */}
      {data && (
        <div className="p-4">
          <pre className="">
            {/* {JSON.stringify(data, null, 2)} */}
            <DataTable  />
          </pre>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
