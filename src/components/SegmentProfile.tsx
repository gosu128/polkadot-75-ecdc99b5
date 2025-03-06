import React, { useEffect, useState } from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  AlertTriangle, 
  Lightbulb, 
  Star, 
  Target, 
  Users 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Footer from '@/components/Footer';

type Segment = {
  id: number;
  name: string;
  industry_id: number;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  use_cases: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
  positioning_statement: string | null;
  positioning_headline: string | null;
  positioning_subheadline: string | null;
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  ca_reliability: string | null;
  ca_other: string | null;
  pmf: number | null;
  scores: { key: string; value: number }[] | null;
};

type ScoreData = {
  interoperability: number | null;
  roi: number | null;
  scalability: number | null;
  customization: number | null;
  awareness: number | null;
  tech: number | null;
  tam: number | null;
  compliance: number | null;
  complexity: number | null;
  reliability: number | null;
  pmf: number | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Function to format text while ensuring ":" is bold
const formatContent = (content: string | null) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  return (
    <div className="font-inter-light text-gray-700 space-y-2 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          return (
            <p key={index}>
              <span className="font-inter-bold">{parts[0].trim()}:</span> {parts.slice(1).join(':').trim()}
            </p>
          );
        }
        return <p key={index}>{line.trim()}</p>;
      })}
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-2">
    <h2 className="text-2xl text-polkadot-pink font-unbounded flex items-center">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

// Subsection header component
const SubsectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-lg text-black font-semibold flex items-center mb-1">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

// Improved world map component
const WorldMap = () => (
  <div className="mt-6 mb-8 flex justify-center">
    <img
      src="/world-map.svg" 
      alt="World Map"
      className="w-full max-w-3xl object-contain"
    />
  </div>
);

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      if (segment) {
        try {
          const { data, error } = await supabase
            .from('segments')
            .select('interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf')
            .eq('id', segment.id)
            .single();
            
          if (error) {
            console.error('Error fetching scores:', error);
          } else if (data) {
            setScoreData(data);
          }
        } catch (error) {
          console.error('Error in score fetch operation:', error);
        }
      }
    };
    
    fetchScores();
  }, [segment]);

  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
          ← Back to Selection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-left px-8 py-24">
      {/* Header with extra spacing */}
      <div className="mb-16">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900">{segment.name}</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Main Sections */}
      <div className="space-y-10">

        {/* Section 1: Overview */}
        <SectionHeader icon={Info} title="Overview" />
        <SubsectionHeader icon={BookText} title="Abstract" />
        {formatContent(segment.abstract)}
        <SubsectionHeader icon={BookText} title="Definition" />
        {formatContent(segment.definition)}
        <SubsectionHeader icon={TrendingUp} title="Market Trends" />
        {formatContent(segment.trends)}
        <SubsectionHeader icon={Globe} title="Geographical Hotspots" />
        {formatContent(segment.regions)}
        <WorldMap />

      </div>
    </div>
  );
};

export default SegmentProfile;
