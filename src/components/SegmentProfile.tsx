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

        {/* Navigation Bar */}
        <div className="sticky top-0 bg-white shadow-md py-3 flex space-x-4 justify-center z-50 border-b border-gray-300">
          {["Overview", "Messaging Strategy", "Persona Profiles", "Capability Assessment", "Polkadot-Market-Fit Score"].map((section) => (
            <a key={section} href={`#${section.replace(/ /g, "-")}`} className="text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-polkadot-pink hover:text-white transition">
              {section}
            </a>
          ))}
        </div>

        {/* Sections */}
        <SectionHeader icon={Info} title="Overview" id="Overview" />
        <div className="space-y-6">
          {segment.abstract && <div>{formatContent(segment.abstract)}</div>}
          {segment.definition && <div>{formatContent(segment.definition)}</div>}
          {segment.trends && <div>{formatContent(segment.trends)}</div>}
          {segment.regions && <div>{formatContent(segment.regions)}</div>}
        </div>

        <SectionHeader icon={Compass} title="Messaging Strategy" id="Messaging-Strategy" />
        <div className="space-y-4">
          {segment.positioning_statement && <p><strong>Positioning Statement:</strong> {segment.positioning_statement}</p>}
          {segment.positioning_headline && <p><strong>Headline:</strong> {segment.positioning_headline}</p>}
          {segment.positioning_subheadline && <p><strong>Subline:</strong> {segment.positioning_subheadline}</p>}
        </div>

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
        <div className="space-y-4">
          {segment.ca_1 && <p><strong>Capability 1:</strong> {segment.ca_1}</p>}
          {segment.ca_2 && <p><strong>Capability 2:</strong> {segment.ca_2}</p>}
          {segment.ca_3 && <p><strong>Capability 3:</strong> {segment.ca_3}</p>}
          {segment.ca_4 && <p><strong>Capability 4:</strong> {segment.ca_4}</p>}
          {segment.ca_5 && <p><strong>Capability 5:</strong> {segment.ca_5}</p>}
          {segment.ca_6 && <p><strong>Capability 6:</strong> {segment.ca_6}</p>}
        </div>

        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score" id="Polkadot-Market-Fit-Score" />
        <div className="text-3xl font-bold text-polkadot-pink">{segment.pmf?.toFixed(1) ?? "N/A"}</div>

      </div>
    </div>
  );
};

export default SegmentProfile;
