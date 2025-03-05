import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Layers, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SegmentProfile from './SegmentProfile';

// Define types for our data
type Industry = {
  id: number;
  name: string;
};

type Segment = {
  id: number;
  name: string;
  industry_id: number;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  challenges: string | null;
  use_cases: string | null;
  score: string | null;
  positioning_statement: string | null;
  personas: string | null;
};

type SalesDropdownProps = {
  onSelectSegment?: (segment: Segment, industry: Industry) => void;
};

const SalesDropdown = ({ onSelectSegment }: SalesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [filteredSegments, setFilteredSegments] = useState<Segment[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch industries on mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data: industriesData, error } = await supabase
          .from('industries')
          .select('*')
          .order('name');

        if (error) throw error;
        
        setIndustries(industriesData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching industries:', error);
        toast({
          variant: "destructive",
          title: "Failed to load industries",
          description: "Please try again later."
        });
        setLoading(false);
      }
    };

    const fetchSegments = async () => {
      try {
        const { data: segmentsData, error } = await supabase
          .from('segments')
          .select('*')
          .order('name');

        if (error) throw error;
        
        setSegments(segmentsData || []);
      } catch (error) {
        console.error('Error fetching segments:', error);
        toast({
          variant: "destructive",
          title: "Failed to load segments",
          description: "Please try again later"
        });
      }
    };

    fetchIndustries();
    fetchSegments();
  }, [toast]);

  // Filter segments when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      const filtered = segments.filter(segment => segment.industry_id === selectedIndustry.id);
      setFilteredSegments(filtered);
    } else {
      setFilteredSegments([]);
    }
  }, [selectedIndustry, segments]);

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

  const handleIndustrySelect = (industry: Industry) => {
    setSelectedIndustry(industry);
  };

  const handleSegmentSelect = (segment: Segment) => {
    setIsOpen(false);
    if (onSelectSegment && selectedIndustry) {
      onSelectSegment(segment, selectedIndustry);
    }
  };

  const resetSelection = () => {
    setSelectedIndustry(null);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div ref={dropdownRef} className="relative z-20 w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-200 shadow-sm rounded-md px-4 py-3 flex items-center justify-between hover:border-gray-300 transition-colors text-sm"
        >
          <span className="text-gray-700">
            {selectedIndustry 
              ? `Industry: ${selectedIndustry.name}` 
              : "Select industry vertical"}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
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
    </div>
  );
};

export default SalesDropdown;
