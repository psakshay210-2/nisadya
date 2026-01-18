'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { RegistrationForm } from './registration-form';
import type { Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format, parse, isValid } from 'date-fns';

export function EventCard({ event }: { event: Event }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = parse(dateString, 'dd/MM/yyyy', new Date());
      // Check if the parsed date is valid
      if (!isValid(date)) {
        console.warn('Invalid date detected:', dateString);
        return dateString;
      }
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
          <div className="absolute bottom-0 left-0 p-3 xs:p-4 sm:p-5">
            <h3 className="font-headline text-lg xs:text-xl sm:text-2xl text-white drop-shadow-md">
              {event.title}
            </h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] xs:max-w-[92vw] sm:max-w-[85vw] md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl xs:text-2xl sm:text-fluid-3xl mb-2">{event.title}</DialogTitle>
          <p className="text-xs xs:text-sm font-bold text-primary">{formattedStartDate}{formattedEndDate && formattedEndDate !== formattedStartDate ? ` - ${formattedEndDate}` : ''}</p>
          <DialogDescription className='text-xs xs:text-sm sm:text-base pt-2'>{event.details}</DialogDescription>
        </DialogHeader>
        {event.registrationLink ? (
          <Button asChild className="w-full min-h-[44px]">
            <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Register
            </Link>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full min-h-[44px]">Register</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[96vw] xs:max-w-[92vw] sm:max-w-[85vw] md:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-headline text-lg xs:text-xl sm:text-2xl">
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
