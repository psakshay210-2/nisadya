import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/logo.png" alt="Nisadya Logo" width={32} height={32} />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for Nisadya. The future is now.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://www.linkedin.com/company/nisadyanitt/?originalSubdomain=in"
            className="text-muted-foreground hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
