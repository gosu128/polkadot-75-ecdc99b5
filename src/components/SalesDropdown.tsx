
import { useState, useRef, useEffect } from 'react';
import { useIndustriesAndSegments, Industry, Segment } from '@/hooks/useIndustriesAndSegments';
import SegmentProfile from './SegmentProfile';
import IndustriesSelector from './IndustriesSelector';

type SalesDropdownProps = {
  onSegmentSelect?: (isSelected: boolean) => void;
};

const SalesDropdown = ({ onSegmentSelect }: SalesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { industries, segments, loading } = useIndustriesAndSegments();

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Notify parent component when segment selection changes
  useEffect(() => {
    if (onSegmentSelect) {
      onSegmentSelect(selectedSegment !== null);
    }
  }, [selectedSegment, onSegmentSelect]);

  const handleSegmentSelect = (segment: Segment) => {
    console.log("SalesDropdown - Setting selected segment:", segment.name);
    setSelectedSegment(segment);
    setIsOpen(false);
    
    // Ensure we notify the parent component about the selection
    if (onSegmentSelect) {
      onSegmentSelect(true);
    }
  };

  const resetSelection = () => {
    setSelectedIndustry(null);
    setSelectedSegment(null);
    
    // Notify parent component that no segment is selected
    if (onSegmentSelect) {
      onSegmentSelect(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {!selectedSegment ? (
        <div ref={dropdownRef} className="relative z-20 w-full">
          <IndustriesSelector 
            industries={industries}
            segments={segments}
            loading={loading}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSegmentSelect={handleSegmentSelect}
            resetSelection={resetSelection}
          />
        </div>
      ) : (
        <div className="w-full">
          <SegmentProfile 
            segment={selectedSegment} 
            industry={selectedIndustry} 
            onBack={resetSelection} 
          />
        </div>
      )}
    </div>
  );
};

export default SalesDropdown;
