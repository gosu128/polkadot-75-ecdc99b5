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
  use_cases: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
  positioning_statement: string | null;
  positioning_headline: string | null;
  positioning_subheadline: string | null;
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  ca_reliability: string | null;
  ca_other: string | null;
  pmf: number | null;
  scores: { key: string; value: number }[] | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  onBack: () => void;
};

// Function to format text while ensuring ":" is bold
const formatContent = (content: string | null) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  return (
    <div className="font-inter-light text-gray-700 space-y-2 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          return (
            <p key={index}>
              <span className="font-inter-bold">{parts[0].trim()}:</span> {parts.slice(1).join(':').trim()}
            </p>
          );
        }
        return <p key={index}>{line.trim()}</p>;
      })}
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-2">
    <h2 className="text-2xl text-polkadot-pink font-unbounded flex items-center">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

// Subsection header component
const SubsectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-lg text-black font-semibold flex items-center mb-1">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
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
    <div className="flex flex-col min-h-screen text-left px-8 py-24">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900">{segment.name}</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Main Sections */}
      <div className="space-y-10">

        {/* Section 1: Overview */}
        <SectionHeader icon={Info} title="Overview" />
        <SubsectionHeader icon={BookText} title="Abstract" />
        {formatContent(segment.abstract)}
        <SubsectionHeader icon={BookText} title="Definition" />
        {formatContent(segment.definition)}
        <SubsectionHeader icon={TrendingUp} title="Market Trends" />
        {formatContent(segment.trends)}
        <SubsectionHeader icon={Globe} title="Geographical Hotspots" />
        {formatContent(segment.regions)}

        {/* Section 2: Use Cases */}
        <SectionHeader icon={Lightbulb} title="Use Cases" />
        <SubsectionHeader icon={Lightbulb} title="General Use Cases" />
        <p className="text-gray-500 italic">[Placeholder]</p>
        <SubsectionHeader icon={Lightbulb} title="Web3 Use Cases" />
        {formatContent(segment.use_cases)}

        {/* Section 3: Personas */}
        <SectionHeader icon={Users} title="Personas" />
        <SubsectionHeader icon={Users} title={segment.personas_1?.split('\n')[0] || "Persona Group 1"} />
        {formatContent(segment.personas_1)}
        <SubsectionHeader icon={Users} title={segment.personas_2?.split('\n')[0] || "Persona Group 2"} />
        {formatContent(segment.personas_2)}
        <SubsectionHeader icon={Users} title={segment.personas_3?.split('\n')[0] || "Persona Group 3"} />
        {formatContent(segment.personas_3)}

        {/* Section 4: Messaging Strategy */}
        <SectionHeader icon={Target} title="Messaging Strategy" />
        <SubsectionHeader icon={Target} title="Positioning Statement" />
        {formatContent(segment.positioning_statement)}
        <SubsectionHeader icon={Target} title="Headline" />
        {formatContent(segment.positioning_headline)}
        <SubsectionHeader icon={Target} title="Subline" />
        {formatContent(segment.positioning_subheadline)}

        {/* Section 5: Capability Assessment */}
        <SectionHeader icon={Star} title="Capability Assessment" />
        <SubsectionHeader icon={Star} title="Interoperability" />
        {formatContent(segment.ca_interoperability)}
        <SubsectionHeader icon={Star} title="Resilience" />
        {formatContent(segment.ca_resiliance)}
        <SubsectionHeader icon={Star} title="Scalability" />
        {formatContent(segment.ca_scalability)}
        <SubsectionHeader icon={Star} title="Flexibility" />
        {formatContent(segment.ca_customization)}
        <SubsectionHeader icon={Star} title="Reliability" />
        {formatContent(segment.ca_reliability)}
        <SubsectionHeader icon={Star} title="Other" />
        {formatContent(segment.ca_other)}

        {/* Section 6: Polkadot-Market-Fit Score */}
        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score" />
        <h3 className="text-4xl font-bold text-gray-900">{segment.pmf}</h3>

        {segment.scores && (
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-polkadot-pink text-white">
                <th className="p-2 text-left">Criteria</th>
                <th className="p-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {segment.scores.map((score, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2">{score.key}</td>
                  <td className="p-2">{score.value.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SegmentProfile;

