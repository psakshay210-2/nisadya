import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const poppins = Poppins({
    weight: ["600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Nisadya'26 | College Fest",
    description: "Join us for an unforgettable celebration of talent, creativity, and innovation at Nisadya'26 - the annual college fest.",
    keywords: "college fest, nisadya, cultural fest, technical fest, 2026, events, competitions",
    authors: [{ name: "Nisadya Team" }],
    openGraph: {
        title: "Nisadya'26 | College Fest",
        description: "Join us for an unforgettable celebration at Nisadya'26",
        type: "website",
    },
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
