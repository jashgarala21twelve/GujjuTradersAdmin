import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect, useState } from 'react';
import { getSocial, useSocialLink } from "@/hooks/api/socialLinks"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Toast from '@/components/toast/commonToast';
import { useNavigate } from 'react-router-dom';
import { onFormErrors } from '@/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from "lucide-react";

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

const SocialLinks = () => {
  const navigate = useNavigate();
  const onSuccessCreateCoupon = data => {
    Toast('success', data?.message || 'Social link Updated Successfully');
    navigate('/social-links');
  };
  // const { mutate: useSocialLink, isPending: IsSociallinkCreating } = useSocialLink(onSuccessCreateCoupon)
  const { mutate: useSocialLinkMutation, isPending: isSocialLinkCreating } = useSocialLink(onSuccessCreateCoupon);

  const formSchema = z.object({
    fb: z.string().url({ message: "Invalid Facebook URL" }),
    insta: z.string().url({ message: "Invalid Instagram URL" }),
    telegram: z.string().url({ message: "Invalid Telegram URL" }),
    whatsapp: z.string().url({ message: "Invalid WhatsApp URL" }),
    contact_phone: z
      .string()
      .min(10, { message: "Must be at least 10 digits" })
      .max(15, { message: "Cannot exceed 15 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fb: '',
      insta: '',
      telegram: '',
      whatsapp: '',
      contact_phone: '',
    },
  });
  const onSubmit = (formData) => {
    console.log('Submitted Data:', formData);
    useSocialLinkMutation(formData)
  };

  const [data, setData] = useState(null)

  const [updatedata, setUpdateData] = useState({
    fb: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  })
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = getSocial();

  useEffect(() => {
    if (isSuccess && apiResponse && JSON.stringify(data) !== JSON.stringify(apiResponse)) {
      console.log("Successfully", apiResponse?.data);
      setData(apiResponse?.data)
      console.log('data', data)
      form.reset(apiResponse?.data)
    }
  }, [isSuccess, apiResponse, form])


  if (isLoading) {
    return <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Fetching Social Links...
    </>
  }
  return <div className='container'>
    <h1 className="text-2xl font-bold mb-6">SocialLinks</h1>
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* {facebook} */}
          <FormField
            control={form.control}
            name='fb'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='insta'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='telegram'
            render={({ field }) => (
              <FormItem>
                <FormLabel>telegram URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='whatsapp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>whatsapp</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact_phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>contact_phone</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <div className="flex justify-left space-x-4">

          <Button type='submit' disabled={isSocialLinkCreating}>  {isSocialLinkCreating ? 'Submitting...' : 'Submit'}</Button>
        </div>
      </form>

    </Form>

  </div>;
};

export default SocialLinks;
