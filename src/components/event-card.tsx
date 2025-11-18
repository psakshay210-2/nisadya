import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event, eventCategories } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RegistrationForm } from '@/components/registration-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const { title, category, description, date, imageId } = event;
  const CategoryIcon = eventCategories[category].icon;
  const categoryColor = eventCategories[category].color;
  const placeholder = PlaceHolderImages.find((p) => p.id === imageId);

  return (
    <Dialog>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2">
        <CardHeader className="p-0">
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
          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CategoryIcon className={cn('h-5 w-5', categoryColor)} />
                <span className={`font-semibold ${categoryColor}`}>
                  {category}
                </span>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date}
              </Badge>
            </div>
            <CardTitle className="font-headline text-2xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button className="w-full">Register</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for this event. Deadline: 2 days
            before event.
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm eventName={title} />
      </DialogContent>
    </Dialog>
  );
}