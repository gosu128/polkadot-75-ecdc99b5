import Header from '@/components/Header';
import { useState } from 'react';

// Define an array of 19 image URLs
const imageUrls = Array.from({ length: 19 }, (_, i) => 
  `https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs/methodology-${String(i + 1).padStart(2, '0')}.png`
);

const Methodology = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32">

        {/* Image Carousel - Increased Size */}
        <div className="relative w-full max-w-5xl mx-auto"> {/* Increased from max-w-4xl to max-w-5xl */}
          <img 
            src={imageUrls[currentIndex]} 
            alt={`Methodology Page ${currentIndex + 1}`} 
            className="w-full h-auto rounded-lg shadow-xl" // Changed shadow-lg to shadow-xl for better emphasis
          />

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition"
          >
            ◀
          </button>

          <button 
            onClick={nextSlide} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition"
          >
            ▶
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {imageUrls.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-polkadot-pink scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Methodology;
