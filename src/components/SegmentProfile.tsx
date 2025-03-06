import React, { useEffect, useState } from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  Star 
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient'; // Ensure Supabase is imported

type Segment = {
  id: string;
  name: string;
  industry_id: string;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
};

type SegmentScores = {
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
  const [scores, setScores] = useState<SegmentScores | null>(null);

  // Fetch segment scores when the segment is selected
  useEffect(() => {
    if (segment) {
      const fetchScores = async () => {
        const { data, error } = await supabase
          .from('segments_scores')
          .select('*')
          .eq('segment_id', segment.id)
          .single();

        if (error) {
          console.error("Error fetching segment scores:", error);
        } else {
          console.log("Fetched segment scores:", data);
          setScores(data);
        }
      };

      fetchScores();
    }
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
    <div className="flex flex-col min-h-screen">
      {/* Main content container with extra padding at the top */}
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

        {/* 🟢 SECTION 1: SEGMENT OVERVIEW */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <Info className="mr-2 text-indigo-600 w-6 h-6" />
              Overview
            </h3>
            <p className="font-inter-light text-gray-700">{segment.abstract || "No information available."}</p>
          </div>

          {segment.definition && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
                <BookText className="mr-2 text-indigo-600 w-6 h-6" />
                Definition
              </h3>
              <p className="font-inter-light text-gray-700">{segment.definition}</p>
            </div>
          )}

          {segment.trends && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
                <TrendingUp className="mr-2 text-indigo-600 w-6 h-6" />
                Market Trends
              </h3>
              <p className="font-inter-light text-gray-700">{segment.trends}</p>
            </div>
          )}

          {segment.regions && (
            <div>
              <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
                <Globe className="mr-2 text-indigo-600 w-6 h-6" />
                Geographical Hotspots
              </h3>
              <p className="font-inter-light text-gray-700">{segment.regions}</p>
            </div>
          )}
        </div>

        {/* 🟢 SECTION 2: SCORES */}
        {scores && (
          <div className="mt-12">
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              <Star className="mr-2 text-indigo-600 w-6 h-6" />
              Polkadot-Market-Fit Score
            </h3>
            <div className="h-64 w-full">
              <ResponsiveBar
                data={[
                  { category: "Market Fit", score: scores.polkadot_market_fit },
                  { category: "ROI", score: scores.roi },
                  { category: "Scalability", score: scores.scalability },
                  { category: "Customization", score: scores.customization },
                  { category: "Awareness", score: scores.awareness },
                  { category: "Tech", score: scores.tech },
                  { category: "TAM", score: scores.tam },
                  { category: "Compliance", score: scores.compliance },
                  { category: "Interoperability", score: scores.interoperability },
                  { category: "Reliability", score: scores.reliability },
                  { category: "Complexity", score: scores.complexity }
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
      
      <Footer />
    </div>
  );
};

export default SegmentProfile;
