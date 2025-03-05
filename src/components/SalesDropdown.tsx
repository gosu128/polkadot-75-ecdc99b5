import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Layers, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  trends: string | null;
};

const SalesDropdown = () => {
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
    setSelectedSegment(null);
  };

  const handleSegmentSelect = (segment: Segment) => {
    setSelectedSegment(segment);
    setIsOpen(false);
  };

  const resetSelection = () => {
    setSelectedIndustry(null);
    setSelectedSegment(null);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {!selectedSegment ? (
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

// Component to display a segment profile
const SegmentProfile = ({ 
  segment, 
  industry, 
  onBack 
}: { 
  segment: Segment; 
  industry: Industry | null;
  onBack: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="pill-tag mb-2">{industry?.name}</div>
          <h2 className="text-2xl md:text-3xl font-unbounded font-semibold mb-1">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-polkadot-gray transition-colors"
        >
          ← Back to Selection
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-medium flex items-center mb-3">
              <Info className="mr-2 text-polkadot-pink w-5 h-5" />
              Overview
            </h3>
            <div className="bg-polkadot-gray rounded-lg p-4">
              {segment.abstract ? (
                <p className="text-foreground/80 whitespace-pre-line">{segment.abstract}</p>
              ) : (
                <p className="text-foreground/60 italic">No overview information available.</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium flex items-center mb-3">
              <TrendingUp className="mr-2 text-polkadot-pink w-5 h-5" />
              Market Trends
            </h3>
            <div className="bg-polkadot-gray rounded-lg p-4">
              {segment.trends ? (
                <p className="text-foreground/80 whitespace-pre-line">{segment.trends}</p>
              ) : (
                <p className="text-foreground/60 italic">No trend information available.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-polkadot-gray rounded-lg p-5">
          <h3 className="text-lg font-medium mb-4 border-b pb-2">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center">
              Download Segment Report
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              Schedule Consultation
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDropdown;
