import React from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  AlertTriangle, 
  Lightbulb, 
  Star, 
  Target
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import Footer from '@/components/Footer';

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
  pmf: number | null;  // PMF Score
  scalability: number | null;
  customization: number | null;
  awareness: number | null;
  tech: number | null;
  tam: number | null;
  compliance: number | null;
  interoperability: number | null;
  reliability: number | null;
  complexity: number | null;
  roi: number | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Function to format content, ensuring ":" are preserved, bolding key phrases
const formatContent = (content: string | null) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  return (
    <div className="font-inter-light text-gray-700 space-y-4 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          const boldText = parts[0]?.trim();
          const remainingText = parts.slice(1).join(':').trim();

          return (
            <p key={index}>
              <span className="font-inter-bold">{boldText}:</span> {remainingText}
            </p>
          );
        }

        return <p key={index}>{line.trim()}</p>;
      })}
    </div>
  );
};

// Section header component - Keep Unbounded for section titles
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
    <Icon className="mr-2 text-indigo-600 w-6 h-6" />
    {title}
  </h3>
);

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
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

  // Parse individual score data for visualization
  const scoreData = [
    { category: "Scalability", score: segment.scalability },
    { category: "Customization", score: segment.customization },
    { category: "Awareness", score: segment.awareness },
    { category: "Tech", score: segment.tech },
    { category: "TAM", score: segment.tam },
    { category: "Compliance", score: segment.compliance },
    { category: "Interoperability", score: segment.interoperability },
    { category: "Reliability", score: segment.reliability },
    { category: "Complexity", score: segment.complexity },
    { category: "ROI", score: segment.roi },
  ].filter(item => item.score !== null); // Remove any null values

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content container with extra padding at the top */}
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition font-inter-light">
            ← Back
          </button>
        </div>

        {/* SINGLE COLUMN LAYOUT WITH PROPER SPACING */}
        <div className="space-y-12">
          {/* Overview */}
          <div>
            <SectionHeader icon={Info} title="Overview" />
            {formatContent(segment.abstract)}
          </div>

          {/* Definition */}
          {segment.definition && (
            <div>
              <SectionHeader icon={BookText} title="Definition" />
              {formatContent(segment.definition)}
            </div>
          )}

          {/* Market Trends */}
          {segment.trends && (
            <div>
              <SectionHeader icon={TrendingUp} title="Market Trends" />
              {formatContent(segment.trends)}
            </div>
          )}

          {/* Key Regions */}
          {segment.regions && (
            <div>
              <SectionHeader icon={Globe} title="Key Regions" />
              {formatContent(segment.regions)}
            </div>
          )}

          {/* Challenges */}
          {segment.challenges && (
            <div>
              <SectionHeader icon={AlertTriangle} title="Challenges" />
              {formatContent(segment.challenges)}
            </div>
          )}

          {/* Use Cases */}
          {segment.use_cases && (
            <div>
              <SectionHeader icon={Lightbulb} title="Use Cases" />
              {formatContent(segment.use_cases)}
            </div>
          )}

          {/* Positioning Statement */}
          {segment.positioning_statement && (
            <div>
              <SectionHeader icon={Target} title="Positioning Statement" />
              {formatContent(segment.positioning_statement)}
            </div>
          )}

          {/* POLKADOT-MARKET-FIT SCORE */}
          {segment.pmf !== null && (
            <div>
              <SectionHeader icon={Star} title="Polkadot-Market-Fit Score (PMF Score)" />
              <p className="font-inter-bold text-3xl text-gray-900">{segment.pmf} / 10</p>

              {/* Score Table */}
              <div className="mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Criteria</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreData.map((item, index) => (
                      <tr key={index} className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;

