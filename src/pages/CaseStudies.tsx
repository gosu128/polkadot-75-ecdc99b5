
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Define an array of placeholder image URLs for case studies
const imageUrls = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80"
];

const CaseStudies = () => {
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
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex-grow">
        <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-8 text-center">
          Case Studies
        </h1>

        {/* Image Carousel */}
        <div className="relative w-full max-w-5xl mx-auto">
          <img 
            src={imageUrls[currentIndex]} 
            alt={`Case Study ${currentIndex + 1}`} 
            className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video"
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
          {imageUrls.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-polkadot-pink scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-center text-gray-600">
            Click through the slides to explore our case studies showcasing successful Polkadot implementations
            across various industry segments.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;
