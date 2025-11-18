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
    <Card className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
      {placeholder && (
        <div className="aspect-[3/2] w-full overflow-hidden">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            <CategoryIcon className="mr-1 h-3 w-3" />
            {event.category}
          </Badge>
        </div>
        <p className="text-sm font-bold text-primary">{event.date}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{event.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                {event.title}
              </DialogTitle>
              <p className="text-sm font-bold text-primary">{event.date}</p>
              <DialogDescription>{event.details}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
      </CardFooter>
    </Card>
  );
}
