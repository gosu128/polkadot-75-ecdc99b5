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
  Settings, 
  CheckCircle, 
  ShieldCheck, 
  RefreshCw, 
  Link2, 
  Grid, 
  AlertTriangle, 
  MessageCircle, 
  User 
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

// **Function to format content while keeping ":" and bolding key phrases**
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
  <h2 className="text-3xl font-unbounded text-gray-900 flex items-center mt-12 mb-6 border-b-4 border-indigo-600 pb-2">
    <Icon className="mr-3 text-indigo-600 w-7 h-7" />
    {title}
  </h2>
);

// **Sub-section Header Component** (Now Left-aligned + Icons)
const SubSectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3 flex items-center">
    <Icon className="mr-2 text-indigo-600 w-5 h-5" />
    {title}
  </h3>
);

// **Function to format and display scores with 1 decimal place**
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
        <SectionHeader icon={Info} title="Segment Overview" />
        <div className="space-y-6">
          {segment.abstract && <div><SubSectionHeader icon={ClipboardList} title="Abstract" />{formatContent(segment.abstract)}</div>}
          {segment.definition && <div><SubSectionHeader icon={Layers} title="Definition" />{formatContent(segment.definition)}</div>}
          {segment.trends && <div><SubSectionHeader icon={BarChart3} title="Market Trends" />{formatContent(segment.trends)}</div>}
          {segment.regions && <div><SubSectionHeader icon={MapPin} title="Geographical Hotspots" />{formatContent(segment.regions)}</div>}
        </div>

        {/* Section 2: Messaging Strategy */}
        <SectionHeader icon={MessageCircle} title="Messaging Strategy" />
        {segment.positioning_headline && <SubSectionHeader icon={Target} title="Headline" />}
        <p className="text-xl font-semibold text-indigo-700">{segment.positioning_headline}</p>

        {segment.positioning_subheadline && <SubSectionHeader icon={CheckCircle} title="Subline" />}
        <p className="text-lg text-gray-700">{segment.positioning_subheadline}</p>

        {segment.positioning_statement && <SubSectionHeader icon={ClipboardList} title="Positioning Statement" />}
        {formatContent(segment.positioning_statement)}

        {/* Section 3: Persona Profiles */}
        <SectionHeader icon={User} title="Persona Profiles" />
        <div className="grid grid-cols-3 gap-6">
          {segment.personas_1 && <p className="p-4 border rounded-lg text-center bg-gray-50">{segment.personas_1}</p>}
          {segment.personas_2 && <p className="p-4 border rounded-lg text-center bg-gray-50">{segment.personas_2}</p>}
          {segment.personas_3 && <p className="p-4 border rounded-lg text-center bg-gray-50">{segment.personas_3}</p>}
        </div>

        {/* Section 4: Polkadot-Market-Fit Score */}
        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score (PMF Score)" />
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
          <div className="text-3xl font-bold text-center text-indigo-700 mb-6">
            {segment.pmf !== null ? segment.pmf.toFixed(1) : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;

