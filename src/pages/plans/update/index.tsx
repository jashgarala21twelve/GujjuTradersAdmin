import { useGetPlan, useUpdatePlan } from '@/hooks/api/plans';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FEATURE_OPTIONS,
  PLAN_PLATFORM_ACCESS_OPTIONS,
  RESPONSE_TIME_OPTIONS,
} from '@/utils/constants';

import { onFormErrors } from '@/utils/helper';
import { Loader2 } from 'lucide-react';

const updatePlansValidationSchema = z.object({
  //   planKey: z
  //     .string()
  //     .nonempty('Plan Key is Required')
  //     .min(4, { message: 'Plan key must be at least 4 characters.' }),
  name: z
    .string({
      required_error: 'Plan Name is Required',
    })
    .nonempty('Plan Name is Required')
    .min(4, { message: 'Plan name must be at least 4 characters.' }),
  price: z.object({
    monthly: z
      .number({
        required_error: 'Monthly Plan Price is required',
        invalid_type_error: 'Monthly Plan Price must be a number',
      })
      .nonnegative({
        message: 'Monthly Plan Price must be a positive number',
      })
      .min(1, { message: 'Monthly Plan Price must be at least 1' }),

    yearly: z
      .number({
        required_error: 'Yearly Plan Price is required',
        invalid_type_error: 'Yearly Plan Price must be a number',
      })
      .nonnegative({
        message: 'Yearly Plan Price must be a positive number',
      })
      .min(1, { message: 'Yearly Plan Price must be at least 1' }),

    discount: z
      .number({
        required_error: 'Discount is required',
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, { message: 'Discount must be at least 0%' })
      .max(100, { message: 'Discount cannot exceed 100%' })
      .optional(),
  }),
  features: z.array(z.number()).nonempty('Features are required'),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters.' }),
  trialAvailable: z.boolean().default(false),
  platformAccess: z
    .array(z.number())
    .nonempty('Please provide platform access values'),
  webinars: z.boolean().default(false),
  responseTime: z.string().nonempty('Response Time is Required'),
  isActive: z
    .boolean({
      required_error: 'Is Plan Active Required [IsActive]',
    })
    .default(false),
});

const UpdatePlan = () => {
  const { planId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: planResponse,
    isPending,
    isError: isPlanResponseError,
    error: planResponseError,
    refetch: refetchPlan,
  } = useGetPlan(planId as string);

  const { mutate: updatePlan, isPending: isPlanUpdating } = useUpdatePlan(
    () => {
      // Success callback
      setIsLoading(false);
    }
  );

  const form = useForm({
    resolver: zodResolver(updatePlansValidationSchema),
    defaultValues: {
      planKey: '',
      name: '',
      price: {
        monthly: 0,
        yearly: 0,
        discount: 0,
      },
      features: [],
      description: '',
      trialAvailable: false,
      platformAccess: [],
      webinars: false,
      responseTime: '',
      isActive: false,
    },
  });

  const { control, handleSubmit, reset, setValue, getValues, formState } = form;

  useEffect(() => {
    if (planResponse?.data) {
      const planData = planResponse.data;

      // Properly map data to form fields
      reset({
        planKey: planData.planKey || '',
        name: planData.name || '',
        price: {
          monthly: planData.price?.monthly || 0,
          yearly: planData.price?.yearly || 0,
          discount: planData.price?.discount || 0,
        },
        features: planData.features || [],
        description: planData.description || '',
        trialAvailable: planData.trialAvailable || false,
        platformAccess: planData.platformAccess || [],
        webinars: planData.webinars || false,
        responseTime: planData.responseTime || '',
        isActive: planData.isActive || false,
      });

      setIsLoading(false);
    }
  }, [planResponse, reset]);

  const handleDiscount = () => {
    const yearly = getValues().price.yearly;
    const monthly = getValues().price.monthly;
    if (yearly && monthly) {
      const discount = (1 - yearly / (monthly * 12)) * 100;
      setValue('price.discount',  Math.max(0, discount.toFixed(2))); // Ensure discount is not negative and is a number
    } else {
      setValue('price.discount', 0);
    }
  };

  function onSubmit(data) {
    setIsLoading(true);
    const updateData = {
      planId,
      data,
    };
    updatePlan(updateData);
  }

  if (isPending && isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isPlanResponseError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading plan: {planResponseError?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onFormErrors)}
        className="space-y-8 w-full max-w-5xl"
      >
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Plan Key */}
          <FormField
            disabled
            control={control}
            name="planKey"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Plan Key</FormLabel>
                <FormControl>
                  <Input placeholder="UNIQUE_PLAN_KEY" {...field} />
                </FormControl>
                <FormDescription>
                  A unique identifier for this plan (e.g., BASIC_PLAN)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plan Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input placeholder="Starter Trader" {...field} />
                </FormControl>
                <FormDescription>Display name for this plan</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Price */}
          <FormField
            control={control}
            name="price.monthly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Price (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={e => {
                      field.onChange(parseFloat(e.target.value));
                      setTimeout(handleDiscount, 100); // Small delay to ensure value is updated
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Yearly Price */}
          <FormField
            control={control}
            name="price.yearly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yearly Price (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={e => {
                      field.onChange(parseFloat(e.target.value));
                      setTimeout(handleDiscount, 100); // Small delay to ensure value is updated
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={control}
            name="price.discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (₹)</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="number"
                    min="0"
                    max="100"
                    {...field}
                    value={field.value || 0}
                  />
                </FormControl>
                <FormDescription>
                  Auto-calculated based on monthly and yearly prices
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Best for beginner traders looking to get started."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features */}
          <div className="md:col-span-2">
            <FormField
              control={control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {FEATURE_OPTIONS.map(feature => (
                      <FormField
                        key={feature.id}
                        control={control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.id)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          feature.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== feature.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {feature.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Platform Access */}
          <div className="md:col-span-2">
            <FormField
              control={control}
              name="platformAccess"
              render={() => (
                <FormItem>
                  <FormLabel>Platform Access</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {PLAN_PLATFORM_ACCESS_OPTIONS.map(platform => (
                      <FormField
                        key={platform.id}
                        control={control}
                        name="platformAccess"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(platform.id)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          platform.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== platform.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {platform.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Trial Available */}
          <FormField
            control={control}
            name="trialAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Trial Available</FormLabel>
                  <FormDescription>
                    Enable trial option for this plan
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Webinars */}
          <FormField
            control={control}
            name="webinars"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Webinars</FormLabel>
                  <FormDescription>
                    Include webinar access with this plan
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Response Time */}
          <FormField
            control={control}
            name="responseTime"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Response Time</FormLabel>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select response time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(RESPONSE_TIME_OPTIONS).map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Plan Active */}
        <FormField
          control={control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Plan Active</FormLabel>
                <FormDescription>
                  Deactivated plans won't be visible to users
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isPlanUpdating || !formState.isDirty}
          >
            {isPlanUpdating ? 'Updating...' : 'Update Plan'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePlan;
