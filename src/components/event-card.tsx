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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { eventCategories } from '@/lib/data';

export function EventCard({ event }: { event: Event }) {
  const placeholder = PlaceHolderImages.find((p) => p.id === event.imageId);
  const CategoryIcon = eventCategories[event.category].icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-full w-full cursor-pointer overflow-hidden rounded-lg relative group aspect-[3/4]">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={placeholder.imageHint}
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
          <p className="text-sm font-bold text-primary">{event.date}</p>
          <DialogDescription className='text-base pt-2'>{event.details}</DialogDescription>
        </DialogHeader>
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
                Fill out the form below to register for this event. Deadline: 2
                days before event.
              </DialogDescription>
            </DialogHeader>
            <RegistrationForm eventName={event.title} />
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
