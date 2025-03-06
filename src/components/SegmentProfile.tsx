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
import { ResponsiveBar } from '@nivo/bar';
import { createClient } from '@supabase/supabase-js';
import Footer from '@/components/Footer';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

type Segment = {
  id: string;
  name: string;
  industry_id: string;
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

type SegmentScore = {
  "Polkadot-Market-Fit Score": number;
  "ROI Score": number;
  "Scalability Score": number;
  "Customization Score": number;
  "Awareness Score": number;
  "Tech Score": number;
  "TAM Score": number;
  "Compliance Score": number;
  "Interoperability Score": number;
  "Reliability Score": number;
  "Complexity Score": number;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
  const [scores, setScores] = useState<SegmentScore | null>(null);

  useEffect(() => {
    if (segment) {
      fetchSegmentScores(segment.id);
    }
  }, [segment]);

  const fetchSegmentScores = async (segmentId: string) => {
    const { data, error } = await supabase
      .from('segments_score')
      .select('*')
      .eq('segment_id', segmentId)
      .single();

    if (error) {
      console.error('Error fetching scores:', error);
    } else {
      setScores(data);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment?.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* Segment Scores Section */}
        {scores && (
          <div className="mt-12">
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <Star className="mr-2 text-indigo-600 w-6 h-6" />
              Segment Scores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
              {Object.entries(scores).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onBack} 
          className="mt-6 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>
    </div>
  );
};

export default SegmentProfile;

