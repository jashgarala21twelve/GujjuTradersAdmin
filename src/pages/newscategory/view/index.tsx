import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { onFormErrors } from '@/utils/helper';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useGetNewsCategoryByIdHook,
  useUpdateNewCategory,
} from '@/hooks/api/newsCategory';
import { Loader2 } from 'lucide-react';
import Toast from '@/components/toast/commonToast';

const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'Category Name is required' })
    .min(1, 'Category Name cannot be empty')
    .max(50, 'Category Name must be 50 characters or less')
    .trim(),
});

function ViewNewCategory() {
  const { id } = useParams();
  const router = useNavigate();

  console.log('New CAtegory By ID:>>', id);

  const { data, isPending, isLoading } = useGetNewsCategoryByIdHook(
    id as string
  );

  const onSuccessHandler = (data: { message: string }) => {
    router('/news/category');
    Toast('success', data?.message || 'Category Updated Successfully');
  };

  const { mutate: submit, isPending: updatePending } =
    useUpdateNewCategory(onSuccessHandler);

  const onSubmit = (values: any) => {
    const payload = {
      categoryId: id as string,
      data: {
        name: values.name,
      },
    };
    submit(payload);
  };

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const { reset } = form;

  useEffect(() => {
    const newCategoryByIdData = data?.data;
    if (newCategoryByIdData) {
      reset({
        name: newCategoryByIdData.name,
      });
    }
  }, [data?.data, reset, form]);

  return (
    <div className='container  '>
      <h1 className='text-2xl font-bold mb-6'>View & Edit News Category</h1>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader2 size={40} className='animate-spin text-[#2A9D90]' />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onFormErrors)}
            className='space-y-8 w-full max-w-5xl'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter News Category Name'
                        {...field}
                        className=''
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router('/news/category')}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={updatePending}>
                {updatePending ? 'Updating...' : 'Update Category'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ViewNewCategory;
