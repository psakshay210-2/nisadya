import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nisadya.in';

    // Add all static routes here
    const routes = [
        '',
        // Add other pages if they exist, e.g., '/events', '/schedule', etc.
        // Based on the file structure, currently only the home page seems static or explicitly routed.
        // If there are dynamic routes (e.g. /events/[id]), fetch them here.
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));
}
