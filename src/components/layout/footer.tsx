import { Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nisadyanitt/?originalSubdomain=in",
      label: "LinkedIn",
      color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/20"
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/20"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nisadya.nitt/?hl=en",
      label: "Instagram",
      color: "hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/20"
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-[#4267B2] hover:bg-[#4267B2]/10 hover:border-[#4267B2]/20"
    }
  ];

  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-xl z-20">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container relative mx-auto px-4 py-8 md:py-8 lg:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          {/* Brand Side */}
          <div className="flex flex-col items-center md:items-start gap-4 order-2 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/logo.png"
                alt="Nisadya Logo"
                width={120}
                height={48}
                className="relative h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>for</span>
              <span className="text-white">Nisadya</span>
              <span className="mx-1.5 w-1 h-1 rounded-full bg-gray-600" />
              <span>The future is now.</span>
            </div>
          </div>

          {/* Social Icons Side */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative p-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300",
                    "hover:scale-110 hover:-translate-y-1 hover:shadow-lg",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Copyright / Bottom text - purely minimal */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center justify-center text-[10px] sm:text-xs text-gray-600 uppercase tracking-widest gap-2">
          <p>© {new Date().getFullYear()} Nisadya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
