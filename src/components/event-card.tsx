'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { RegistrationForm } from './registration-form';
import type { Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format, parse, isValid } from 'date-fns';
import { Calendar, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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

  const formattedFullStartDate = formatFullDate(event.startDate);
  const formattedFullEndDate = event.endDate ? formatFullDate(event.endDate) : '';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer overflow-hidden relative group border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 rounded-2xl aspect-[9/14]">
          <div className="relative h-full w-full">
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-semibold flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] sm:max-w-4xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh]">
          {/* Left Side: Image */}
          <div className="relative h-64 md:h-full w-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col p-6 sm:p-8">
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <DialogHeader className="text-left mb-4">
                <DialogTitle className="font-headline text-xl sm:text-2xl lg:text-3xl mb-2">{event.title}</DialogTitle>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedFullStartDate}{formattedFullEndDate && formattedFullEndDate !== formattedFullStartDate ? ` - ${formattedFullEndDate}` : ''}</span>
                </div>
              </DialogHeader>
              <DialogDescription className='text-sm sm:text-base text-muted-foreground'>
                {event.details || event.description}
              </DialogDescription>
            </ScrollArea>
            <DialogFooter className="mt-auto pt-6 border-t border-border">
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
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
