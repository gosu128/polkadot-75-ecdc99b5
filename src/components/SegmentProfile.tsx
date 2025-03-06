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
  Users, 
  Network, 
  Shield, 
  Layers, 
  BarChart3, 
  CheckCircle, 
  Compass, 
  ClipboardCheck 
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';

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
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  ca_reliability: string | null;
  ca_other: string | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Helper function for formatting text content
const formatContent = (content: string | null) => {
  if (!content) return <p className="text-gray-900 italic">No information available</p>;
  return <p className="text-gray-900">{content}</p>;
};

// **Main Section Headers**
const MainSectionHeader = ({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) => (
  <h2 id={id} className="text-3xl font-unbounded text-polkadot-pink flex items-center mt-16 mb-6 border-b-4 border-polkadot-pink pb-2">
    <Icon className="mr-3 text-polkadot-pink w-7 h-7" />
    {title}
  </h2>
);

// **Sub-Section Headers**
const SubSectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-lg font-bold text-gray-900 flex items-center mt-6">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
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
        <div className="mb-8">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* Main Sections */}
        <MainSectionHeader icon={Info} title="Overview" id="Overview" />
        <SubSectionHeader icon={BookText} title="Abstract" />
        {formatContent(segment.abstract)}
        <SubSectionHeader icon={BookText} title="Definition" />
        {formatContent(segment.definition)}
        <SubSectionHeader icon={TrendingUp} title="Market Trends" />
        {formatContent(segment.trends)}
        <SubSectionHeader icon={Globe} title="Geographical Hotspots" />
        {formatContent(segment.regions)}

        <MainSectionHeader icon={Lightbulb} title="Use Cases" id="Use-Cases" />
        <SubSectionHeader icon={ClipboardList} title="General Use Cases" />
        <p className="text-gray-900 italic">To be added</p>
        <SubSectionHeader icon={ClipboardList} title="Web3 Use Cases" />
        {formatContent(segment.use_cases)}

        <MainSectionHeader icon={Users} title="Personas" id="Personas" />
        <SubSectionHeader icon={User} title="Persona Group 1" />
        {formatContent(segment.personas_1)}
        <SubSectionHeader icon={User} title="Persona Group 2" />
        {formatContent(segment.personas_2)}
        <SubSectionHeader icon={User} title="Persona Group 3" />
        {formatContent(segment.personas_3)}

        <MainSectionHeader icon={Compass} title="Messaging Strategy" id="Messaging-Strategy" />
        <SubSectionHeader icon={Target} title="Positioning Statement" />
        {formatContent(segment.positioning_statement)}
        <SubSectionHeader icon={AlignLeft} title="Headline" />
        {formatContent(segment.positioning_headline)}
        <SubSectionHeader icon={AlignLeft} title="Subline" />
        {formatContent(segment.positioning_subheadline)}

        <MainSectionHeader icon={ClipboardCheck} title="Capability Assessment" id="Capability-Assessment" />
        <SubSectionHeader icon={Network} title="Interoperability" />
        {formatContent(segment.ca_interoperability)}
        <SubSectionHeader icon={Shield} title="Resilience" />
        {formatContent(segment.ca_resiliance)}
        <SubSectionHeader icon={BarChart3} title="Scalability" />
        {formatContent(segment.ca_scalability)}
        <SubSectionHeader icon={Layers} title="Flexibility" />
        {formatContent(segment.ca_customization)}
        <SubSectionHeader icon={CheckCircle} title="Reliability" />
        {formatContent(segment.ca_reliability)}
        <SubSectionHeader icon={ClipboardList} title="Other" />
        {formatContent(segment.ca_other)}

        <MainSectionHeader icon={Star} title="Polkadot-Market-Fit Score" id="Polkadot-Market-Fit-Score" />
        <div className="text-5xl font-bold text-polkadot-pink text-center py-4">{segment.pmf?.toFixed(1) ?? "N/A"}</div>

        {/* PMF Scores Table */}
        <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-100 px-6 py-3 font-semibold text-gray-900">
            <div>Criteria</div>
            <div>Score</div>
          </div>
          {[
            ["ROI", segment.roi],
            ["Scalability", segment.scalability],
            ["Customization", segment.customization],
            ["Awareness", segment.awareness],
            ["Tech", segment.tech],
            ["TAM", segment.tam],
            ["Compliance", segment.compliance],
            ["Interoperability", segment.interoperability],
            ["Reliability", segment.reliability],
            ["Complexity", segment.complexity],
          ].map(([label, value], i) => (
            <div key={i} className="grid grid-cols-2 px-6 py-3 border-b last:border-none">
              <div>{label}</div>
              <div>{value !== null ? value.toFixed(1) : "N/A"}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SegmentProfile;
