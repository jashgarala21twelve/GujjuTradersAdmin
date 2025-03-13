'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateFaq } from '@/hooks/api/faqs';
import Toast from '@/components/toast/commonToast';
import { useNavigate } from 'react-router-dom';

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

export function CreateFaq() {
  const router = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'Faq created successfully');
    console.log('Faq created:', data);
    router('/faq');
  };

  const { mutate, isPending } = useCreateFaq(onSuccessHandler);

  const handleFinish = async (data: FormValues) => {
    console.log('DATA:>>', data);

    const payload = {
      name: data.title,
      description: data.description,
    };

    mutate(payload);
  };

  return (
    <div className='container max-w-5xl p-6'>
      <h1 className='text-2xl font-bold mb-6'>Create FAQ's</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFinish)} className='space-y-8'>
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
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Faq'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
