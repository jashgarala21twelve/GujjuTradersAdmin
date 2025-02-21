import DynamicDataTable from '@/components/datatable/datatable';
import { CircleLoading } from '@/components/loader';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTradeTipsList } from '@/hooks/api/tradetips/useTradeTips';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TradeTips = () => {
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
  } = useTradeTipsList({
    perPage: pagination.perPage,
    page: pagination.currentPage,
    search: search,
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
      cell: ({ row }) => <div>{row.getValue('_id')}</div>,
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
      cell: ({ row }) => <div>{row.getValue('stockSymbol')}</div>,
    },
    {
      accessorKey: 'stockName',
      header: 'Stock Name',
      cell: ({ row }) => <div>{row.getValue('stockName')}</div>,
    },
    {
      accessorKey: 'tradeType',
      header: 'Trade Type',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('tradeType')}</div>
      ),
    },
    {
      accessorKey: 'entryRange',
      header: 'Entry Range',
      cell: ({ row }) => <div>₹{row.getValue('entryRange')}</div>,
    },
    {
      accessorKey: 'stopLoss',
      header: 'Stop Loss',
      cell: ({ row }) => <div>₹{row.getValue('stopLoss')}</div>,
    },
    {
      accessorKey: 'targets',
      header: 'Targets',
      cell: ({ row }) => (
        <div className="space-x-1">
          {row.getValue('targets').map((target: string, index: number) => (
            <span
              key={index}
              className="bg-slate-100 text-black px-2 py-1 rounded"
            >
              ₹{target}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => <div>{row.getValue('duration')}</div>,
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
      accessorKey: 'stockLogo',
      header: 'Logo',
      cell: ({ row }) => (
        <img
          src={row.getValue('stockLogo')}
          alt="Stock Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
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
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const stock = row.original;
        return (
          <div className="flex w-full items-center justify-center space-x-3">
            <Link to={`/stocks/${stock._id}`}>View</Link>

            {row.getValue('active') ? (
              <Button
                variant={'destructive'}
                // onClick={() => setIsInactiveStockAlertOpen(true)}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                variant={'default'}
                // onClick={() => setActiveStockAlertOpen(true)}
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  const filters = [];
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
        <Input
          placeholder="Search Trade Tips"
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
    </div>
  );
};

export default TradeTips;
