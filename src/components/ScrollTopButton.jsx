import React, { useState, useEffect } from 'react';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 z-10 text-[20px] right-5 p-3 w-[50px] rounded-full bg-blue-500 text-white text-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
                ↑
            </button>
        )
    );
};
