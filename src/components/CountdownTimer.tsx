"use client";
import { useEffect, useState } from 'react';

// DD/MM/YYYY and DD-MM-YYYY to YYYY-MM-DD; every other string is returned
// unchanged. Shared with Hero.tsx, which normalises the same sheet-supplied
// date strings in two more places.
export const toISO = (dateStr: string): string => {
    if (!/^\d{2}[\/-]\d{2}[\/-]\d{4}$/.test(dateStr)) return dateStr;
    const [d, m, y] = dateStr.split(/[\/-]/);
    return `${y}-${m}-${d}`;
};

// Isolated so only these four digit tiles re-render every second,
// instead of re-rendering the whole ~460-line Hero component each tick.
const CountdownTimer = ({ heroDate }: { heroDate?: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // No hard-coded fallback date. A blank or unparseable hero_date used to
    // fall back to 2026-02-28, a date now in the past, so the four tiles froze
    // at 00 00 00 00. NaN here means "no date to count to" and the component
    // renders nothing at all, leaving the hero's date pill to say what it says.
    const targetDate = heroDate
        ? new Date(`${toISO(heroDate)}T09:00:00`).getTime()
        : NaN;

    useEffect(() => {
        if (isNaN(targetDate)) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    if (isNaN(targetDate)) return null;

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    return (
        <>
            {timeUnits.map((unit) => (
                <div
                    key={unit.label}
                    className="glass group hover:bg-white/90 dark:hover:bg-slate-800/90 p-3 md:p-5 rounded-2xl flex flex-col items-center justify-center transition-[background-color,transform] duration-300 transform hover:-translate-y-2 border-t border-white/40 dark:border-white/10"
                >
                    <span className="text-2xl md:text-4xl lg:text-5xl font-black text-primary dark:text-primary-light mb-1 font-mono">
                        {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-secondary/80 dark:text-secondary-light/80">
                        {unit.label}
                    </span>
                </div>
            ))}
        </>
    );
};

export default CountdownTimer;
