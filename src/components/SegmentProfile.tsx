import React from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  Lightbulb, 
  Star, 
  Target, 
  ClipboardList, 
  Layers, 
  MapPin, 
  BarChart3, 
  CheckCircle, 
  User, 
  AlignLeft
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
  positioning_statement: string | null;
  positioning_headline: string | null;
  positioning_subheadline: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Function to format content properly
const formatContent = (content: string | null) => {
  if (!content) return <p className="text-gray-900 italic">No information available</p>;

  return (
    <div className="text-gray-900 space-y-4 text-left">
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

// Section Headers
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl font-unbounded text-gray-900 flex items-center mt-12 mb-6 border-b-4 border-polkadot-pink pb-2">
    <Icon className="mr-3 text-polkadot-pink w-7 h-7" />
    {title}
  </h2>
);

// Sub-section Headers
const SubSectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3 flex items-center">
    <Icon className="mr-2 text-polkadot-pink w-5 h-5" />
    {title}
  </h3>
);

const ScoreItem = ({ label, value }: { label: string; value: number | null }) => (
  <div className="flex justify-between px-6 py-3 border-b">
    <span className="font-semibold text-gray-900">{label}</span>
    <span className="text-gray-900">{value !== null ? value.toFixed(1) : 'N/A'}</span>
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
        <SectionHeader icon={Info} title="Segment Overview" />
        <div className="space-y-6">
          {segment.abstract && <div><SubSectionHeader icon={ClipboardList} title="Abstract" />{formatContent(segment.abstract)}</div>}
          {segment.definition && <div><SubSectionHeader icon={Layers} title="Definition" />{formatContent(segment.definition)}</div>}
          {segment.trends && <div><SubSectionHeader icon={BarChart3} title="Market Trends" />{formatContent(segment.trends)}</div>}
          {segment.regions && <div><SubSectionHeader icon={MapPin} title="Geographical Hotspots" />{formatContent(segment.regions)}</div>}
        </div>

        {/* Section 2: Persona Profiles (Left-Aligned, Proper Formatting) */}
        <SectionHeader icon={User} title="Persona Profiles" />
        <div className="space-y-8 text-gray-900 text-left">
          {segment.personas_1 && (
            <div>
              <p className="text-lg font-bold text-polkadot-pink">{segment.personas_1.split('\n')[0]}</p>
              <p className="mt-2">{segment.personas_1.split('\n').slice(1).join('\n')}</p>
            </div>
          )}
          {segment.personas_2 && (
            <div>
              <p className="text-lg font-bold text-polkadot-pink">{segment.personas_2.split('\n')[0]}</p>
              <p className="mt-2">{segment.personas_2.split('\n').slice(1).join('\n')}</p>
            </div>
          )}
          {segment.personas_3 && (
            <div>
              <p className="text-lg font-bold text-polkadot-pink">{segment.personas_3.split('\n')[0]}</p>
              <p className="mt-2">{segment.personas_3.split('\n').slice(1).join('\n')}</p>
            </div>
          )}
        </div>

        {/* Section 3: Polkadot-Market-Fit Score (PMF Score) */}
        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score (PMF Score)" />
        <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center text-3xl font-bold text-polkadot-pink mb-6">
          {segment.pmf !== null ? segment.pmf.toFixed(1) : 'N/A'}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ScoreItem({ label: "ROI", value: segment.roi })}
          {ScoreItem({ label: "Scalability", value: segment.scalability })}
          {ScoreItem({ label: "Customization", value: segment.customization })}
          {ScoreItem({ label: "Awareness", value: segment.awareness })}
          {ScoreItem({ label: "Tech", value: segment.tech })}
          {ScoreItem({ label: "TAM", value: segment.tam })}
          {ScoreItem({ label: "Compliance", value: segment.compliance })}
          {ScoreItem({ label: "Interoperability", value: segment.interoperability })}
          {ScoreItem({ label: "Reliability", value: segment.reliability })}
          {ScoreItem({ label: "Complexity", value: segment.complexity })}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;


