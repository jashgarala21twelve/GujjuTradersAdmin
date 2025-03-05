import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUPONS_DISCOUNT_TYPE } from '@/utils/constants';

import Toast from '@/components/toast/commonToast';
import { useNavigate, useParams } from 'react-router-dom';
import { onFormErrors } from '@/utils/helper';
import { useState, useEffect } from 'react';
import {
  useGetCoupon,
  useResetCoupon,
  useUpdateCoupon,
} from '@/hooks/api/coupons';
import AlertDialogComponent from '@/components/alertDialog/alertConfirmDialog';

// Define the update coupon validation schema (same as create coupon)
const updateCouponValidationSchema = z
  .object({
    couponCode: z
      .string({ required_error: 'Coupon Code is required' })
      .min(1, 'Coupon Code cannot be empty')
      .max(50, 'Coupon Code must be 50 characters or less')
      .toUpperCase()
      .trim(),
    discountValue: z
      .number({
        required_error: 'Discount Value is required',
        invalid_type_error: 'Discount Value must be a number',
      })
      .positive('Discount Value must be a positive number'),
    discountType: z
      .string({ required_error: 'Discount Type is required' })
      .refine(value => Object.values(COUPONS_DISCOUNT_TYPE).includes(value), {
        message: `Invalid Discount Type | Allowed [${Object.values(
          COUPONS_DISCOUNT_TYPE
        )}]`,
      }),

    couponStartDate: z
      .string({ required_error: 'Start Date is required' })
      .refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid Start Date format',
      })
      .transform(date => new Date(date)),
    couponEndDate: z
      .string({ required_error: 'End Date is required' })
      .refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid End Date format',
      })
      .transform(date => new Date(date)),
    globalUsageLimit: z
      .number({
        invalid_type_error: 'Global Usage Limit must be a number',
      })
      .positive('Global Usage Limit must be a positive number'),
    isActive: z.boolean().default(true),
  })
  .strict();

// Define the update coupon component
const UpdateCoupon = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();

  // Fetch coupon details
  const {
    data: couponDataResponse,
    isLoading: isCouponLoading,
    isError: isCouponDataError,
    error: couponDataError,
    refetch: refetchCoupon,
  } = useGetCoupon(couponId);
  const onSuccessResetCoupon = data => {
    Toast('success', data?.message || 'Coupon Reset Successfully');
    // Optionally refetch coupon data or update local state
  };
  const { mutate: resetCoupon, isPending: isResetCouponPending } =
    useResetCoupon(onSuccessResetCoupon);
  // Update coupon mutation
  const onSuccessUpdateCoupon = data => {
    Toast('success', data?.message || 'Coupon Updated Successfully');
    // navigate('/coupons');
  };
  const { mutate: updateCoupon, isPending: isUpdateCouponPending } =
    useUpdateCoupon(onSuccessUpdateCoupon);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(updateCouponValidationSchema),
    defaultValues: {
      couponCode: '',
      discountValue: undefined,
      discountType: '',
      couponStartDate: '',
      couponEndDate: '',
      globalUsageLimit: undefined,
      isActive: true,
    },
  });
  const [couponData, setCouponData] = useState({});
  const [isResetCouponAlertOpen, setIsResetCouponAlertOpen] = useState(false);
  // Effect to set form values when coupon data is loaded
  useEffect(() => {
    const couponData = couponDataResponse?.data;
    if (couponData) {
      setCouponData(couponData);
      form.reset({
        couponCode: couponData.couponCode || '',
        discountValue: couponData.discountValue,
        discountType: couponData.discountType,
        couponStartDate: couponData.couponStartDate
          ? new Date(couponData.couponStartDate).toISOString().split('T')[0]
          : '',
        couponEndDate: couponData.couponEndDate
          ? new Date(couponData.couponEndDate).toISOString().split('T')[0]
          : '',
        globalUsageLimit: couponData.globalUsageLimit,
        isActive: couponData.isActive ?? true,
      });
    }
  }, [couponDataResponse, form.reset, refetchCoupon]);

  // Form submission handler
  function onSubmit(data) {
    // Ensure dates are in correct format
    const submitData = {
      ...data,
      couponStartDate: new Date(data.couponStartDate).toISOString(),
      couponEndDate: new Date(data.couponEndDate).toISOString(),
    };
    updateCoupon({
      couponId,
      data: submitData,
    });
  }

  // Loading state
  if (isCouponLoading) {
    return <div>Loading coupon details...</div>;
  }

  // Loading state
  if (isCouponDataError) {
    return (
      <div className="text-danger font-semibold">{couponDataError.message}</div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Update Coupon</h1>
      {/* Coupon Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4   mb-6 rounded-lg">
        <div className=" p-4 rounded-md shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">
            Global Usage Limit
          </h3>
          <p className="text-xl font-bold">
            {couponData?.globalUsageLimit || 'N/A'}
          </p>
        </div>
        <div className=" p-4 rounded-md shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">
            Total Used Count
          </h3>
          <p className="text-xl font-bold">{couponData.totalUsedCount || 0}</p>
        </div>
        <div className=" p-4 rounded-md shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">
            Current Used Count
          </h3>
          <p className="text-xl font-bold">{couponData.usedCount || 0}</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onFormErrors)}
          className="space-y-8 w-full max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coupon Code (Read-only) */}
            <FormField
              control={form.control}
              name="couponCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Coupon Code"
                      {...field}
                      className="uppercase"
                    />
                  </FormControl>
                  <FormDescription>
                    Coupon Code cannot be changed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Type */}
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    key={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Discount Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(COUPONS_DISCOUNT_TYPE).map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose whether discount is a percentage or fixed amount
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Value */}
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Discount Value"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch('discountType') ===
                    COUPONS_DISCOUNT_TYPE.PERCENTAGE
                      ? 'Percentage discount (0-100%)'
                      : 'Fixed amount discount'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Global Usage Limit */}
            <FormField
              control={form.control}
              name="globalUsageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Global Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Global Usage Limit"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of times this coupon can be used
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="couponStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Date from which the coupon becomes valid
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="couponEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Date until which the coupon is valid
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Active */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Coupon</FormLabel>
                    <FormDescription>
                      Toggle to activate or deactivate the coupon
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
          </div>
          {/* Submit and Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/coupons')}
            >
              Cancel
            </Button>

            {/* Reset Coupon Button with Confirmation Dialog */}
            <AlertDialogComponent
              title="Are you sure you want reset the coupon count?"
              description=""
              confirmText="Reset Coupon"
              cancelText="Cancel"
              onConfirm={() => {
                resetCoupon(couponId);
                refetchCoupon();
              }}
              confirmButtonClass="bg-primary  hover:bg-primary-600"
              open={isResetCouponAlertOpen}
              setOpen={setIsResetCouponAlertOpen}
            />
            <Button
              onClick={e => {
                e.preventDefault();
                setIsResetCouponAlertOpen(true);
              }}
              variant="secondary"
            >
              {isResetCouponPending ? 'Resting Coupon...' : 'Reset Coupon'}
            </Button>
            <Button type="submit" disabled={isUpdateCouponPending}>
              {isUpdateCouponPending ? 'Updating...' : 'Update Coupon'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateCoupon;
