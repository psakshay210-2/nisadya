import { fetchSiteConfig, fetchSheetData, GIDS, SiteConfig } from './gsheet';

export interface ServerData {
  config: SiteConfig;
  events: any[];
  schedule: any[];
  instagram: any[];
}

// Default fallback data when sheets are unavailable
const DEFAULT_CONFIG: SiteConfig = {
  hero_title: 'NISADYA',
  hero_subtitle: 'The Ultimate College Fest',
  hero_year: '2026',
  hero_date: '2026-02-28',
  hero_description: 'Unleash your potential at the biggest cultural and technical extravaganza of the year.',
  about_title: "Nisadya '26",
  about_description: 'Nisadya is the annual flagship business fest of the Department of Management Studies, NIT Tiruchirappalli.',
  registration_link: '#events',
};

/**
 * Fetch all required data from Google Sheets on the server
 * Returns data with fallbacks if sheets are empty or error occurs
 */
export async function getServerData(): Promise<ServerData> {
  try {
    // Fetch config
    const config = await fetchSiteConfig();

    // Fetch events
    const events = await fetchSheetData(GIDS.EVENTS, (headers, row) => {
      const event = {
        name: row[headers.indexOf('event name')] || '',
        description: row[headers.indexOf('description')] || '',
        startDate: row[headers.indexOf('start date')] || '',
        endDate: row[headers.indexOf('end date')] || '',
        unstopLink: row[headers.indexOf('unstop link')] || '',
        imageLink: row[headers.indexOf('image link')] || '',
        coordinator: row[headers.indexOf('coordinator')] || '',
        contact: row[headers.indexOf('contact')] || '',
        category: row[headers.indexOf('category')] || '',
      };
      if (!event.name) return null;
      return event;
    });

    // Fetch schedule
    const schedule = await fetchSheetData(GIDS.SCHEDULE, (headers, row) => {
      const item = {
        day: row[headers.indexOf('day')] || '',
        date: row[headers.indexOf('date')] || '',
        time: row[headers.indexOf('time')] || '',
        title: row[headers.indexOf('event name')] || '',
        venue: row[headers.indexOf('venue')] || '',
        category: row[headers.indexOf('category')] || '',
      };
      if (!item.day || !item.title) return null;
      return item;
    });

    // Fetch instagram posts
    const instagram = await fetchSheetData(GIDS.INSTAGRAM, (headers, row) => {
      const post = {
        postLink: row[headers.indexOf('link')] || '',
      };
      if (!post.postLink) return null;
      return post;
    });

    // Return with fallbacks for empty data
    return {
      config: Object.keys(config).length > 0 ? config : DEFAULT_CONFIG,
      events: events.length > 0 ? events : [],
      schedule: schedule.length > 0 ? schedule : [],
      instagram: instagram.length > 0 ? instagram : [],
    };
  } catch (error) {
    console.error('Error fetching server data:', error);
    // Return default data if fetch fails
    return {
      config: DEFAULT_CONFIG,
      events: [],
      schedule: [],
      instagram: [],
    };
  }
}
