import { useState } from "react";
import Header from '@/components/Header';

const Methodology = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto p-4 pt-32 text-center">
        {/* 📌 Button to Open the PDF Modal */}
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-polkadot-pink text-white font-unbounded rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          View Methodology PDF
        </button>
      </div>

      {/* 🖼 Fullscreen Modal for PDF */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white w-[90vw] h-[90vh] rounded-lg shadow-lg overflow-hidden">
            {/* ❌ Close Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm shadow-md hover:bg-red-600 transition"
            >
              ✕ Close
            </button>

            {/* 📄 Embedded PDF */}
            <embed 
              src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//methodology.pdf" 
              type="application/pdf" 
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Methodology;
