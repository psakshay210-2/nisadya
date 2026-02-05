
export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: "Nisadya'26",
    startDate: '2026-01-01', // Placeholder, should be updated with actual date
    endDate: '2026-01-03',   // Placeholder
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'NIT Tiruchirappalli',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Tanjore Main Road, NH67',
        addressLocality: 'Tiruchirappalli',
        postalCode: '620015',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
    image: [
      'https://nisadya.in/fest_main_logo.png',
      // Add more images if available
    ],
    description: "Nisadya'26 is the annual college fest of DOMS NIT Trichy, celebrating talent, creativity, and innovation.",
    organizer: {
      '@type': 'Organization',
      name: 'DoMS NIT Trichy',
      url: 'https://nisadya.in',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
