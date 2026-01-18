import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-3 xs:gap-4 sm:gap-5 md:gap-6 py-6 xs:py-7 sm:py-8 md:py-10 lg:h-24 lg:flex-row lg:py-0">
        <div className="flex flex-col items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 px-3 xs:px-4 sm:px-6 md:px-8 lg:flex-row lg:gap-2 lg:px-0">
          <Image src="/logo.png" alt="Nisadya Logo" width={120} height={48} className="h-10 w-auto xs:h-11 sm:h-12" />
          <p className="text-center text-xs xs:text-sm leading-loose text-muted-foreground lg:text-left">
            Built for Nisadya. The future is now.
          </p>
        </div>
        <div className="flex gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
          <Link
            href="https://www.linkedin.com/company/nisadyanitt/?originalSubdomain=in"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/nisadya.nitt/?hl=en"
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
