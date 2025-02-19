import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'react-router-dom';
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

// Define Schema
const tradeTipSchema = z.object({
  entryRange: z.string().nonempty('Entry Range is required'),
  stopLoss: z.string().nonempty('Stop Loss is required'),
  description: z.string().optional(),
  tradeType: z.enum(['BUY', 'SELL']),
  tradeTerm: z.enum(['1', '2', '3']),
  active: z.boolean(),
  stockId: z.string().nonempty('Stock ID is required'),
  stockSymbol: z.string().nonempty('Stock Symbol is required'),
  stockName: z.string().nonempty('Stock Name is required'),
  exchange: z.string(),
  duration: z.string().nonempty('Duration is required'),
  targets: z
    .array(z.string().nonempty('Target is required'))
    .min(1, 'At least one target is required'),
  stockLogo: z.any().optional(),
});

const CreateTradeTip = () => {
  const { symbol } = useParams();
  const {
    mutate,
    data: stockSymbolResponse,
    isPending,
  } = useGetStockBySymbol();

  const {
    register,
    handleSubmit,
    setValue,

    control,
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
      targets: [''], // Initialize with one empty target
    },
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'targets',
  });

  useEffect(() => {
    mutate({ symbol });
  }, [symbol, mutate]);

  useEffect(() => {
    if (stockSymbolResponse) {
      setValue('stockId', stockSymbolResponse.data.token || '');
      setValue('stockSymbol', stockSymbolResponse.data.symbol || '');
      setValue('stockName', stockSymbolResponse.data.name || '');
      setValue('exchange', stockSymbolResponse.data.exch_seg || '');
    }
  }, [stockSymbolResponse, setValue]);
  // if (Object.keys(errors).length > 0) {
  //   console.log(errors, 'errors');
  //   const firstErrorKey = Object.keys(errors)[0]; // Get first error field
  //   const firstErrorMessage =
  //     errors[firstErrorKey]?.message || errors[firstErrorKey]?.root?.message;
  //   errors[firstErrorKey][0]?.message || 'Invalid input'; // Extract message

  //   Toast('destructive', firstErrorKey, firstErrorMessage, 1000);
  // }
  const onSubmit = data => {
    console.log('Form Data:', data);
  };
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('stockLogo', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <PageTitle title={symbol || 'Not Found'} /> */}

      <Card>
        <CardHeader>
          <CardTitle>Create Trade Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="tradeType"
                control={control}
                render={({ field }) => (
                  <div>
                    <label>Trade Type</label>
                    <Select {...field} onValueChange={field.onChange}>
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
                    <label>Trade Term</label>
                    <Select {...field} onValueChange={field.onChange}>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label>Entry Range</label>
                <Input {...register('entryRange')} placeholder="e.g., 54-56" />
                {errors.entryRange && (
                  <p className="text-red-500">{errors.entryRange.message}</p>
                )}
              </div>
              <div>
                <label>Stop Loss</label>
                <Input {...register('stopLoss')} type="number" />
                {errors.stopLoss && (
                  <p className="text-red-500">{errors.stopLoss.message}</p>
                )}
              </div>
              <div>
                <label>Duration</label>
                <Input {...register('duration')} />
                {errors.duration && (
                  <p className="text-red-500">{errors.duration.message}</p>
                )}
              </div>
            </div>
            {/* Targets Section */}
            <div>
              <div className="flex items-center gap-2">
                <label>Targets</label>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => append('')}
                >
                  <Plus className="h-5 w-5 mr-1" /> Add Target
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2 items-center">
                    <Input
                      {...register(`targets.${index}`)}
                      placeholder={`Target ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              {errors.targets && (
                <p className="text-red-500">
                  {errors.targets.message ||
                    errors.targets?.root?.message ||
                    errors.targets[0]?.message}
                </p>
              )}
            </div>
            {/* Stock Logo Upload */}
            <div>
              <label className="">Stock Logo</label>
              <div className="">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 rounded-md max-w-32 object-cover border "
                  />
                )}
              </div>
            </div>
            <div>
              <label>Description</label>
              <Textarea
                {...register('description')}
                placeholder="Enter trade description"
                className="h-24"
              />
            </div>

            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <label>Active</label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Button type="submit" className="w-full">
              Create Trade Tip
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTradeTip;
