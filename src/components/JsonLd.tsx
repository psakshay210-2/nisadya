
// 2027 REFRESH TOUCHPOINT: when Nisadya'27 content lands, update the Event
// name, startDate, and endDate below to the real 2027 dates (these currently
// hold the confirmed Nisadya'26 dates: 2026-02-27 to 2026-02-28).
export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: "Nisadya'26",
    startDate: '2026-02-27', // Nisadya'26 start (update for 2027 refresh)
    endDate: '2026-02-28',   // Nisadya'26 end (update for 2027 refresh)
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
