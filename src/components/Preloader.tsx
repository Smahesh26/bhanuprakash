import React from 'react';

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
          style={{ color: '#4B2E0F', animation: 'zoomIn 1.2s ease' }}
        >
          Welcome to MedSchool Simplified
        </h1>
        <style jsx>{`
          @keyframes zoomIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            60% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
