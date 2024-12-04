import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 rounded-full border-4 border-t-[#2189FF] border-r-[#2189FF] border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <div className="absolute top-2 left-2 w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-t-[#EAF4FF] border-r-[#EAF4FF] border-b-transparent border-l-transparent animate-spin-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
