
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Layers, TrendingUp, MapPin, Shield, Lightbulb, Star, Target, User, Book } from 'lucide-react';
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
  onSegmentSelect?: (isSelected: boolean) => void;
};

const SalesDropdown = ({ onSegmentSelect }: SalesDropdownProps) => {
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
  
  // Notify parent component when segment selection changes
  useEffect(() => {
    if (onSegmentSelect) {
      onSegmentSelect(selectedSegment !== null);
    }
  }, [selectedSegment, onSegmentSelect]);

  const handleIndustrySelect = (industry: Industry) => {
    setSelectedIndustry(industry);
    setSelectedSegment(null);
  };

  const handleSegmentSelect = (segment: Segment) => {
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
          <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full inline-block mb-2">{industry?.name}</div>
          <h2 className="text-2xl md:text-3xl font-unbounded font-semibold mb-1">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack}
          className="px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          ← Back to Selection
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left column - Main information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract section */}
          {segment.abstract && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Info className="mr-2 text-polkadot-pink w-5 h-5" />
                Overview
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.abstract}</p>
              </div>
            </div>
          )}
          
          {/* Definition section */}
          {segment.definition && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Book className="mr-2 text-polkadot-pink w-5 h-5" />
                Definition
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.definition}</p>
              </div>
            </div>
          )}

          {/* Trends section */}
          {segment.trends && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <TrendingUp className="mr-2 text-polkadot-pink w-5 h-5" />
                Market Trends
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.trends}</p>
              </div>
            </div>
          )}
          
          {/* Regions section */}
          {segment.regions && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <MapPin className="mr-2 text-polkadot-pink w-5 h-5" />
                Key Regions
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.regions}</p>
              </div>
            </div>
          )}
          
          {/* Challenges section */}
          {segment.challenges && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Shield className="mr-2 text-polkadot-pink w-5 h-5" />
                Challenges
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.challenges}</p>
              </div>
            </div>
          )}
          
          {/* Use Cases section */}
          {segment.use_cases && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Lightbulb className="mr-2 text-polkadot-pink w-5 h-5" />
                Use Cases
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.use_cases}</p>
              </div>
            </div>
          )}
          
          {/* Positioning Statement section */}
          {segment.positioning_statement && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Target className="mr-2 text-polkadot-pink w-5 h-5" />
                Positioning Statement
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.positioning_statement}</p>
              </div>
            </div>
          )}
          
          {/* Personas section */}
          {segment.personas && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <User className="mr-2 text-polkadot-pink w-5 h-5" />
                Key Personas
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.personas}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column - Score and actions */}
        <div className="space-y-6">
          {/* Score section */}
          {segment.score && (
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Star className="mr-2 text-polkadot-pink w-5 h-5" />
                Market Opportunity Score
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <span className="text-4xl font-bold text-polkadot-pink">{segment.score}</span>
                  <p className="text-sm text-gray-500 mt-1">out of 10</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick actions section */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-polkadot-pink hover:bg-pink-600 text-white py-2 px-4 rounded-md transition-colors">
                Download Segment Report
              </button>
              <button className="w-full border border-polkadot-pink text-polkadot-pink hover:bg-pink-50 py-2 px-4 rounded-md transition-colors">
                Schedule Consultation
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDropdown;
