import React from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  Lightbulb, 
  Star, 
  Target, 
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
  use_cases: string | null;
  score: string | null;
  pmf: number | null;
  roi: number | null;
  scalability: number | null;
  customization: number | null;
  awareness: number | null;
  tech: number | null;
  tam: number | null;
  compliance: number | null;
  interoperability: number | null;
  reliability: number | null;
  complexity: number | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Function to format content while keeping ":" and bolding key phrases
const formatContent = (content: string | null) => {
  if (!content) return <p className="text-gray-700 italic">No information available</p>;

  return (
    <div className="text-gray-700 space-y-4 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          const boldText = parts[0]?.trim();
          const remainingText = parts.slice(1).join(':').trim();

          return (
            <p key={index}>
              <span className="font-semibold">{boldText}:</span> {remainingText}
            </p>
          );
        }

        return <p key={index}>{line.trim()}</p>;
      })}
    </div>
  );
};

// **Section Header Component** (For Major Sections)
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl font-unbounded text-gray-900 flex items-center mb-6 border-b-4 border-indigo-600 pb-2">
    <Icon className="mr-3 text-indigo-600 w-7 h-7" />
    {title}
  </h2>
);

// **Sub-section Header Component** (For Topics within Sections)
const SubSectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
    {title}
  </h3>
);

// Function to format and display scores with **1 decimal place**
const ScoreItem = ({ label, value }: { label: string; value: number | null }) => (
  <div className="flex justify-between px-6 py-3 border-b">
    <span className="font-semibold text-gray-900">{label}</span>
    <span className="text-gray-700">{value !== null ? value.toFixed(1) : 'N/A'}</span>
  </div>
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
        <div>
          <SectionHeader icon={Info} title="Segment Overview" />
          <div className="space-y-6">
            {segment.abstract && <div><SubSectionHeader title="Abstract" />{formatContent(segment.abstract)}</div>}
            {segment.definition && <div><SubSectionHeader title="Definition" />{formatContent(segment.definition)}</div>}
            {segment.trends && <div><SubSectionHeader title="Market Trends" />{formatContent(segment.trends)}</div>}
            {segment.regions && <div><SubSectionHeader title="Geographical Hotspots" />{formatContent(segment.regions)}</div>}
          </div>
        </div>

        {/* --- DIVIDER --- */}
        <div className="my-12 border-t-4 border-indigo-600 w-full"></div>

        {/* Section 2: Use Cases */}
        {segment.use_cases && (
          <div>
            <SectionHeader icon={Lightbulb} title="Use Cases" />
            {formatContent(segment.use_cases)}
          </div>
        )}

        {/* --- DIVIDER --- */}
        <div className="my-12 border-t-4 border-indigo-600 w-full"></div>

        {/* Section 3: Polkadot-Market-Fit Score */}
        <div>
          <SectionHeader icon={Star} title="Polkadot-Market-Fit Score (PMF Score)" />
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-center text-indigo-700 mb-6">
              {segment.pmf !== null ? segment.pmf.toFixed(1) : 'N/A'}
            </div>

            {/* Individual Score Breakdown */}
            <div className="grid grid-cols-2 gap-4 bg-white rounded-lg shadow p-4">
              <ScoreItem label="ROI Score" value={segment.roi} />
              <ScoreItem label="Scalability Score" value={segment.scalability} />
              <ScoreItem label="Customization Score" value={segment.customization} />
              <ScoreItem label="Awareness Score" value={segment.awareness} />
              <ScoreItem label="Tech Score" value={segment.tech} />
              <ScoreItem label="TAM Score" value={segment.tam} />
              <ScoreItem label="Compliance Score" value={segment.compliance} />
              <ScoreItem label="Interoperability Score" value={segment.interoperability} />
              <ScoreItem label="Reliability Score" value={segment.reliability} />
              <ScoreItem label="Complexity Score" value={segment.complexity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;

