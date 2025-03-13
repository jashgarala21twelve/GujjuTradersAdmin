'use client';

import type React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCreateNews,
  useGetNewsByIdHook,
  useUpdateNews,
} from '@/hooks/api/news';
import { convertToFormData } from '@/utils/helper';
import { useGetNewsCategory } from '@/hooks/api/newsCategory';
import Toast from '@/components/toast/commonToast';
import { useNavigate, useParams } from 'react-router-dom';
import { reset } from 'canvas-confetti';
import { useGetFaqByIdHook, useUpdateFaq } from '@/hooks/api/faqs';

const createNewsSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be 100 characters or less')
    .trim(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be 1000 characters or less')
    .trim(),
});

type FormValues = z.infer<typeof createNewsSchema>;

export function FaqView() {
  const router = useNavigate();
  const { id } = useParams();

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'News created successfully');
    router('/faq');
  };

  const { data } = useGetNewsCategory();
  const { data: newsData, isLoading } = useGetFaqByIdHook(id as string);
  const { mutate: updateFaq, isPending } = useUpdateFaq(onSuccessHandler);

  const form = useForm<FormValues>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    const newsListData = newsData?.data;
    if (newsListData) {
      reset({
        title: newsListData.name,
        description: newsListData.description,
      });
    }
  }, [newsData?.data, form]);

  const handleFinish = async (data: FormValues) => {
    console.log('Hello');

    const updatedPayload = {
      faqId: id as string,
      data: { name: data?.title, description: data?.description },
    };

    updateFaq(updatedPayload);
  };

  return (
    <div className='container max-w-5xl p-6'>
      <h1 className='text-2xl font-bold mb-6'>View & Edit FAQ's</h1>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader2 size={40} className='animate-spin text-[#2A9D90]' />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFinish)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter FAQ question' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter FAQ answer'
                      className='min-h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router('/faq')}
              >
                Cancel
              </Button>
              <Button type='submit'>
                {isPending ? 'Updating...' : 'Update FAQ'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
