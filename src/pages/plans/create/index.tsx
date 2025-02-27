// PlanForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
import { useCreatePlan } from '@/hooks/api/plans';
import Toast from '@/components/toast/commonToast';
import { useNavigate } from 'react-router-dom';
import { onFormErrors } from '@/utils/helper';

// Define the plan schema with Zod
const planSchema = z.object({
  planKey: z
    .string()
    .nonempty('Plan Key is Required')
    .min(2, { message: 'Plan key must be at least 2 characters.' }),
  name: z
    .string()
    .nonempty('Plan Name is Required')
    .min(4, { message: 'Plan name must be at least 2 characters.' }),
  price: z.object({
    monthly: z
      .number()
      .nonnegative()
      .min(0, { message: 'Monthly price must be a positive number.' }),
    yearly: z
      .number()
      .nonnegative()
      .min(0, { message: 'Yearly price must be a positive number.' }),
    discount: z
      .number()
      .min(0)
      .max(100, { message: 'Discount must be between 0 and 100.' })
      .optional(),
  }),
  features: z.array(z.number()),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters.' }),
  trialAvailable: z.boolean().default(false),
  platformAccess: z
    .array(z.number())
    .nonempty('Atleast one platform access required'),
  webinars: z.boolean(),
  responseTime: z.string().nonempty('Response Time is Required'),
  isActive: z.boolean(),
});

// Define the form component
const PlanForm = ({ existingPlan = null }) => {
  const navigate = useNavigate();
  const onSuccessCreatePlan = data => {
    Toast('success', data?.message || 'Plan Created Successfully');
    navigate('/plans');
  };
  const { mutate: createPlan, isPending: isCreatePlanPending } =
    useCreatePlan(onSuccessCreatePlan);

  // Initialize the form with default values or existing plan data
  const form = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: existingPlan || {
      planKey: '',
      name: '',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [1, 2, 3],
      description: '',
      trialAvailable: false,
      platformAccess: [],
      webinars: false,
      responseTime: '',
      isActive: false,
    },
  });
  console.log(form.formState.errors, 'errors');

  // Form submission handler
  function onSubmit(data) {
    // console.log(data, 'data');
    createPlan(data);
  }

  const handleDiscount = () => {
    const yearly = form.getValues().price.yearly;
    const monthly = form.getValues().price.monthly;
    if (yearly && monthly) {
      const discount = (1 - yearly / (monthly * 12)) * 100;
      form.setValue('price.discount', Math.max(0, discount.toFixed(2))); // Ensure discount is not negative
    } else {
      form.setValue('price.discount', 0);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormErrors)}
        className="space-y-8 w-full max-w-5xl"
      >
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Plan Key */}
          <FormField
            control={form.control}
            name="planKey"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Plan Key</FormLabel>
                <FormControl>
                  <Input placeholder="UNIQUE_PLAN_KEY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Plan Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input placeholder="Starter Trader" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Price */}
          <FormField
            control={form.control}
            name="price.monthly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={e => {
                      field.onChange(parseFloat(e.target.value));
                      handleDiscount();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Yearly Price */}
          <FormField
            control={form.control}
            name="price.yearly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yearly Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={e => {
                      field.onChange(parseFloat(e.target.value));
                      handleDiscount();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="price.discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="number"
                    min="0"
                    max="100"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trial Price */}
          {/* <FormField
            control={form.control}
            name="trialPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trial Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Referral Bonus */}
          {/* <FormField
            control={form.control}
            name="referralBonus"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Referral Bonus ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Description */}
          <FormField
            control={form.control}
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
            <FormLabel>Features</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {FEATURE_OPTIONS.map(feature => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name="features"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(feature.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, feature.id])
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
          </div>

          {/* Platform Access */}
          <div className="md:col-span-2">
            <FormLabel>Platform Access</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {PLAN_PLATFORM_ACCESS_OPTIONS.map(platform => (
                <FormField
                  key={platform.id}
                  control={form.control}
                  name="platformAccess"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(platform.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, platform.id])
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
          </div>

          {/* Trial Available */}
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
            name="responseTime"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Response Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
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

        {/* Trial Available */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <div className="">
                <FormLabel>Plan Active</FormLabel>
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
        {/* Submit Button */}
        <Button type="submit" className="w-full md:w-auto">
          {isCreatePlanPending ? 'Creating.....' : 'Create Plan'}
        </Button>
      </form>
    </Form>
  );
};

export default PlanForm;
