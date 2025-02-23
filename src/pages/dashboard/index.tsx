import { useEffect } from "react";
import { useSyncDB } from "@/hooks/api/useSyncDB";
import { convertToFormData } from "@/utils/helper";
import { CircleLoading } from "@/components/loader";
import DataTable from "@/components/DataTable";
import Loader from "@/components/loader/loader";
import PageTitle from "@/components/pageTitle";

const DashBoard = () => {
  return (
    <div className="flex flex-col flex-1 h-full">
      <PageTitle title="Dashboard" />

      {/* ✅ Loader now fills the entire dashboard area */}
      {/* {isPending && <Loader />} */}

      {/* ✅ Error Message */}
      {/* {isError && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error fetching data</p>
        </div>
      )} */}

      {/* ✅ Data Display */}

      <h1>Coming Soon</h1>
    </div>
  );
};

export default DashBoard;
