'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import type { Sponsor } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const placeholder = PlaceHolderImages.find(p => p.id === sponsor.imageId);

  return (
    <Link href="#" className="h-full block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/10">
        {placeholder && (
          <div className="relative aspect-video">
            <Image
              src={placeholder.imageUrl}
              alt={sponsor.name}
              fill
              className="object-contain p-4 xs:p-6 sm:p-8"
              data-ai-hint={placeholder.imageHint}
            />
          </div>
        )}
        <CardHeader>
          <div className='flex justify-between items-start gap-2 xs:gap-3 sm:gap-4'>
            <CardTitle className="font-headline text-lg xs:text-xl sm:text-2xl">{sponsor.name}</CardTitle>
            <Badge variant="secondary" className="text-xs shrink-0">{sponsor.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <CardDescription className='flex-grow'>{sponsor.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
