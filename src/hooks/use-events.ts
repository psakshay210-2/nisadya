import { useState, useEffect } from 'react';
import { fetchEvents } from '@/lib/events-loader';
import type { Event } from '@/lib/types';

export function useEvents(limit?: number) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const fetchedEvents = await fetchEvents();
                if (limit) {
                    setEvents(fetchedEvents.slice(0, limit));
                } else {
                    setEvents(fetchedEvents);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, [limit]);

    return { events, loading, error };
}
