/** @type {import('next').NextConfig} */

// Firebase App Hosting runs the Next server, so these are served in production.
// The CSP is Report-Only on purpose: it blocks nothing yet, it only reports.
// 'unsafe-inline' for script-src is required by the RSC flight payload and the
// next-themes anti-flash script; do NOT switch to a nonce until Next is bumped
// (GHSA-ffhc-5mcf-pf4q is only reachable once nonces are in use).
// Strict-Transport-Security deliberately omits includeSubDomains and preload
// until someone confirms no plain-HTTP subdomain of nisadya.in exists.
const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
    {
        key: 'Content-Security-Policy-Report-Only',
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://*.basemaps.cartocdn.com",
            "font-src 'self'",
            // The published-sheet CSV 307-redirects to
            // doc-14-1k-sheets.googleusercontent.com, and CSP checks the redirect
            // target host, so docs.google.com alone would block GlobalSearch once
            // this policy is enforced. The shard prefix rotates; CSP host wildcards
            // only work on a whole leading label, so *.googleusercontent.com is the
            // narrowest valid pattern that covers it.
            "connect-src 'self' https://docs.google.com https://*.googleusercontent.com",
            "frame-src https://www.instagram.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
        ].join('; '),
    },
];

const nextConfig = {
    poweredByHeader: false,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
        ],
    },

    reactStrictMode: true,

    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
}

module.exports = nextConfig
