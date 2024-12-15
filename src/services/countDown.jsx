import React, { useState, useEffect } from 'react';

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const newYear = new Date('January 1, 2025 00:00:00');
            const difference = newYear - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-tr from-teal-300 inset-1 mt-16 md:mt-24">
            <div className="text-white text-3xl md:text-4xl font-bold mb-6 text-center ">
                Yangi yilga qadar
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 items-center justify-center">
                <div className="countdown-item">
                    <div className="countdown-time text-sm md:text-4xl sm:text-2xl">{String(timeRemaining.days).padStart(2, '0')}</div>
                    <div className="countdown-label text-[2px] sm:text-base">Kun</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-time text-sm md:text-4xl sm:text-2xl">{String(timeRemaining.hours).padStart(2, '0')}</div>
                    <div className="countdown-label text-[2px] sm:text-base">Soat</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-time text-sm md:text-4xl sm:text-2xl">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                    <div className="countdown-label text-[2px] sm:text-base">Daqiqa</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-time text-sm md:text-4xl sm:text-2xl">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                    <div className="countdown-label text-[2px] sm:text-base">Sekund</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
