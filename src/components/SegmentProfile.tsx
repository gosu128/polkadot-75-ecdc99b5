
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
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// Initialize Supabase Client
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  positioning_statement: string | null;
  personas: string | null;
};

type Industry = {
  id: number;
  name: string;
};

type Score = {
  segment_id: string;
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
  industry?: Industry | null;
  onBack: () => void;
};

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!segment) return;

    // Fetch scores from Supabase
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
      {/* Main content container with extra padding at the top */}
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          {industry && (
            <p className="text-gray-600 mt-2">Industry: {industry.name}</p>
          )}
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* SINGLE COLUMN LAYOUT WITH PROPER SPACING */}
        <div className="space-y-12">
          {/* Overview */}
          {segment.abstract && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 mb-4 flex items-center">
                <Info className="mr-2 text-indigo-600 w-6 h-6" /> Overview
              </h3>
              <p className="text-gray-700">{segment.abstract}</p>
            </div>
          )}

          {/* Definition */}
          {segment.definition && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 mb-4 flex items-center">
                <BookText className="mr-2 text-indigo-600 w-6 h-6" /> Definition
              </h3>
              <p className="text-gray-700">{segment.definition}</p>
            </div>
          )}

          {/* Market Trends */}
          {segment.trends && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-indigo-600 w-6 h-6" /> Market Trends
              </h3>
              <p className="text-gray-700">{segment.trends}</p>
            </div>
          )}

          {/* Geographical Hotspots */}
          {segment.regions && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 mb-4 flex items-center">
                <Globe className="mr-2 text-indigo-600 w-6 h-6" /> Geographical Hotspots
              </h3>
              <p className="text-gray-700">{segment.regions}</p>
            </div>
          )}

          {/* POLKADOT-MARKET-FIT SCORE SECTION */}
          {!loading && scoreData && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 text-indigo-600 w-6 h-6" /> Polkadot-Market-Fit Score
              </h3>
              <div className="h-64 w-full">
                <ResponsiveBar
                  data={[
                    { category: 'PMF Score', score: scoreData.polkadot_market_fit },
                    { category: 'ROI Score', score: scoreData.roi },
                    { category: 'Scalability', score: scoreData.scalability },
                    { category: 'Customization', score: scoreData.customization },
                    { category: 'Awareness', score: scoreData.awareness },
                    { category: 'Tech Score', score: scoreData.tech },
                    { category: 'TAM Score', score: scoreData.tam },
                    { category: 'Compliance', score: scoreData.compliance },
                    { category: 'Interoperability', score: scoreData.interoperability },
                    { category: 'Reliability', score: scoreData.reliability },
                    { category: 'Complexity', score: scoreData.complexity },
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
