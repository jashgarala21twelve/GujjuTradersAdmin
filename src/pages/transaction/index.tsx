import DynamicDataTable from '@/components/datatable/datatable';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useTransactions } from '@/hooks/api/transaction';
import CopyToClipboard from '@/components/copyToClipBoard';
import { useTableFilters } from '@/hooks/useTableFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Transaction = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });

  const filters = [
    {
      col_key: 'email',
      filedType: 'input',
      queryKey: 'email',
      placeHolder: 'Search By email',
    },
    {
      col_key: 'paymentId',
      filedType: 'input',
      queryKey: 'paymentId',
      placeHolder: 'Search By payment id',
    },
  ];
  const {
    search,
    searchInput,
    searchQueryParams,
    selectedFilterValues,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  } = useTableFilters(filters, pagination, setPagination);

  const {
    data: apiResponse,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useTransactions({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
    ...searchQueryParams,
  });
  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      const { currentPage, perPage, totalPages, totalCount } = Data;
      setData(Data?.transactionList);
      setPagination({
        currentPage,
        perPage,
        totalPages,
        totalCount,
      });
    }
  }, [apiResponse]);
  useEffect(() => {
    refetch();
  }, [
    pagination.currentPage,
    pagination.perPage,
    refetch,
    search,
    searchQueryParams,
  ]);
  const columns = [
    {
      accessorKey: 'paymentId',
      header: 'Payment ID',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          <CopyToClipboard text={row.getValue('paymentId')} />
        </div>
      ),
    },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          <Link
            to={`/users/${row.original.userId}`}
            className='hover:underline'
          >
            {row.getValue('full_name')}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: 'contact',
      header: 'Phone Number',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          <Link
            to={`/users/${row.original.userId}`}
            className='hover:underline'
          >
            {row.getValue('contact')}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          <Link
            to={`/users/${row.original.userId}`}
            className='hover:underline'
          >
            {row.getValue('email')}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: 'finalAmount',
      header: 'Amount',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {'₹ ' + row.getValue('finalAmount')}
        </div>
      ),
    },
    {
      accessorKey: 'planName',
      header: 'Plan Name',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {row.getValue('planName') || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Transaction Status',
      cell: ({ row }: any) => (
        <div className='font-md rounded-md w-max px-2'>
          {row.getValue('status') === 'captured' ? (
            <Button variant={'default'}>PAID</Button>
          ) : (
            <Button variant={'destructive'}>FAILED</Button>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }: any) => {
        const transaction = row.original;
        return (
          <div className='flex w-full gap-2'>
            <Link
              to={`/transaction/view/${transaction._id}`}
              className='hover:underline'
            >
              View
            </Link>
          </div>
        );
      },
    },
  ];
  const handlePageChange = (page) => {
    setPagination((prev) => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader2 size={40} className='animate-spin text-[#2A9D90]' />
        </div>
      ) : (
        <>
          <PageTitle title='Transaction List' />
          <div className='border rounded-xl p-4 flex flex-col min-h-[700px]'>
            {/* Filters section */}
            <div className='flex justify-between mb-4 gap-2'>
              <div className='grid grid-cols-7 gap-3 flex-1'>
                <Input
                  placeholder='Search Transactions'
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className='max-w-sm'
                />
                {filters.map((filter) =>
                  filter.filedType === 'select' ? (
                    <Select
                      key={filter.col_key}
                      value={selectedFilterValues[filter.col_key]}
                      onValueChange={(value) =>
                        handleFilterChange(filter, value)
                      }
                    >
                      <SelectTrigger className='max-w-52'>
                        <SelectValue placeholder={filter.placeHolder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='All'>
                          {filter.defaultLabelValue || 'All'}
                        </SelectItem>
                        {filter.options.map((option) => (
                          <SelectItem
                            key={option.value.toString()}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      key={filter.col_key}
                      placeholder={filter.placeHolder}
                      onChange={(e) =>
                        handleFilterChange(filter, e.target.value)
                      }
                      className='max-w-sm'
                    />
                  )
                )}
                {/* Reset button */}
              </div>
              <Button variant='outline' onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>

            {isError && (
              <div className='flex flex-1 items-center justify-center'>
                <p className='text-red-500'>Error fetching News data</p>
              </div>
            )}
            {isSuccess && (
              <DynamicDataTable
                data={data}
                columns={columns}
                filters={filters}
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={handlePageChange}
                handleFilter={handleFilterChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
