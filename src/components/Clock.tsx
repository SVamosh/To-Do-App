
import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const formatDay = (date: Date): string => {
        return new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    };

    const formatTime = (date: Date): string => {
        return new Intl.DateTimeFormat("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(date);
    };

    const day = formatDay(time);
    const timing = formatTime(time);

    return (
        <div>
            <p className="font-bold text-[18px]">
                {day}
            </p>

            <p className="font-bold text-[30px]">
                <time dateTime={time.toISOString()} aria-label="Текущее время">
                    {timing}
                </time>
            </p>
        </div>
    );
};

export default Clock;