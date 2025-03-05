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
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCoupons } from '@/hooks/api/coupons';
import { useTableFilters } from '@/hooks/useTableFilters';
import { COUPONS_DISCOUNT_TYPE } from '@/utils/constants';
import CopyToClipboard from '@/components/copyToClipBoard';

const Coupons = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });

  const filters = [
    {
      col_key: 'couponCode',
      filedType: 'input',
      queryKey: 'couponCode',
      placeHolder: 'Search By Code',
    },

    {
      col_key: 'isActive',
      queryKey: 'isActive',
      filedType: 'select',
      placeHolder: 'Status',
      defaultLabelValue: 'All Status',
      options: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
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
    isPending,
    isError,
    isSuccess,
    refetch,
  } = useGetCoupons({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
    ...searchQueryParams,
  });

  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      const { currentPage, perPage, totalPages, totalCount } = Data;
      console.log(Data, 'data');
      setData(Data?.couponList);
      setPagination({ currentPage, perPage, totalPages, totalCount });
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

  const handlePageChange = page =>
    setPagination(prev => ({ ...prev, currentPage: page }));

  const columns = [
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
          <CopyToClipboard text={row.getValue('_id') }    />
        </div>
      ),
    },

    {
      accessorKey: 'couponCode',
      header: 'Coupon Code',
      cell: ({ row }) => (
        <div className="font-extrabold">{row.getValue('couponCode')}</div>
      ),
    },

    {
      accessorKey: 'discountValue',
      header: 'Discount',
      cell: ({ row }) => {
        const discountType = row.getValue('discountType');
        const discountValue = row.getValue('discountValue');
        return discountType === COUPONS_DISCOUNT_TYPE.PERCENTAGE
          ? discountValue + '%'
          : discountValue + '₹';
      },
    },
    {
      accessorKey: 'discountType',
      header: 'Discount Type',
      cell: ({ row }) => <div>{row.getValue('discountType')}</div>,
      visible: false, // Hidden by default
    },

    // Add sorting for count fields
    {
      accessorKey: 'globalUsageLimit',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Usage Limit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('globalUsageLimit')}</div>,
    },
    {
      accessorKey: 'totalUsedCount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Used Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('totalUsedCount')}</div>,
    },
    {
      accessorKey: 'usedCount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Used Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('usedCount')}</div>,
    },

    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        return row.getValue('isActive') ? (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Active
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
            Inactive
          </span>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex w-full gap-2">
          <Link
            to={`/coupons/view/${row.original._id}`}
            className="hover:underline"
          >
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="Coupons Management" />
      <div className="border rounded-xl p-4 flex flex-col min-h-[700px]">
        <div className="flex justify-between mb-4 gap-2">
          <div className="grid grid-cols-7 gap-3 flex-1">
            <Input
              placeholder="Search Coupons"
              value={searchInput}
              onChange={e => handleSearchChange(e.target.value)}
              className="max-w-sm"
            />
            {filters.map(filter =>
              filter.filedType === 'select' ? (
                <Select
                  key={filter.col_key}
                  value={selectedFilterValues[filter.col_key]}
                  onValueChange={value => handleFilterChange(filter, value)}
                >
                  <SelectTrigger className="max-w-52">
                    <SelectValue placeholder={filter.placeHolder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">
                      {filter.defaultLabelValue || 'All'}
                    </SelectItem>
                    {filter.options.map(option => (
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
                  onChange={e => handleFilterChange(filter, e.target.value)}
                  className="max-w-sm"
                />
              )
            )}
          </div>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button asChild>
            <Link to="/coupons/create">Create New Coupon</Link>
          </Button>
        </div>
        {isPending && (
          <div className="h-[600px] flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          </div>
        )}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-red-500">Error fetching coupons data</p>
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
    </div>
  );
};

export default Coupons;
