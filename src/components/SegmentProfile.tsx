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
import { supabase } from '@/lib/supabaseClient'; // Ensure Supabase is correctly imported

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

type ScoreData = {
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
  const [scores, setScores] = useState<ScoreData | null>(null);

  useEffect(() => {
    if (segment) {
      const fetchScores = async () => {
        console.log("Fetching scores for segment ID:", segment.id); // Debugging log

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
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* SINGLE COLUMN LAYOUT WITH PROPER SPACING */}
        <div className="space-y-12">
          {/* Overview */}
          <div>
            <SectionHeader icon={Info} title="Overview" />
            <p className="text-gray-700">{segment.abstract}</p>
          </div>

          {/* Definition */}
          {segment.definition && (
            <div>
              <SectionHeader icon={BookText} title="Definition" />
              <p className="text-gray-700">{segment.definition}</p>
            </div>
          )}

          {/* Market Trends */}
          {segment.trends && (
            <div>
              <SectionHeader icon={TrendingUp} title="Market Trends" />
              <p className="text-gray-700">{segment.trends}</p>
            </div>
          )}

          {/* Key Regions */}
          {segment.regions && (
            <div>
              <SectionHeader icon={Globe} title="Key Regions" />
              <p className="text-gray-700">{segment.regions}</p>
            </div>
          )}

          {/* Challenges */}
          {segment.challenges && (
            <div>
              <SectionHeader icon={AlertTriangle} title="Challenges" />
              <p className="text-gray-700">{segment.challenges}</p>
            </div>
          )}

          {/* Use Cases */}
          {segment.use_cases && (
            <div>
              <SectionHeader icon={Lightbulb} title="Use Cases" />
              <p className="text-gray-700">{segment.use_cases}</p>
            </div>
          )}

          {/* Positioning Statement */}
          {segment.positioning_statement && (
            <div>
              <SectionHeader icon={Target} title="Positioning Statement" />
              <p className="text-gray-700">{segment.positioning_statement}</p>
            </div>
          )}

          {/* Personas */}
          {segment.personas && (
            <div>
              <SectionHeader icon={Users} title="Target Personas" />
              <p className="text-gray-700">{segment.personas}</p>
            </div>
          )}

          {/* SCORE SECTION - Horizontal Bar Chart */}
          {scores && (
            <div>
              <SectionHeader icon={Star} title="Segment Score" />
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
                    { category: "Complexity", score: scores.complexity },
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

// Section header component - Keeps Unbounded font for titles
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
    <Icon className="mr-2 text-indigo-600 w-6 h-6" />
    {title}
  </h3>
);

export default SegmentProfile;
