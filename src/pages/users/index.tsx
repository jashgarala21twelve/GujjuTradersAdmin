import AlertDialogComponent from '@/components/alertDialog/alertConfirmDialog';
import CopyToClipboard from '@/components/copyToClipBoard';
import DynamicDataTable from '@/components/datatable/datatable';
import { CircleLoading } from '@/components/loader';
import Loader from '@/components/loader/loader';
import PageTitle from '@/components/pageTitle';
import Toast from '@/components/toast/commonToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { activeInactiveUserHook, useUsers } from '@/hooks/api/users/useUsers';
import { ACCOUNT_STATUS } from '@/utils/constants';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });
  const {
    data: apiResponse,
    isPending,
    isError,
    isSuccess,
    refetch,
  } = useUsers({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
  });
  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'News created successfully');
  };
  const { mutate: activeInactive, isSuccess: activateUserSuccess } =
    activeInactiveUserHook(onSuccessHandler);
  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      const { currentPage, perPage, totalPages, totalCount } = Data;
      setData(Data?.userList);
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
    activateUserSuccess,
  ]);
  const handlePageChange = (page) => {
    setPagination((prev) => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };
  const onHandleSearch = (value) => {
    setSearch(value);
    setPagination((prev) => {
      return {
        ...prev,
        currentPage: 1,
      };
    });
  };

  const handleActiveUser = (value: number) => {
    const payload = {
      userId: id,
      action: value,
    };
    activeInactive(payload);
    console.log('Payload:>>', payload);
  };

  const [isInactiveUserAlertOpen, setIsInactiveUserAlertOpen] = useState(false);
  const [isActiveUserAlertOpen, setActiveUserAlertOpen] = useState(false);
  const columns: ColumnDef[] = [
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <CopyToClipboard text={row.getValue('_id')} />
        </div>
      ),
    },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      cell: ({ row }) => <div>{row.getValue('full_name')}</div>,
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone Number',
      cell: ({ row }) => (
        <div>
          {' '}
          <CopyToClipboard
            text={row.getValue('phone_number')}
            textStyle='font-semibold'
          />
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='lowercase'>
          <CopyToClipboard text={row.getValue('email')} textStyle='' />
        </div>
      ),
    },
    {
      accessorKey: 'user_type',
      header: 'User Type',
      cell: ({ row }) => <div>{row.getValue('user_type')}</div>,
    },
    {
      accessorKey: 'account_status',
      header: 'Account Status',
      cell: ({ row }) => (
        <div>
          {row.getValue('account_status') === 1 ? (
            <span className='bg-green-100 text-green-800 px-2 py-1 rounded'>
              Active
            </span>
          ) : (
            <span className='bg-red-100 text-red-800 px-2 py-1 rounded'>
              Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'profile_image',
      header: 'Profile Image',
      cell: ({ row }) => (
        <img
          src={row.getValue('profile_image')}
          alt='Profile'
          className='h-10 w-10 rounded-full object-cover'
        />
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className='flex w-full items-center justify-center space-x-3'>
            <Link to={`/users/${user._id}`}>View</Link>

            {row.getValue('account_status') === ACCOUNT_STATUS.ACTIVE ? (
              <Button
                variant={'destructive'}
                onClick={() => {
                  setIsInactiveUserAlertOpen(true);
                  setId(user._id);
                }}
              >
                InActive
              </Button>
            ) : (
              <Button
                variant={'default'}
                onClick={() => {
                  setActiveUserAlertOpen(true);
                  setId(user._id);
                }}
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  const filters = [
    // {
    //   col_key: 'email',
    //   filedType: 'input',
    //   placeHolder: 'Email',
    // },
    // {
    //   col_key: 'phone',
    //   filedType: 'input',
    //   placeHolder: 'searchPhone',
    // },
    // {
    //   col_key: 'is_company',
    //   filedType: 'select',
    //   placeHolder: 'Is Company',
    //   options: [
    //     { label: 'Yes', value: '1' },
    //     { label: 'No', value: '0' },
    //   ],
    // },
  ];
  return (
    <div>
      <PageTitle title='Users' />

      <div className='border rounded-xl p-4 flex flex-start flex-col min-h-[700px] '>
        {/* ✅ Loader now fills the entire dashboard area */}

        {/* ✅ Error Message */}
        {isError && (
          <div className='flex flex-1 items-center justify-center'>
            <p className='text-red-500'>Error fetching data</p>
          </div>
        )}
        <Input
          placeholder='Search Users'
          value={search}
          onChange={(e) => onHandleSearch(e.target.value)}
          className='max-w-sm'
        />
        {isPending && (
          <div className='h-[700px]'>
            <CircleLoading />
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
          />
        )}
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

export default Users;
