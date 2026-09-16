import { fetchSiteConfig, fetchSheetData, GIDS, SiteConfig } from './gsheet';
import {
  FALLBACK_CONFIG,
  FALLBACK_EVENTS,
  FALLBACK_SCHEDULE,
  FALLBACK_INSTAGRAM,
} from './fallback-content';

interface ServerData {
  config: SiteConfig;
  events: any[];
  schedule: any[];
  instagram: any[];
}

// Offline fallback config: the 2026-07-08 live-sheet snapshot, used whenever
// Sheets is unreachable or returns no config rows. registration_link is the one
// key the snapshot lacks that anything reads (Hero.tsx), so it is defaulted
// here; every other former default was shadowed by the snapshot or never read.
const FALLBACK_CONFIG_MERGED: SiteConfig = { registration_link: '#events', ...FALLBACK_CONFIG };

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

    // Return real sheet data, but substitute the last-known 2026-07-08 snapshot
    // for any section that came back empty, so visitors never see a blank section.
    return {
      config: Object.keys(config).length > 0 ? config : FALLBACK_CONFIG_MERGED,
      events: events.length > 0 ? events : FALLBACK_EVENTS,
      schedule: schedule.length > 0 ? schedule : FALLBACK_SCHEDULE,
      instagram: instagram.length > 0 ? instagram : FALLBACK_INSTAGRAM,
    };
  } catch (error) {
    console.error('Error fetching server data:', error);
    // Sheets unreachable: serve the 2026-07-08 offline snapshot instead of blanks.
    return {
      config: FALLBACK_CONFIG_MERGED,
      events: FALLBACK_EVENTS,
      schedule: FALLBACK_SCHEDULE,
      instagram: FALLBACK_INSTAGRAM,
    };
  }
}
