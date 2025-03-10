import CopyToClipboard from '@/components/copyToClipBoard';
import DynamicDataTable from '@/components/datatable/datatable';
import { CircleLoading } from '@/components/loader';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTradeTipsList, useUpdateTradeTip } from '@/hooks/api/tradetips';
import { convertToFormData } from '@/utils/helper';
import { ColumnDef } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TradeTips = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });
  const [searchQueryParams, setSearchQueryParams] = useState({});
  const {
    data: apiResponse,
    isPending,
    isError,
    isSuccess,
    refetch,
  } = useTradeTipsList({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
    ...searchQueryParams,
  });
  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      const { currentPage, perPage, totalPages, totalCount } = Data;
      setData(Data?.tradeTipsList);
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
  const onSuccessTradeTipUpdate = () => {
    refetch();
  };
  const { mutate: updateTradeTip } = useUpdateTradeTip(onSuccessTradeTipUpdate);

  const handleActiveInactiveTradeTip = (
    tradeTipId: string,
    active: boolean
  ) => {
    const formData = convertToFormData({
      active,
    });
    updateTradeTip({ tradeTipId, data: formData });
  };
  const debouncedSearch = useCallback(
    debounce(value => {
      setSearch(value);
      setPagination(prev => {
        return {
          ...prev,
          currentPage: 1,
        };
      });
    }, 500), // 500ms delay
    []
  );
  const onHandleSearch = value => {
    setSearchInput(value);
    debouncedSearch(value);
  };
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
      accessorKey: 'stockLogo',
      header: 'Logo',
      cell: ({ row }) => {
        const stockLogo = row.getValue('stockLogo');
        const stockLogoLetter = row.getValue('stockSymbol').slice(0, 1);
        console.log(stockLogo, 'stockLogo');
        if (!stockLogo)
          return (
            <div className="h-10 w-10 bg-secondary  font-bold  rounded-full flex items-center justify-center ">
              {stockLogoLetter}
            </div>
          );
        return (
          <img
            src={stockLogo}
            alt="Stock Logo"
            className="h-10 w-10 rounded-full object-cover "
          />
        );
      },
    },
    {
      accessorKey: 'stockSymbol',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <CopyToClipboard
            text={row.getValue('stockSymbol')}
            textStyle="font-semibold"
          />
        </div>
      ),
    },
    {
      accessorKey: 'stockName',
      header: 'Stock Name',
      cell: ({ row }) => (
        <div>
          <CopyToClipboard text={row.getValue('stockName')} />
        </div>
      ),
    },
    {
      accessorKey: 'tradeType',
      header: 'Trade Type',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('tradeType')}</div>
      ),
    },
    // {
    //   accessorKey: 'entryRange',
    //   header: 'Entry Range',
    //   cell: ({ row }) => <div>₹{row.getValue('entryRange')}</div>,
    // },
    // {
    //   accessorKey: 'stopLoss',
    //   header: 'Stop Loss',
    //   cell: ({ row }) => <div>₹{row.getValue('stopLoss')}</div>,
    // },
    // {
    //   accessorKey: 'targets',
    //   header: 'Targets',
    //   cell: ({ row }) => (
    //     <div className="space-x-1">
    //       {row.getValue('targets').map((target: string, index: number) => (
    //         <span
    //           key={index}
    //           className="bg-slate-100 text-black px-2 py-1 rounded"
    //         >
    //           ₹{target}
    //         </span>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => <div>{row.getValue('duration')}</div>,
    },
    {
      accessorKey: 'formattedCreatedAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('formattedCreatedAt')}</div>,
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => (
        <div>
          {row.getValue('active') ? (
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
      id: 'Active',
      header: 'Active / In Active',
      cell: ({ row }) => {
        const active = row.getValue('active');
        const _id = row.getValue('_id');
        return (
          <div className="flex w-full items-center ">
            <Switch
              checked={active}
              onCheckedChange={value => {
                handleActiveInactiveTradeTip(_id, value);
              }}
            />
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const stock = row.original;
        return (
          <div className="flex w-full items-center ">
            <Link
              to={`/tradetips/view/${stock._id}`}
              className="hover:underline"
            >
              View
            </Link>
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
    {
      col_key: 'stockSymbol',
      filedType: 'input',
      queryKey: 'stockSymbol',
      placeHolder: 'Search By Symbol',
    },
    {
      col_key: 'active',
      queryKey: 'active',
      filedType: 'select',
      placeHolder: 'Is Active',
      defaultLabelValue: 'All Active/InActive',

      options: [
        { label: 'Active', value: true },
        { label: 'InActive', value: false },
      ],
    },
    {
      col_key: 'tradeType',
      queryKey: 'tradeType',
      filedType: 'select',
      placeHolder: 'Trade Type',
      defaultLabelValue: 'All Trade Types',

      options: [
        { label: 'BUY', value: 'BUY' },
        { label: 'SELL', value: 'SELL' },
      ],
    },
    {
      col_key: 'exchange',
      queryKey: 'exchange',
      filedType: 'select',
      placeHolder: 'Trade Type',
      defaultLabelValue: 'All Exchanges',
      options: [
        { label: 'BSE', value: 'BSE' },
        { label: 'NSE', value: 'NSE' },
      ],
    },
  ];
  const [selectedFilterValues, setSelectedFilterValues] = useState(
    filters.reduce((acc, filter) => {
      if (filter.filedType === 'select') {
        acc[filter.col_key] = 'All';
      }
      return acc;
    }, {})
  );
  const handleFilterChange = (filteredValues, value) => {
    setSelectedFilterValues(prev => ({
      ...prev,
      [filteredValues.col_key]: value,
    }));
    if (
      (filteredValues.filedType === 'select' && value === 'All') ||
      (filteredValues.filedType === 'input' && value === '')
    ) {
      const { [filteredValues.queryKey]: value, ...newSearchQueryParams } =
        searchQueryParams;
      setSearchQueryParams(newSearchQueryParams);
    } else {
      setSearchQueryParams(prev => {
        return {
          ...prev,
          [filteredValues.queryKey]: value,
        };
      });
    }
    setPagination(prev => {
      return {
        ...prev,
        currentPage: 1,
      };
    });
  };

  return (
    <div>
      <PageTitle title="Trade Tips" />

      <div className="border rounded-xl p-4 flex flex-start flex-col min-h-[700px] ">
        {/* ✅ Loader now fills the entire dashboard area */}

        {/* ✅ Error Message */}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-red-500">Error fetching data</p>
          </div>
        )}

        <div className="grid grid-cols-6 gap-2 ">
          <Input
            placeholder="Search Trade Tips"
            value={searchInput}
            onChange={e => onHandleSearch(e.target.value)}
            className="max-w-sm"
          />
          {filters.map(filter =>
            filter.filedType === 'select' ? (
              <>
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
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
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
        {isPending && (
          <div className="h-[700px] flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
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

export default TradeTips;
