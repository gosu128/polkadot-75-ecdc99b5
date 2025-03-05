
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Industry, Segment } from '@/hooks/useIndustriesAndSegments';

interface IndustriesSelectorProps {
  industries: Industry[];
  segments: Segment[];
  loading: boolean;
  selectedIndustry: Industry | null;
  setSelectedIndustry: (industry: Industry | null) => void;
  setSelectedSegment: (segment: Segment | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSegmentSelect: (segment: Segment) => void;
  resetSelection: () => void;
}

const IndustriesSelector = ({
  industries,
  segments,
  loading,
  selectedIndustry,
  setSelectedIndustry,
  setSelectedSegment,
  isOpen,
  setIsOpen,
  onSegmentSelect,
  resetSelection
}: IndustriesSelectorProps) => {
  const [filteredSegments, setFilteredSegments] = useState<Segment[]>([]);

  // Filter segments when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      const filtered = segments.filter(segment => segment.industry_id === selectedIndustry.id);
      setFilteredSegments(filtered);
    } else {
      setFilteredSegments([]);
    }
  }, [selectedIndustry, segments]);

  const handleIndustrySelect = (industry: Industry) => {
    setSelectedIndustry(industry);
    setSelectedSegment(null);
  };

  const handleSegmentSelect = (segment: Segment) => {
    onSegmentSelect(segment);
  };

  return (
    <div className="relative z-20 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-200 shadow-sm rounded-md px-4 py-3 flex items-center justify-between hover:border-gray-300 transition-colors text-sm"
      >
        <span className="text-gray-700">
          {selectedIndustry 
            ? `Industry: ${selectedIndustry.name}` 
            : "Select industry vertical"}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 animate-fade-in z-30">
          {/* First level: Industries */}
          {!selectedIndustry && (
            <div className="max-h-80 overflow-y-auto p-3">
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <div className="w-5 h-5 border-2 border-polkadot-pink border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-1">
                  {industries.map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => handleIndustrySelect(industry)}
                      className="text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm w-full"
                    >
                      <span>{industry.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Second level: Segments */}
          {selectedIndustry && (
            <div className="max-h-80 overflow-y-auto p-3">
              <div className="flex items-center justify-between mb-2 pb-2 border-b">
                <p className="text-sm font-medium">Segments in {selectedIndustry.name}</p>
                <button 
                  onClick={resetSelection}
                  className="text-xs text-polkadot-pink hover:text-polkadot-pink-light"
                >
                  ← Back to Industries
                </button>
              </div>
              
              {filteredSegments.length === 0 ? (
                <p className="text-center py-2 text-sm text-gray-500">No segments found for this industry.</p>
              ) : (
                <div className="grid grid-cols-1 gap-1">
                  {filteredSegments.map((segment) => (
                    <button
                      key={segment.id}
                      onClick={() => handleSegmentSelect(segment)}
                      className="text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm w-full"
                    >
                      <div className="font-medium">{segment.name}</div>
                      {segment.abstract && (
                        <p className="text-xs text-gray-500 line-clamp-1">{segment.abstract}</p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndustriesSelector;
