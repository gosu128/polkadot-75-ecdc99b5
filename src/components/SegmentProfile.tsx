import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Star } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Segment = {
  id: number;
  name: string;
};

type SegmentScore = {
  segment_id: number;
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
  segment: Segment | null;
  onBack: () => void;
};

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<SegmentScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!segment) return;

    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('segments_scores')
        .select('*')
        .eq('segment_id', segment.id)
        .single();

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScoreData(data);
      }
      setLoading(false);
    };

    fetchScores();
  }, [segment]);

  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment not found</h2>
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

        {/* Segment Scores Section */}
        <div>
          <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
            <Star className="mr-2 text-indigo-600 w-6 h-6" /> Polkadot-Market-Fit Score
          </h3>

          {loading ? (
            <p className="text-gray-700">Loading scores...</p>
          ) : scoreData ? (
            <div className="h-64 w-full bg-white p-6 rounded-lg shadow-lg">
              <ResponsiveBar
                data={[
                  { category: 'Market Fit', score: scoreData.polkadot_market_fit },
                  { category: 'ROI', score: scoreData.roi },
                  { category: 'Scalability', score: scoreData.scalability },
                  { category: 'Customization', score: scoreData.customization },
                  { category: 'Awareness', score: scoreData.awareness },
                  { category: 'Tech', score: scoreData.tech },
                  { category: 'TAM', score: scoreData.tam },
                  { category: 'Compliance', score: scoreData.compliance },
                  { category: 'Interoperability', score: scoreData.interoperability },
                  { category: 'Reliability', score: scoreData.reliability },
                  { category: 'Complexity', score: scoreData.complexity }
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
          ) : (
            <p className="text-gray-700 italic">No score data available for this segment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
