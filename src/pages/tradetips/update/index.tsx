import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStockBySymbol } from '@/hooks/api/stocks/useStocks';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Toast from '@/components/toast/commonToast';
import {
  useGetTradeTip,
  useUpdateTradeTip,
} from '@/hooks/api/tradetips/useTradeTips';
import { convertToFormData } from '@/utils/helper';
import dayjs from 'dayjs';
import { TRADE_TYPE } from '@/utils/constants';
// Define Schema
const tradeTipSchema = z.object({
  entryRange: z.string().nonempty('Entry Range is required'),
  stopLoss: z.string().nonempty('Stop Loss is required'),
  description: z.string().optional(),
  tradeType: z.enum(['BUY', 'SELL']),
  tradeTerm: z.enum(['1', '2', '3']),
  active: z.boolean(),
  // stockId: z.string().nonempty("Stock ID is required"),
  // stockSymbol: z.string().nonempty("Stock Symbol is required"),
  // stockName: z.string().nonempty("Stock Name is required"),
  // exchange: z.string(),
  duration: z.string().nonempty('Duration is required'),
  targets: z
    .array(z.string().nonempty('Target is required'))
    .min(1, 'At least one target is required'),
  stockLogo: z.any().optional(),
  deleteStockLogo: z.boolean().optional(),
  planId: z.number(),
});

interface ImageState {
  currentImage: string | null;
  originalImage: string | null;
  isModified: boolean;
  file: File | null;
}

