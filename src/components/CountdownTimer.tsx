'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeCard = ({ value, label }: { value: number; label: string }) => (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px]">
            <div className="text-4xl md:text-6xl font-bold text-white font-heading mb-2">
                {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base text-white/80 font-medium uppercase tracking-wider">
                {label}
            </div>
        </div>
    );

    return (
        <div className="flex justify-center items-center gap-2 md:gap-4">
            <TimeCard value={timeLeft.days} label="Days" />
            <TimeCard value={timeLeft.hours} label="Hours" />
            <TimeCard value={timeLeft.minutes} label="Mins" />
            <TimeCard value={timeLeft.seconds} label="Secs" />
        </div>
    );
};

export default CountdownTimer;
