import React from 'react';
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

// Helper function to display a score
const ScoreItem = ({ label, value }: { label: string; value: number | null }) => (
  <div className="flex justify-between px-6 py-3 border-b">
    <span className="font-inter-bold text-gray-900">{label}</span>
    <span className="text-gray-700">{value !== null ? value : 'N/A'}</span>
  </div>
);

// Section Header Component
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
          <div className="text-gray-700 space-y-6">
            {segment.abstract && <p>{segment.abstract}</p>}
            {segment.definition && <p>{segment.definition}</p>}
            {segment.trends && <p><strong>Market Trends:</strong> {segment.trends}</p>}
            {segment.regions && <p><strong>Geographical Hotspots:</strong> {segment.regions}</p>}
          </div>
        </div>

        {/* --- NEW DIVIDER --- */}
        <div className="my-12 border-t-4 border-indigo-600 w-full"></div>

        {/* Section 2: Polkadot-Market-Fit Score */}
        <div>
          <SectionHeader icon={Star} title="Polkadot-Market-Fit Score (PMF Score)" />
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-center text-indigo-700 mb-6">
              {segment.pmf !== null ? segment.pmf : 'N/A'}
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
