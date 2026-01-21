'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { RegistrationForm } from './registration-form';
import type { Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format, parse, isValid } from 'date-fns';
import { Calendar, ArrowRight } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
  const formatFullDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = parse(dateString, 'dd/MM/yyyy', new Date());
      if (!isValid(date)) {
        console.warn('Invalid date detected:', dateString);
        return dateString;
      }
      return format(date, 'dd MMMM yyyy');
    } catch (error) {
      console.error('Failed to parse date:', dateString, error);
      return dateString;
    }
  };

  const formatShortDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    try {
      const date = parse(dateString, 'dd/MM/yyyy', new Date());
      if (!isValid(date)) return dateString;
      return format(date, 'do MMM');
    } catch (error) {
      return dateString;
    }
  };

  const formattedFullStartDate = formatFullDate(event.startDate);
  const formattedFullEndDate = event.endDate ? formatFullDate(event.endDate) : '';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full w-full cursor-pointer overflow-hidden relative group border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
          <CardHeader className="p-0 relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {event.imageUrl && (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
             <CardTitle className="font-headline text-lg sm:text-xl text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                {event.title}
             </CardTitle>
             <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-3 flex-grow">
                {event.description}
             </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-gray-300">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">{formatShortDate(event.startDate)}</span>
            </div>
            <span className="text-primary font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] xs:max-w-[92vw] sm:max-w-[85vw] md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl xs:text-2xl sm:text-fluid-3xl mb-2">{event.title}</DialogTitle>
          <p className="text-xs xs:text-sm font-bold text-primary">{formattedFullStartDate}{formattedFullEndDate && formattedFullEndDate !== formattedFullStartDate ? ` - ${formattedFullEndDate}` : ''}</p>
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
