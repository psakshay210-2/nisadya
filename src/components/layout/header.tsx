'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '#events', label: 'Events' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#sponsors', label: 'Sponsors' },
];

export function Header() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Animation duration
    return () => clearTimeout(timer);
  }, []);


  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-white transition-colors hover:text-primary"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        'border-b border-transparent'
      )}
    >
      <div className="container flex h-24 items-center">
        <div 
          className={cn(
            'absolute transition-all duration-1000 ease-in-out',
            loading
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150'
              : 'top-5 left-10 scale-50'
          )}
          style={{ transformOrigin: 'top left' }}
        >
          <Link href="/" className="mr-6 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Nisadya Logo"
              width={256}
              height={128}
              className={cn('invert drop-shadow-[0_8px_20px_rgba(0,0,0,1)]')}
              priority
            />
          </Link>
        </div>
        
        <div className={cn(
          'transition-opacity duration-500 delay-1000',
          loading ? 'opacity-0' : 'opacity-100 flex items-center w-full'
        )}>
          <nav className="hidden items-center gap-6 md:flex ml-48">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Button asChild>
              <a href="#events">Register Now</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'md:hidden',
                    'border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="mt-8 grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Image
                      src="/logo.png"
                      alt="Nisadya Logo"
                      width={128}
                      height={64}
                    />
                  </Link>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
