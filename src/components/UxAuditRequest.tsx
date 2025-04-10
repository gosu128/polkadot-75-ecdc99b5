import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface UxAuditRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

const UxAuditRequest: React.FC<UxAuditRequestProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Load Tally script when component mounts
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script when component unmounts
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-polkadot-dark rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">UX Audit Request</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 h-[calc(90vh-80px)]">
          <div className="w-full h-full">
            {/* Iframe container */}
            <div className="w-full h-full bg-white rounded-md overflow-hidden relative">
              <iframe 
                data-tally-src="https://tally.so/r/mDZGDj?transparentBackground=1" 
                frameBorder="0" 
                title="UX Audit Request Form"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  border: 0,
                  width: '100%',
                  height: '100%',
                  margin: 0
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UxAuditRequest; 