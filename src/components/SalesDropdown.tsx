
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  usecases_general: string | null;
  usecases_web3: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
  positioning_statement: string | null;
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  messaging: string | null;
  value_prop: string | null;
  proof_points: string | null;
  pmf: number | null;
  interoperability: number;
  roi: number;
  scalability: number;
  customization: number;
  awareness: number;
  tech: number;
  tam: number;
  compliance: number;
  complexity: number;
  reliability: number;
};

type SalesDropdownProps = {
  onSelectSegment?: (segment: Segment, industry: Industry) => void;
};

const SalesDropdown = ({ onSelectSegment }: SalesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [featuredSegments, setFeaturedSegments] = useState<Segment[]>([]);
  const [otherSegments, setOtherSegments] = useState<Segment[]>([]);
  const [showOtherSegments, setShowOtherSegments] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const featuredSegmentNames = [
    "Software & Tech - Artificial Intelligence",
    "Software & Tech - Decentralized Networks",
    "Transportation - Autonomous Vehicles",
    "Entertainment & Media - Gaming",
    "Supply Chain & Logistics - Customs & Trade Compliance"
  ];

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data: industriesData, error } = await supabase
          .from('industries')
          .select('*')
          .order('name');

        if (error) throw error;
        
        setIndustries(industriesData || []);
      } catch (error) {
        console.error('Error fetching industries:', error);
        toast({
          variant: "destructive",
          title: "Failed to load industries",
          description: "Please try again later."
        });
      }
    };

    const fetchSegments = async () => {
      try {
        const { data: segmentsData, error } = await supabase
          .from('segments')
          .select(`
            id, name, industry_id, abstract, definition, trends, regions, challenges, 
            usecases_general, usecases_web3, personas_1, personas_2, personas_3, 
            positioning_statement, ca_interoperability, ca_resiliance, ca_scalability, 
            ca_customization, messaging, value_prop, proof_points,
            interoperability, roi, scalability, customization, awareness, tech, tam, 
            compliance, complexity, reliability, pmf
          `)
          .order('name');

        if (error) throw error;
        
        const allSegments = segmentsData as Segment[] || [];
        setSegments(allSegments);
        
        const featured = allSegments.filter(segment => featuredSegmentNames.includes(segment.name));
        const others = allSegments.filter(segment => !featuredSegmentNames.includes(segment.name));
        
        setFeaturedSegments(featured);
        setOtherSegments(others);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowOtherSegments(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSegmentSelect = (segment: Segment) => {
    setIsOpen(false);
    setShowOtherSegments(false);
    
    const industry = industries.find(ind => ind.id === segment.industry_id);
    
    if (onSelectSegment && industry) {
      onSelectSegment(segment, industry);
    }
  };

  const toggleOtherSegments = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOtherSegments(!showOtherSegments);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div ref={dropdownRef} className="relative z-20 w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-200 shadow-sm rounded-md px-4 py-3 flex items-center justify-between hover:border-gray-300 transition-colors text-sm"
        >
          <span className="text-gray-700">
            Select segment
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 animate-fade-in z-30">
            <div className="max-h-80 overflow-y-auto p-3">
              <div className="grid grid-cols-1 gap-1">
                {featuredSegments.map((segment) => (
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
                
                {otherSegments.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <button
                      className="text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm w-full relative"
                      onClick={toggleOtherSegments}
                    >
                      <div className="font-medium flex items-center justify-between">
                        <span>Other Segments [WIP]</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showOtherSegments ? 'rotate-180' : ''}`} />
                      </div>
                      <p className="text-xs text-gray-500">These segments are still work in progress</p>
                    </button>
                    
                    {showOtherSegments && (
                      <div className="pl-2 mt-1 border-l-2 border-gray-200">
                        {otherSegments.map((segment) => (
                          <button
                            key={segment.id}
                            onClick={() => handleSegmentSelect(segment)}
                            className="text-left p-2 rounded hover:bg-gray-50 transition-colors text-sm w-full mt-1"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDropdown;
