import React from "react";
import DynamicDataTable from "@/components/datatable/datatable";
import PageTitle from "@/components/pageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { useDeleteFaqHook } from "@/hooks/api/faqs";
import CopyToClipboard from "@/components/copyToClipBoard";
import Toast from "@/components/toast/commonToast";
import { useGetNotificationList } from "@/hooks/api/notification";
import dayjs from "dayjs";

const Notifications = () => {
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
  } = useGetNotificationList();

  const onSuccessHandler = (data: any) => {
    Toast("success", data?.message || "News created successfully");
  };

  const { mutate: deleteFaq, isSuccess: isDeleteSuccess } =
    useDeleteFaqHook(onSuccessHandler);

  console.log("APIRESPONSE NOTIFICATION:>>", apiResponse);

  useEffect(() => {
    if (apiResponse) {
      const { data: Data } = apiResponse;
      // console.log("dosinvsiikvneroievnbewi", Data)
      setData(Data?.notificationList);
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
      accessorKey: "notification_title",
      header: "Title",
      cell: ({ row }: any) => (
        <div className="font-md rounded-md w-max px-2">
          <CopyToClipboard text={row.getValue("notification_title")} />
        </div>
      ),
    },
    {
      accessorKey: "notification_text",
      header: "Description",
      cell: ({ row }: any) => (
        <div className="font-md rounded-md w-max px-2">
          {row.getValue("notification_text")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: any) => (
        <div className="font-md rounded-md w-max px-2">
          {dayjs(row.getValue("createdAt")).format("DD MMMM, YYYY")}
        </div>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 size={40} className="animate-spin text-[#2A9D90]" />
        </div>
      ) : (
        <>
          <PageTitle title="Notifications List" />
          <div className="border rounded-xl p-4 flex flex-col min-h-[700px]">
            <div className="flex justify-between mb-4 gap-2">
              <div className="grid grid-cols-7 gap-3 flex-1">
                <Input
                  placeholder="Search Notification"
                  // value={searchInput}
                  // onChange={(e) => handleSearchChange(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Button asChild>
                <Link to="/notifications/create">Add New Notification</Link>
              </Button>
            </div>

            {isError && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-red-500">Error fetching News data</p>
              </div>
            )}
            {isSuccess && <DynamicDataTable data={data} columns={columns} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
