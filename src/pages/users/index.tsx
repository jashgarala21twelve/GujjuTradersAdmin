import AlertDialogComponent from '@/components/alertDialog/alertConfirmDialog';
import CopyToClipboard from '@/components/copyToClipBoard';
import DynamicDataTable from '@/components/datatable/datatable';
import { CircleLoading } from '@/components/loader';
import Loader from '@/components/loader/loader';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useUsers } from '@/hooks/api/users/useUsers';
import { ACCOUNT_STATUS } from '@/utils/constants';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  //   const columns: ColumnDef[] = [
  //     // {
  //     //   id: 'select',
  //     //   header: ({ table }) => (
  //     //     <Checkbox
  //     //       checked={
  //     //         table.getIsAllPageRowsSelected() ||
  //     //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //     //       }
  //     //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //     //       aria-label="Select all"
  //     //     />
  //     //   ),
  //     //   cell: ({ row }) => (
  //     //     <Checkbox
  //     //       checked={row.getIsSelected()}
  //     //       onCheckedChange={value => row.toggleSelected(!!value)}
  //     //       aria-label="Select row"
  //     //     />
  //     //   ),
  //     //   enableSorting: false,
  //     //   enableHiding: false,
  //     // },
  //     // {
  //     //   accessorKey: 'status',
  //     //   header: 'Status',
  //     //   cell: ({ row }) => (
  //     //     <div className="capitalize">{row.getValue('status')}</div>
  //     //   ),
  //     // },
  //     // {
  //     //   accessorKey: 'email',
  //     //   header: ({ column }) => (
  //     //     <Button
  //     //       variant="ghost"
  //     //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     //     >
  //     //       Email
  //     //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     //     </Button>
  //     //   ),
  //     //   cell: ({ row }) => (
  //     //     <div className="lowercase">{row.getValue('email')}</div>
  //     //   ),
  //     // },
  //     // {
  //     //   accessorKey: 'amount',
  //     //   header: () => <div className="text-right">Amount</div>,
  //     //   cell: ({ row }) => {
  //     //     const amount = parseFloat(row.getValue('amount'));
  //     //     const formatted = new Intl.NumberFormat('en-US', {
  //     //       style: 'currency',
  //     //       currency: 'USD',
  //     //     }).format(amount);

  //     //     return <div className="text-right font-medium">{formatted}</div>;
  //     //   },
  //     // },
  //     {
  //       accessorKey: 'id',
  //       // header: 'ID',
  //       header: ({ column }) => (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //         >
  //           ID
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       ),
  //       cell: ({ row }) => <div>{row.getValue('id')}</div>,
  //     },
  //     {
  //       accessorKey: 'user_id',
  //       header: ({ column }) => (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //         >
  //           User Id
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       ),
  //       cell: ({ row }) => <div>{row.getValue('user_id')}</div>,
  //     },
  //     {
  //       accessorKey: 'cust_name',
  //       header: 'Customer Name',
  //       cell: ({ row }) => <div>{row.getValue('cust_name')}</div>,
  //     },
  //     {
  //       accessorKey: 'civil_id',
  //       header: 'Civil ID',
  //       cell: ({ row }) => <div>{row.getValue('civil_id')}</div>,
  //     },
  //     {
  //       accessorKey: 'is_company',
  //       header: 'Is Company',
  //       cell: ({ row }) => (
  //         <div>{row.getValue('is_company') === '1' ? 'Yes' : 'No'}</div>
  //       ),
  //     },
  //     {
  //       accessorKey: 'nationality',
  //       header: 'Nationality',
  //       cell: ({ row }) => <div>{row.getValue('nationality')}</div>,
  //     },
  //     {
  //       accessorKey: 'phone',
  //       header: 'Phone',
  //       cell: ({ row }) => <div>{row.getValue('phone')}</div>,
  //     },
  //     {
  //       accessorKey: 'mobile',
  //       header: 'Mobile',
  //       cell: ({ row }) => <div>{row.getValue('mobile') || 'N/A'}</div>,
  //     },
  //     {
  //       accessorKey: 'fax',
  //       header: 'Fax',
  //       cell: ({ row }) => <div>{row.getValue('fax') || 'N/A'}</div>,
  //     },
  //     {
  //       accessorKey: 'notes',
  //       header: 'Notes',
  //       cell: ({ row }) => <div>{row.getValue('notes') || 'N/A'}</div>,
  //     },
  //     {
  //       accessorKey: 'is_delete',
  //       header: 'Deleted',
  //       cell: ({ row }) => (
  //         <div>{row.getValue('is_delete') === 1 ? 'Yes' : 'No'}</div>
  //       ),
  //     },
  //     {
  //       accessorKey: 'created_at',
  //       header: 'Created At',
  //       cell: ({ row }) => <div>{row.getValue('created_at')}</div>,
  //     },
  //     // {
  //     //   id: 'actions',
  //     //   enableHiding: false,
  //     //   cell: ({ row }) => {
  //     //     const payment = row.original;

  //     //     return (
  //     //       <DropdownMenu>
  //     //         <DropdownMenuTrigger asChild>
  //     //           <Button variant="ghost" className="h-8 w-8 p-0">
  //     //             <span className="sr-only">Open menu</span>
  //     //             <MoreHorizontal className="h-4 w-4" />
  //     //           </Button>
  //     //         </DropdownMenuTrigger>
  //     //         <DropdownMenuContent align="end">
  //     //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //     //           <DropdownMenuItem
  //     //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //     //           >
  //     //             Copy payment ID
  //     //           </DropdownMenuItem>
  //     //           <DropdownMenuSeparator />
  //     //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //     //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //     //           <DropdownMenuSeparator />
  //     //           <DropdownMenuItem onClick={() => handleEdit(payment)}>
  //     //             Edit
  //     //           </DropdownMenuItem>
  //     //           <DropdownMenuItem onClick={() => handleDelete(payment.id)} className="text-red-600">
  //     //             Delete
  //     //           </DropdownMenuItem>
  //     //         </DropdownMenuContent>
  //     //       </DropdownMenu>
  //     //     );
  //     //   },
  //     // },
  //     {
  //       id: 'edit_delete',

  //       enableHiding: false,
  //       cell: ({ row }) => {
  //         const payment = row.original;
  //         return (
  //           <div className="flex w-full   items-center  justify-center space-x-2">
  //             <Button variant="outline" size="sm" onClick={() => {}}>
  //               Edit
  //             </Button>
  //             <Button variant="destructive" size="sm" onClick={() => {}}>
  //               Delete
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
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
  }, [pagination.currentPage, pagination.perPage, refetch]);
  const handlePageChange = page => {
    setPagination(prev => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };
  const onHandleSearch = value => {
    setSearch(value);
    setPagination(prev => {
      return {
        ...prev,
        currentPage: 1,
      };
    });
  };
  const [isInactiveUserAlertOpen, setIsInactiveUserAlertOpen] = useState(false);
  const [isActiveUserAlertOpen, setActiveUserAlertOpen] = useState(false);
  const columns: ColumnDef[] = [
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
            textStyle="font-semibold"
          />
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          <CopyToClipboard text={row.getValue('email')} textStyle="" />
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
          {row.getValue('account_status') === 1 ? 'Active' : 'Inactive'}
        </div>
      ),
    },
    {
      accessorKey: 'profile_image',
      header: 'Profile Image',
      cell: ({ row }) => (
        <img
          src={row.getValue('profile_image')}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex w-full items-center justify-center space-x-3">
            <Link to={`/users/${user._id}`}>View</Link>

            {row.getValue('account_status') === ACCOUNT_STATUS.ACTIVE ? (
              <Button
                variant={'destructive'}
                onClick={() => setIsInactiveUserAlertOpen(true)}
              >
                InActive
              </Button>
            ) : (
              <Button
                variant={'default'}
                onClick={() => setActiveUserAlertOpen(true)}
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
      <PageTitle title="Users" />

      <div className="border rounded-xl p-4 flex flex-start flex-col min-h-[700px] ">
        {/* ✅ Loader now fills the entire dashboard area */}

        {/* ✅ Error Message */}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-red-500">Error fetching data</p>
          </div>
        )}
        <Input
          placeholder="Search Users"
          value={search}
          onChange={e => onHandleSearch(e.target.value)}
          className="max-w-sm"
        />
        {isPending && (
          <div className="h-[700px]">
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
        title="Are you sure you want Active this User?"
        description=""
        confirmText="Activate User"
        cancelText="Cancel"
        onConfirm={() => {}}
        confirmButtonClass="bg-primary  hover:bg-primary-600"
        open={isActiveUserAlertOpen}
        setOpen={setActiveUserAlertOpen}
      />
      <AlertDialogComponent
        title="Are you sure you want In Active this User?"
        description=""
        confirmText="InActive User"
        cancelText="Cancel"
        onConfirm={() => {}}
        confirmButtonClass="bg-destructive text-white hover:bg-red-600"
        open={isInactiveUserAlertOpen}
        setOpen={setIsInactiveUserAlertOpen}
      />
    </div>
  );
};

export default Users;
