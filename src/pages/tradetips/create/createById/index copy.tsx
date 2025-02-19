import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'react-router-dom';
import { useGetStockBySymbol } from '@/hooks/api/stocks/useStocks';
import PageTitle from '@/components/pageTitle';

const tradeTipSchema = z.object({
  tradeType: z.enum(['BUY', 'SELL']),
  duration: z.enum(['INTRADAY', 'SWING', 'POSITIONAL']),
  entryRange: z.string().min(1, 'Entry range is required'),
  stopLoss: z.string().min(1, 'Stop loss is required'),
  description: z.string().optional(),
  active: z.boolean(),
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
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tradeTipSchema),
    defaultValues: {
      tradeType: 'BUY',
      duration: 'INTRADAY',
      entryRange: '',
      stopLoss: '',
      description: '',
      active: false,
    },
  });

  useEffect(() => {
    mutate({ symbol });
  }, [symbol, mutate]);

  const onSubmit = data => {
    console.log('Form data:', data);
  };

  return (
    <div className="space-y-6">
      <PageTitle title={symbol || 'Not Found'} />

      <Card>
        <CardHeader>
          <CardTitle>Create Trade Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register('stockId')}
                  disabled
                  placeholder="Stock ID"
                />
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
                name="duration"
                control={control}
                render={({ field }) => (
                  <div>
                    <label>Duration</label>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INTRADAY">Intraday</SelectItem>
                        <SelectItem value="SWING">Swing</SelectItem>
                        <SelectItem value="POSITIONAL">Positional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
