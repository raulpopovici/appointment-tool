import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: { username: string }) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Label className="pb-5 text-lg w-full font-bold text-[#144066]">
          Log in to Apptly
        </Label>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-4 text-[#144066]">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="h-11 w-80 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4 text-[#144066]">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  type="password"
                  className="h-11 w-80 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="loginButtons"
          className="w-full h-11 w-80 rounded-2xl mt-8"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