const UpdateTradeTip = () => {
  const { tradeTipId } = useParams();
  const [tradeTipData, setTradeTipData] = useState({});
  const {
    data: tradeTipResponse,
    isPending,
    isError: isTradeTipError,
    error: tradeTipError,
    refetch: refetchTradeTip,
  } = useGetTradeTip(tradeTipId as string);

  const onSuccessTradeTipUpdate = data => {
    Toast('success', data?.message || 'Trade Tip Updated Successfully');
    refetchTradeTip();
  };

  const { mutate: updateTradeTip, isPending: updateTradeTipPending } =
    useUpdateTradeTip(onSuccessTradeTipUpdate);
  const [imageState, setImageState] = useState<ImageState>({
    currentImage: null,
    originalImage: null,
    isModified: false,
    file: null,
  });

  const {
    register,
    handleSubmit,
    setValue,

    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tradeTipSchema),
    defaultValues: {
      entryRange: '',
      stopLoss: '',
      description: '',
      tradeType: 'BUY',
      tradeTerm: '1',
      active: false,
      stockId: '',
      stockSymbol: '',
      stockName: '',
      exchange: '',
      duration: '',
      targets: [''],
      deleteStockLogo: false,
      planId: 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'targets',
  });

  useEffect(() => {
    if (tradeTipResponse?.data) {
      setTradeTipData(tradeTipResponse?.data);
      // const { token, symbol, name, exch_seg, stockLogo } =
      //   tradeTipResponse.data;
      // const {
      //   stockId,
      //   stockSymbol,
      //   stockName,
      //   exchange,
      //   stockLogo,
      //   tradeType,
      //   tradeTerm,
      //   entryRange,
      //   stopLoss,
      //   duration,
      //   description,
      //   active,
      //   targets,
      // } = tradeTipResponse.data;
      // console.log(tradeTipResponse.data);
      // console.log(tradeType, "tradeType");
      // setValue("stockId", stockId || "");
      // setValue("stockSymbol", stockSymbol || "");
      // setValue("stockName", stockName || "");
      // setValue("exchange", exchange || "");
      // setValue("tradeType", tradeType || "");
      // setValue("tradeTerm", tradeTerm || "");
      // setValue("entryRange", entryRange || "");
      // setValue("stopLoss", stopLoss || "");
      // setValue("duration", duration || "");
      // setValue("description", description || "");
      // setValue("active", active || false);
      // setValue("targets", targets);
      const tipData = tradeTipResponse.data;
      console.log(tipData, 'tipData');
      reset({
        stockId: tipData.stockId || '',
        stockSymbol: tipData.stockSymbol || '',
        stockName: tipData.stockName || '',
        exchange: tipData.exchange || '',
        tradeType: tipData.tradeType || 'BUY', // Provide default values
        tradeTerm: tipData.tradeTerm || '1', // Provide default values
        entryRange: tipData.entryRange || '',
        stopLoss: tipData.stopLoss || '',
        duration: tipData.duration || '',
        description: tipData.description || '',
        active: tipData.active || false,
        targets: tipData.targets || [''],
        planId: 1,
      });

      if (tipData.stockLogo) {
        setImageState({
          currentImage: tipData.stockLogo,
          originalImage: tipData.stockLogo,
          isModified: false,
          file: null,
        });
      }
    }
  }, [tradeTipResponse, setValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageState(prev => ({
        currentImage: newImageUrl,
        originalImage: prev.originalImage,
        isModified: true,
        file: file,
      }));
      setValue('stockLogo', file);
      setValue('deleteStockLogo', false);
    }
  };

  const handleRemoveImage = () => {
    setImageState({
      currentImage: null,
      originalImage: null,
      isModified: false,
      file: null,
    });
    setValue('deleteStockLogo', true);
  };

  const onSubmit = data => {
    const formData = convertToFormData(data);
    updateTradeTip({ tradeTipId, data: formData });
  };
  const onError = errors => {
    console.log('Validation Errors:', errors);

    // Extract the first error message dynamically
    const firstError = Object.values(errors)?.[0]?.message;
    if (firstError) {
      Toast('destructive', firstError);
    }
  };
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isTradeTipError) {
    return <div>{tradeTipError.message}</div>;
  }
  return (
    <div className="space-y-6">
      <Card className="">
        <CardHeader className="space-y-4 md:space-y-0 md:flex md:flex-row md:items-center">
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* Stock Symbol and Status */}
              <div className="flex items-center gap-3">
                <p className="text-lg md:text-xl">
                  <span className="bg-secondary p-2 rounded-md font-medium">
                    {tradeTipData?.stockSymbol}
                  </span>
                </p>
                {tradeTipData?.active === true ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </div>

              {/* Timestamps */}
              <div className="space-y-1 text-sm text-muted-foreground md:ml-auto">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Created:</span>
                  {dayjs(tradeTipData.createdAt).format('MMM D, YYYY, h:mm A')}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Updated:</span>
                  {dayjs(tradeTipData.updatedAt).format('MMM D, YYYY, h:mm A')}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 relative"
          >
            {/* Stock Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...register('stockId')} disabled placeholder="Stock ID" />
              <Input
                {...register('stockSymbol')}
                disabled
                placeholder="Symbol"
              />
              <Input
                {...register('stockName')}
                disabled
                placeholder="Stock Name"
              />
              <Input
                {...register('exchange')}
                disabled
                placeholder="Exchange"
              />
            </div>

            {/* Trade Type and Term Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="tradeType"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block mb-2">Trade Type</label>
                    <Select
                      key={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select trade type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BUY">Buy</SelectItem>
                        <SelectItem value="SELL">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <Controller
                name="tradeTerm"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block mb-2">Trade Term</label>
                    <Select
                      key={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">SHORT TERM</SelectItem>
                        <SelectItem value="2">MEDIUM TERM</SelectItem>
                        <SelectItem value="3">LONG TERM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            {/* Trade Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Entry Range</label>
                <Input {...register('entryRange')} placeholder="e.g., 54-56" />
                {errors.entryRange && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.entryRange.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Stop Loss</label>
                <Input {...register('stopLoss')} type="number" />
                {errors.stopLoss && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stopLoss.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Duration</label>
                <Input {...register('duration')} />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>

            {/* Targets Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block">Targets</label>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append('')}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Target
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`targets.${index}`)}
                      placeholder={`Target ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              {errors.targets && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.targets.message ||
                    errors.targets?.root?.message ||
                    errors.targets[0]?.message}
                </p>
              )}
            </div>

            {/* Stock Logo Section */}
            <div>
              <label className="block mb-2">Stock Logo</label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                {imageState.currentImage && (
                  <div className="flex items-start space-x-4">
                    <img
                      src={imageState.currentImage}
                      alt="Stock Logo"
                      className="h-32 w-32 object-cover rounded-md border"
                    />
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleRemoveImage}
                        className="w-full"
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <label className="block mb-2">Description</label>
              <Textarea
                {...register('description')}
                placeholder="Enter trade description"
                className="h-24"
              />
            </div>

            {/* Active Status Section */}
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label>Active</label>
                </div>
              )}
            />

            {/* Submit Button */}
            <div className="grid grid-cols-none gap-5 md:grid-cols-2">
              <Button
                type="submit"
                className="w-full text-white font-semibold"
                variant="default"
              >
                {updateTradeTipPending ? 'Updating...' : 'Update Trade Tip'}
              </Button>
              <Button
                type="submit"
                className="w-full text-white font-semibold"
                variant="destructive"
              >
                Delete Trade Tip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateTradeTip;
