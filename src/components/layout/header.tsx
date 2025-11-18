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
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 1500); // Animation duration
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-1000',
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <Image
          src="/logo.png"
          alt="Nisadya Logo"
          width={512}
          height={256}
          className={cn(
            'invert drop-shadow-[0_8px_20px_rgba(0,0,0,1)] transition-transform duration-1000 ease-in-out animate-pulse-grow',
            loading ? 'scale-100' : 'scale-0'
          )}
          priority
        />
      </div>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
        )}
      >
        <div className="container flex h-24 items-center">
          <div
            className={cn(
              'transition-opacity duration-500 delay-[1200ms]',
              loading ? 'opacity-0' : 'opacity-100 flex items-center w-full'
            )}
          >
            <Link href="/" className="mr-6 flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Nisadya Logo"
                    width={128}
                    height={64}
                    className={cn('invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)]')}
                    priority
                />
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
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
    </>
  );
}
