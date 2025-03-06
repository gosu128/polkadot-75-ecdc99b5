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
  AlignLeft, 
  Compass, 
  ClipboardCheck, 
  Navigation 
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
  ca_1: string | null;
  ca_2: string | null;
  ca_3: string | null;
  ca_4: string | null;
  ca_5: string | null;
  ca_6: string | null;
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
const SectionHeader = ({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) => (
  <h2 id={id} className="text-3xl font-unbounded text-gray-900 flex items-center mt-16 mb-6 border-b-4 border-polkadot-pink pb-2">
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

        {/* Navigation Bar */}
        <div className="sticky top-0 bg-white shadow-md py-3 flex space-x-4 justify-center z-50">
          {["Overview", "Messaging Strategy", "Persona Profiles", "Capability Assessment", "Polkadot-Market-Fit Score"].map((section) => (
            <a key={section} href={`#${section.replace(/ /g, "-")}`} className="text-gray-900 font-semibold hover:text-polkadot-pink transition">
              {section}
            </a>
          ))}
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
            ← Back
          </button>
        </div>

        {/* Sections */}
        <SectionHeader icon={Info} title="Overview" id="Overview" />
        <div className="space-y-6">
          {segment.abstract && <div><SubSectionHeader icon={ClipboardList} title="Abstract" />{formatContent(segment.abstract)}</div>}
          {segment.definition && <div><SubSectionHeader icon={Layers} title="Definition" />{formatContent(segment.definition)}</div>}
          {segment.trends && <div><SubSectionHeader icon={BarChart3} title="Market Trends" />{formatContent(segment.trends)}</div>}
          {segment.regions && <div><SubSectionHeader icon={MapPin} title="Geographical Hotspots" />{formatContent(segment.regions)}</div>}
        </div>

        <SectionHeader icon={Compass} title="Messaging Strategy" id="Messaging-Strategy" />
        <div>{formatContent(segment.positioning_statement)}</div>

        <SectionHeader icon={User} title="Persona Profiles" id="Persona-Profiles" />
        <div className="space-y-8">
          {[segment.personas_1, segment.personas_2, segment.personas_3].map((persona, i) =>
            persona ? (
              <div key={i} className="text-gray-900">
                <p className="text-lg font-bold text-polkadot-pink">{persona.split('\n')[0]}</p>
                <p className="mt-2">{persona.split('\n').slice(1).join('\n')}</p>
              </div>
            ) : null
          )}
        </div>

        <SectionHeader icon={ClipboardCheck} title="Capability Assessment" id="Capability-Assessment" />
        <div className="grid grid-cols-2 gap-4">
          {[segment.ca_1, segment.ca_2, segment.ca_3, segment.ca_4, segment.ca_5, segment.ca_6].map((value, i) => (
            <ScoreItem key={i} label={`Capability ${i + 1}`} value={parseFloat(value || "0")} />
          ))}
        </div>

        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score" id="Polkadot-Market-Fit-Score" />
        <div className="text-3xl font-bold text-polkadot-pink">{segment.pmf?.toFixed(1) ?? "N/A"}</div>

      </div>
    </div>
  );
};

export default SegmentProfile;


