import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  Star 
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Segment = {
  id: number;
  name: string;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  polkadot_market_fit: number;
  roi: number;
  scalability: number;
  customization: number;
  awareness: number;
  tech: number;
  tam: number;
  compliance: number;
  interoperability: number;
  reliability: number;
  complexity: number;
};

type SegmentProfileProps = {
  segmentId: number | null;
  onBack: () => void;
};

const SegmentProfile = ({ segmentId, onBack }: SegmentProfileProps) => {
  const [segment, setSegment] = useState<Segment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!segmentId) return;

    const fetchSegmentData = async () => {
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .eq('id', segmentId)
        .single();

      if (error) {
        console.error('Error fetching segment:', error);
      } else {
        setSegment(data);
      }
      setLoading(false);
    };

    fetchSegmentData();
  }, [segmentId]);

  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
        <button 
          onClick={onBack} 
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
          ← Back to Selection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* Section 1: Segment Overview */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <Info className="mr-2 text-indigo-600 w-6 h-6" /> Segment Overview
            </h3>
            <p className="text-gray-700 font-inter-light">{segment.abstract || "No abstract available."}</p>
          </div>

          <div>
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <BookText className="mr-2 text-indigo-600 w-6 h-6" /> Definition
            </h3>
            <p className="text-gray-700 font-inter-light">{segment.definition || "No definition available."}</p>
          </div>

          <div>
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <TrendingUp className="mr-2 text-indigo-600 w-6 h-6" /> Market Trends
            </h3>
            <p className="text-gray-700 font-inter-light">{segment.trends || "No market trends available."}</p>
          </div>

          <div>
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <Globe className="mr-2 text-indigo-600 w-6 h-6" /> Geographical Hotspots
            </h3>
            <p className="text-gray-700 font-inter-light">{segment.regions || "No data available."}</p>
          </div>
        </div>

        {/* Section 2: Polkadot-Market-Fit Score */}
        <div className="mt-16">
          <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
            <Star className="mr-2 text-indigo-600 w-6 h-6" /> Polkadot-Market-Fit Score
          </h3>
          <div className="h-64 w-full bg-white p-6 rounded-lg shadow-lg">
            <ResponsiveBar
              data={[
                { category: 'Market Fit', score: segment.polkadot_market_fit },
                { category: 'ROI', score: segment.roi },
                { category: 'Scalability', score: segment.scalability },
                { category: 'Customization', score: segment.customization },
                { category: 'Awareness', score: segment.awareness },
                { category: 'Tech', score: segment.tech },
                { category: 'TAM', score: segment.tam },
                { category: 'Compliance', score: segment.compliance },
                { category: 'Interoperability', score: segment.interoperability },
                { category: 'Reliability', score: segment.reliability },
                { category: 'Complexity', score: segment.complexity }
              ]}
              keys={["score"]}
              indexBy="category"
              margin={{ top: 20, right: 30, bottom: 50, left: 120 }}
              padding={0.3}
              layout="horizontal"
              colors={["#6366F1"]}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{ legend: "Score (out of 10)", legendPosition: "middle", legendOffset: 40 }}
              axisLeft={{ tickSize: 0, tickPadding: 5 }}
              enableLabel={true}
              labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
