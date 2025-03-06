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
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPlans } from '@/hooks/api/plans'; // Make sure you create this hook
import { useTableFilters } from '@/hooks/useTableFilters';
import CopyToClipboard from '@/components/copyToClipBoard';

const Plans = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });
  const filters = [
    {
      col_key: 'name',
      filedType: 'input',
      queryKey: 'name',
      placeHolder: 'Search By Name',
    },
    {
      col_key: 'planKey',
      filedType: 'input',
      queryKey: 'planKey',
      placeHolder: 'Search By Plan Key',
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
    {
      col_key: 'trialAvailable',
      queryKey: 'trialAvailable',
      filedType: 'select',
      placeHolder: 'Trial Available',
      defaultLabelValue: 'All Trial Options',
      options: [
        { label: 'Available', value: true },
        { label: 'Not Available', value: false },
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
  } = useGetPlans({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
    ...searchQueryParams,
  });

  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      const { currentPage, perPage, totalPages, totalCount } = Data;
      setData(Data?.plansList);
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

  const handlePageChange = page => {
    setPagination(prev => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };

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
          {' '}
          <CopyToClipboard text={row.getValue('_id')} />
        </div>
      ),
    },
    {
      accessorKey: 'planKey',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Plan Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('planKey')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Plan Name',
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price (Monthly/Yearly)',
      cell: ({ row }) => {
        const price = row.getValue('price');
        return (
          <div>
            ₹{price.monthly} / ₹{price.yearly}
            <span className="text-green-600 ml-2">({price.discount}% off)</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'features',
      header: 'Features',
      cell: ({ row }) => {
        const features = row.getValue('features');
        return <div>{features.length} features</div>;
      },
    },
    {
      accessorKey: 'trialAvailable',
      header: 'Trial',
      cell: ({ row }) => (
        <div>
          {row.getValue('trialAvailable') ? (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
              Not Available
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'webinars',
      header: 'Webinars',
      cell: ({ row }) => (
        <div>
          {row.getValue('webinars') ? (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded ">
              Included
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded ">
              Not Included
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'responseTime',
      header: 'Response Time',
      cell: ({ row }) => <div>{row.getValue('responseTime')}</div>,
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <div>
          {row.getValue('isActive') ? (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
              Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        // Format date for display
        const date = new Date(row.getValue('createdAt'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const plan = row.original;
        return (
          <div className="flex w-full gap-2">
            <Link to={`/plans/view/${plan._id}`} className="hover:underline">
              View
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageTitle title="Plans Management" />

      <div className="border rounded-xl p-4 flex flex-start flex-col min-h-[700px]">
        {/* Filters section */}
        <div className="flex justify-between mb-4 gap-2">
          <div className="grid grid-cols-7 gap-3 flex-1">
            <Input
              placeholder="Search Plans"
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
            {/* Reset button */}
          </div>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button asChild>
            <Link to="/plans/create">Create New Plan</Link>
          </Button>
        </div>

        {/* Loading state */}
        {isPending && (
          <div className="h-[600px] flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-red-500">Error fetching plans data</p>
          </div>
        )}

        {/* Data table */}
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

export default Plans;
