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

// Define the maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Define accepted image types
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const createNewsSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be 100 characters or less')
    .trim(),
  categoryId: z
    .string({ required_error: 'Category is required' })
    .min(1, 'Please select a category'),
  image: z.any().optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be 1000 characters or less')
    .trim(),
});

type FormValues = z.infer<typeof createNewsSchema>;

export function EditViewNews() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useNavigate();
  const { id } = useParams();

  const onSuccessHandler = (data: any) => {
    Toast('success', data?.message || 'News created successfully');
    console.log('News created:', data);
    router('/news');
  };

  const { data } = useGetNewsCategory();
  const { data: newsData, isLoading } = useGetNewsByIdHook(id as string);
  const { mutate: updateNews, isPending } = useUpdateNews(onSuccessHandler);

  const form = useForm<FormValues>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: '',
      categoryId: '',
      description: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    const newsListData = newsData?.data;
    if (newsListData) {
      reset({
        title: newsListData.title,
        categoryId: newsListData.newsCategory._id,
        description: newsListData.description,
        image: newsListData.thumbnailUrl,
      });
      setImagePreview(newsListData.thumbnailUrl);
    }
  }, [newsData?.data, form]);

  const categoryItems = data?.data || [];

  const handleFinish = async (data: FormValues) => {
    console.log(data, 'dataaaa');
    let payload: {
      title: string;
      categoryId: string;
      description: string;
      thumbnailUrl?: File;
    } = {
      title: data.title,
      categoryId: data.categoryId,
      description: data.description,
    };
    if (Object.prototype.toString.call(data.image) === '[object FileList]') {
      payload.thumbnailUrl = data.image[0] as File;
    }

    const formData = convertToFormData(payload);

    const updatedPayload = {
      newsId: id,
      data: formData,
    };

    updateNews(updatedPayload);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    form.setValue('image', undefined as any);
  };

  return (
    <div className='container max-w-5xl p-6'>
      <h1 className='text-2xl font-bold mb-6'>View & Edit News Article</h1>
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter news title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      key={field.value}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryItems.map(
                          (category: { _id: string; name: string }) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='image'
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className='space-y-4'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleImageChange(e);
                        }}
                        {...rest}
                      />

                      {imagePreview && (
                        <div className='relative w-full max-w-xs'>
                          <img
                            src={imagePreview || '/placeholder.svg'}
                            alt='Preview'
                            className='rounded-md max-h-48 object-contain border border-border'
                          />
                          <Button
                            type='button'
                            variant='destructive'
                            size='icon'
                            className='absolute top-2 right-2 h-6 w-6'
                            onClick={clearImagePreview}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a JPG, PNG or WebP image (max 5MB)
                  </FormDescription>
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
                      placeholder='Enter news description'
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
                onClick={() => router('/news')}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Updating...' : 'Update News'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
