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
import { Loader2 } from "lucide-react";

import { useCategory, getNewsCategory, useNews } from '@/hooks/api/news'

const NewsCategory = () => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: null,
    totalCount: null,
  });

  const { data: apiResponse, isLoading, isError, isSuccess, refetch } = getNewsCategory()

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
      setData(Data)
    }
  }, [apiResponse])

  const columns = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="font-md text-white rounded-md w-max px-2">
          {row.getValue('_id')}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-md text-white  rounded-md w-max px-2">
          {row.getValue('name')}
        </div>
      ),
    },
  ]



  if (isLoading) {
    return <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Fetching News...
    </>
  };
  if (isError) return <div>Error loading categories.</div>;


  return <div>
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
        </div>

        <Button asChild>
                    <Link to="/news/category/create">Create New Category</Link>
        </Button>
        </div>
        
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-red-500">Error fetching News data</p>
          </div>
        )}
        {isSuccess && (
          <DynamicDataTable
            data={data}
            columns={columns}
          />
        )}
    </div>
  </div>;
};



export default NewsCategory;
