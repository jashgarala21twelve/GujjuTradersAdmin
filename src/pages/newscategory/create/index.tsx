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

import { useNavigate } from 'react-router-dom';
import { onFormErrors } from '@/utils/helper';

import React from 'react'
import { useCategory } from '@/hooks/api/newsCategory'
import Toast from '@/components/toast/commonToast';

const createCategorySchema = z.object({
    name: z.string({ required_error: 'Category Name is required' })
        .min(1, 'Category Name cannot be empty')
        .max(50, 'Category Name must be 50 characters or less')
        .trim()
})
    

function CreateCategory() {
    const navigate = useNavigate();
    const onSuccessCreateCategory = data => {
        Toast('success', data?.message || 'Category Created Successfully');
        navigate('/news/category');
    };
    const { mutate: createcategory, isPending: isCreateCategory } = useCategory(onSuccessCreateCategory);

    //   const { mutate: createcategory , isPending: isCreateCategory } =
    //       useCategory(onSuccessCreateCategory);
    

      const form = useForm({
          resolver: zodResolver(createCategorySchema),
        defaultValues: {
          name: '',
        },
      });
    
    const onSubmit = async (data) => {
        console.log("data recieved",data);
        createcategory(data);
    };
  return (
      <div className="container  ">
          <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onFormErrors)} className="space-y-8 w-full max-w-5xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name='name' render={({ field }) => (
                          <FormItem>
                              <FormLabel>Category Name</FormLabel>
                              <FormControl>
                                  <Input
                                      placeholder="Enter Category Name"
                                      {...field}
                                      className=""
                                  />
                              </FormControl>
                          </FormItem>
                      )} />
</div>

                      <div className="flex justify-end space-x-4">
                          <Button
                              type="button"
                              variant="outline"
                              onClick={() => navigate('/news/category')}
                          >
                              Cancel
                          </Button>
                      <Button type="submit" disabled={isCreateCategory}>
                          {isCreateCategory ? 'Creating...' : 'Create Category'}
                                  </Button>
                      </div>
              </form>
          </Form>

</div>
  )
}

export default CreateCategory

