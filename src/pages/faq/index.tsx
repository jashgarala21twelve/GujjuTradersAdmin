import React from 'react';
import DynamicDataTable from '@/components/datatable/datatable';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader2 } from 'lucide-react';

import { useDeleteFaqHook, useGetFaqs } from '@/hooks/api/faqs';
import CopyToClipboard from '@/components/copyToClipBoard';
import Toast from '@/components/toast/commonToast';

const FAQ = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });

  const {
    data: apiResponse,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetFaqs();

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'News created successfully');
  };

  const { mutate: deleteFaq, isSuccess: isDeleteSuccess } =
    useDeleteFaqHook(onSuccessHandler);

  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      // console.log("dosinvsiikvneroievnbewi", Data)
      setData(Data);
    }
  }, [apiResponse]);

  useEffect(() => {
    if (isDeleteSuccess) refetch();
  }, [isDeleteSuccess]);

  const handleDelete = (id: string) => {
    deleteFaq(id);
  };

  const columns = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          <CopyToClipboard text={row.getValue('_id')} />
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {row.getValue('name')}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }: any) => {
        const faq = row.original;
        return (
          <div className='flex gap-3'>
            <div className='flex gap-2'>
              <Link to={`/faq/view/${faq._id}`} className='hover:underline'>
                View
              </Link>
            </div>

            <div className='flex gap-2'>
              <Link
                to='#'
                className='hover:underline text-red-500'
                onClick={() => handleDelete(faq._id)}
              >
                Delete
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader2 size={40} className='animate-spin text-[#2A9D90]' />
        </div>
      ) : (
        <>
          <PageTitle title="FAQ's List" />
          <div className='border rounded-xl p-4 flex flex-col min-h-[700px]'>
            <div className='flex justify-between mb-4 gap-2'>
              <div className='grid grid-cols-7 gap-3 flex-1'>
                <Input
                  placeholder='Search Coupons'
                  // value={searchInput}
                  // onChange={(e) => handleSearchChange(e.target.value)}
                  className='max-w-sm'
                />
              </div>

              <Button asChild>
                <Link to='/faq/create'>Create New Faq's</Link>
              </Button>
            </div>

            {isError && (
              <div className='flex flex-1 items-center justify-center'>
                <p className='text-red-500'>Error fetching News data</p>
              </div>
            )}
            {isSuccess && <DynamicDataTable data={data} columns={columns} />}
          </div>
        </>
      )}
    </div>
  );
};

export default FAQ;
