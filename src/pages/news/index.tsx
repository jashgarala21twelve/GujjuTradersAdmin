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
import { useTableFilters } from '@/hooks/useTableFilters';
import CopyToClipboard from '@/components/copyToClipBoard';
import { Loader2 } from 'lucide-react';

import { useGetNewsCategory } from '@/hooks/api/newsCategory';
import { useGetNews } from '@/hooks/api/news';

const News = () => {
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
  } = useGetNews();

  const {
    search,
    searchInput,
    searchQueryParams,
    selectedFilterValues,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  } = useTableFilters();

  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      // console.log("dosinvsiikvneroievnbewi", Data)
      setData(Data);
    }
  }, [apiResponse]);

  const columns = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {row.getValue('_id')}
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {row.getValue('title')}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }: any) => {
        const news = row.original;
        return (
          <div className='flex w-full gap-2'>
            <Link
              to={`/news/view/${news._id}`}
              className='hover:underline'
            >
              View
            </Link>
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
          <PageTitle title='News List' />
          <div className='border rounded-xl p-4 flex flex-col min-h-[700px]'>
            <div className='flex justify-between mb-4 gap-2'>
              <div className='grid grid-cols-7 gap-3 flex-1'>
                <Input
                  placeholder='Search Coupons'
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className='max-w-sm'
                />
              </div>

              <Button asChild>
                <Link to='/news/create'>Create News</Link>
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

export default News;
