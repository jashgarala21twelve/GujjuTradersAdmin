import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useAddMedia,
  useDeleteMediaAssetsHook,
  useGetMediaAssetsByIdHook,
} from "@/hooks/api/mediaAssets";
import Toast from "@/components/toast/commonToast";
import { Loader2, Trash } from "lucide-react";

function MediaAssetsHome() {
  const onSuccessHandler = (data: { message: string }) => {
    Toast("success", data?.message || "Faq created successfully");
    console.log("Faq created:", data);
  };

  const {
    mutate,
    isSuccess,
    isPending: isAdding,
  } = useAddMedia(onSuccessHandler);
  const {
    data,
    isPending: isMediaAssets,
    refetch,
  } = useGetMediaAssetsByIdHook("1");
  const {
    mutate: deleteAsset,
    isPending,
    isSuccess: isDeleted,
  } = useDeleteMediaAssetsHook(onSuccessHandler);
  const [deletedImageId, setDeletedImageId] = useState<string[]>([]);
  const [imageList, setImageList] = useState<
    { id: string; fileName: string }[]
  >([]);
  const [files, setFiles] = useState<File[] | null>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  useEffect(() => {
    if (isSuccess || isDeleted) {
      refetch();
      setFiles([]);
      setDeletedImageId([]);
    }
  }, [isSuccess, isDeleted]);

  useEffect(() => {
    setImageList(data?.data);
  }, [data?.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("assetFiles", file); // Append each file
    });

    formData.append("assetType", "1");

    mutate(formData);
  };

  const handleDelete = (id: string) => {
    setDeletedImageId((prev) => [...prev, id]);
    setImageList((prev) => prev.filter((image) => image._id !== id));
  };

  const handleDeleteImages = () => {
    const payload = {
      mediaAssetIds: deletedImageId,
    };

    deleteAsset(payload);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Home Media Banner</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload a File</CardTitle>
          <CardDescription>
            Select a file to upload and click the upload button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {files && (
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap">
                  {files.map((file, index) => (
                    <div key={index} className="flex">
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <div className="bg-green-800 h-full w-[1px] mx-2 rounded-full"></div>
                    </div>
                  ))}
                </div>
                {files.length > 0 && (
                  <Button type="submit" disabled={isAdding}>
                    {isAdding ? <p>Uploading...</p> : <p>Upload</p>}
                  </Button>
                )}
              </div>
            )}
          </form>
        </CardContent>
        {isMediaAssets ? (
          <div className="flex justify-center pb-10">
            <Loader2 size={40} className="animate-spin text-[#2A9D90]" />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
              {imageList?.map((item) => (
                <div
                  key={item._id}
                  className="h-[200px] w-auto overflow-hidden relative"
                >
                  <img
                    src={item.fileName}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                  {/* Delete Icon */}
                  <div className="absolute top-2 right-3 text-white text-center py-2">
                    <div className="cursor-pointer">
                      <Trash
                        className="h-6 w-6 text-red-500 bg-white p-1 rounded-lg hover:bg-red-100"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {deletedImageId.length > 0 && (
              <div className="w-full flex justify-end p-2">
                <Button onClick={handleDeleteImages} disabled={isPending}>
                  {isPending ? <p>Deleting...</p> : <p>Delete</p>}
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

export default MediaAssetsHome;
