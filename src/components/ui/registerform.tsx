import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { Label } from './label';

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must include at least one lowercase letter.',
      })
      .regex(/[0-9]/, {
        message: 'Password must include at least one number.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: { username: string }) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Label className="pb-5 text-lg w-full font-bold text-[#144066]">
          Register to Apptly
        </Label>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-4 text-[#144066]">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} className="h-11 w-80 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4 text-[#144066]">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="h-11 w-80 rounded-lg" />
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
                  {...field}
                  type="password"
                  className="h-11 w-80 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-4 text-[#144066]">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
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
          Register
        </Button>
      </form>
    </Form>
  );
};
