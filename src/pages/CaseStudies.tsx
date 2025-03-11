
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Define placeholder image URLs for case studies
const caseStudyImages = Array.from({ length: 5 }, (_, i) => 
  `https://placehold.co/1200x800/e6007a/ffffff?text=Case+Study+${i + 1}`
);

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Functions to navigate slides
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudyImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + caseStudyImages.length) % caseStudyImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex-grow">
        <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-8 text-center">
          Case Studies
        </h1>
        
        {/* Image Carousel */}
        <div className="relative w-full max-w-5xl mx-auto">
          <img 
            src={caseStudyImages[currentIndex]} 
            alt={`Case Study ${currentIndex + 1}`} 
            className="w-full h-auto rounded-lg shadow-xl"
          />

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-1 rounded-sm hover:bg-black/20 transition border border-white/30"
          >
            ◀
          </button>

          <button 
            onClick={nextSlide} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-1 rounded-sm hover:bg-black/20 transition border border-white/30"
          >
            ▶
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {caseStudyImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-polkadot-pink scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;
