import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WelcomeSound = () => {
    const location = useLocation();

    useEffect(() => {
        const sayWelcome = () => {
            const utterance = new SpeechSynthesisUtterance("Привет");
            utterance.lang = "ru-RU"; // Rus tili uchun sozlama
            utterance.rate = 1; // Gapirish tezligi (1 — standart, 0.5 sekin, 2 tez)
            utterance.pitch = 1.2; // Ovozni balandligi (1 — standart, yuqori tovush uchun > 1)
            
            // Ovozlar ro'yxatidan mos ovozni topish
            const voices = speechSynthesis.getVoices();
            const russianVoice = voices.find((voice) => voice.lang === "ru-RU");

            if (russianVoice) {
                utterance.voice = russianVoice; // Rus ovozi tanlandi
            }

            speechSynthesis.speak(utterance);
        };

        if (location.pathname === "/") {
            sayWelcome();
        }
    }, [location.pathname]);

    return null; // Bu komponent faqat ovoz chiqaradi, UI elementi ko'rsatilmaydi
};

export default WelcomeSound;
