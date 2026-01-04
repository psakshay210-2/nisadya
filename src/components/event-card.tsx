'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { RegistrationForm } from './registration-form';
import type { Event } from '@/lib/types';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { eventCategories } from '@/lib/data';
import Link from 'next/link';
import { format, parse } from 'date-fns';

export function EventCard({ event }: { event: Event }) {
  const CategoryIcon = eventCategories[event.category]?.icon || eventCategories['Informal'].icon;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      // Assuming date is in MM/DD/YYYY format from the sheet
      const date = parse(dateString, 'MM/dd/yyyy', new Date());
      return format(date, 'dd MMMM yyyy');
    } catch (error) {
      console.error('Failed to parse date:', dateString, error);
      return dateString; // Fallback to original string
    }
  };

  const formattedStartDate = formatDate(event.startDate);
  const formattedEndDate = formatDate(event.endDate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-full w-full cursor-pointer overflow-hidden rounded-lg relative group aspect-[3/4]">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-headline text-2xl text-white drop-shadow-md">
              {event.title}
            </h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-start mb-2">
            <DialogTitle className="font-headline text-3xl">{event.title}</DialogTitle>
            <Badge variant="secondary" className="shrink-0">
              <CategoryIcon className="mr-1 h-3 w-3" />
              {event.category}
            </Badge>
          </div>
          <p className="text-sm font-bold text-primary">{formattedStartDate}{formattedEndDate && formattedEndDate !== formattedStartDate ? ` - ${formattedEndDate}` : ''}</p>
          <DialogDescription className='text-base pt-2'>{event.details}</DialogDescription>
        </DialogHeader>
        {event.registrationLink ? (
          <Button asChild>
            <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Register
            </Link>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Register</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  Register for {event.title}
                </DialogTitle>
                <DialogDescription>
                  Fill out the form below to register for this event.
                </DialogDescription>
              </DialogHeader>
              <RegistrationForm eventName={event.title} />
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
