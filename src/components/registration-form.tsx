'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useToast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  college: z.string().min(3, { message: 'College name is required.' }),
});

export function RegistrationForm({ eventName }: { eventName: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      college: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log('Registration for', eventName, ':', values);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Registration Successful!',
        description: `You've been registered for ${eventName}.`,
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xs:space-y-5 sm:space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs xs:text-sm">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="min-h-[44px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs xs:text-sm">Email Address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} className="min-h-[44px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs xs:text-sm">College/University</FormLabel>
              <FormControl>
                <Input placeholder="University of Innovation" {...field} className="min-h-[44px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full min-h-[48px]" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm Registration'}
          <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
