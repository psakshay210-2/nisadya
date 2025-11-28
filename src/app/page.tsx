import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <div className="relative mb-8 animate-fade-in-up">
        <Image
          src="/logo.png"
          alt="Nisadya Logo"
          width={400}
          height={200}
          className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] w-full h-auto'}
          priority
        />
      </div>
      <Link
        href="/fest"
        className="animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        <Button size="lg">
          Enter Fest
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
