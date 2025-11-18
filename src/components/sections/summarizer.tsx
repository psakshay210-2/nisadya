'use client';

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleSummarize } from '@/app/actions';
import { Bot, Sparkles } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const SummarizerSchema = z.object({
  eventDetails: z.string().min(50, { message: 'Please enter at least 50 characters.' }),
});

type SummarizerFormValues = z.infer<typeof SummarizerSchema>;

export function Summarizer() {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<SummarizerFormValues>({
    resolver: zodResolver(SummarizerSchema),
  });

  const onSubmit: SubmitHandler<SummarizerFormValues> = async (data) => {
    setIsLoading(true);
    setSummary(null);
    setError(null);
    try {
      const result = await handleSummarize(data);
      if (result && result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error('Failed to generate summary.');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="summarizer" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="mb-12 text-center">
           <h2 className="font-headline text-4xl font-bold md:text-5xl flex items-center justify-center gap-2">
            <Sparkles className="h-10 w-10 text-accent"/>
            AI Event Summarizer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Paste any event description and let our AI generate a short, punchy summary for you.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="eventDetails"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Paste your event details below</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="e.g., Join us for an exciting 2-day workshop on the future of AI..."
                                        className="min-h-[200px] resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Generating...' : 'Summarize'}
                                <Bot className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Generated Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    {isLoading && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    )}
                    {error && <p className="text-destructive">{error}</p>}
                    {summary && <p className="text-muted-foreground">{summary}</p>}
                    {!summary && !isLoading && !error && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <Bot className="h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground mt-4">Your AI-generated summary will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
