import React from "react";

const DiscountBanner = () => {
    return (
        <div className="discount-banner fixed top-24 left-0 w-full border flex items-center justify-center">
            <marquee behavior="scroll" direction="left">
                📢 Mahsulotlar uchun maxsus chegirmalar! Faqat bugun! 🛍️
            </marquee>
        </div>
    );
};

export default DiscountBanner;
